'use strict';

var noble = require('noble');
var ThunderboardMeta = require('./ThunderboardMeta');

var Thunderboard = function Constructor(autoConnectConfig,listener,normalizeData) {
  var self = this;
  this.devices = {};
  this.timers = {};
  this.characteristics = {};
  this.config =  Object.keys(autoConnectConfig)
    .map(
      function(key) {
        return autoConnectConfig[key];
      } // end function
    ).filter(
      function(device) {
        return (device["enabled"] && device["autoconnect"]);
      } // end function
  );
  this.normalizeData = normalizeData || false;
  this.listener = listener;

  /*** DETERMINES IF THIS DEVICE IS A THUNDERBOARD ***/
  function isThunderBoard(peripheral) {
    if (peripheral["advertisement"] && peripheral["advertisement"]["manufacturerData"]) {
      var matched = Object.keys(ThunderboardMeta.ManufacturerData).filter(
        function(type) {
          return (ThunderboardMeta.ManufacturerData[type].equals(peripheral["advertisement"]["manufacturerData"]));
        } // end function
      );
      return (matched && matched.length > 0);
    } // end if

    return false;
  } // end function

  function getThunderboardConfig(peripheralUUID) {
    var devices = self.config.filter(
      function(device) {
        return (
          device["uuid"] === peripheralUUID
        );
      }
    );
    return (devices && devices.length === 1) ? devices[0] : null;
  } // end function

  function autoConnectThunderboard(peripheral) {
    var tbCfg = getThunderboardConfig(peripheral.id);
    if (tbCfg) {
      return (
        tbCfg["family"] === ThunderboardMeta.Family &&
        ThunderboardMeta.DeviceTypes.includes(tbCfg["type"]) &&
        tbCfg["autoconnect"]
      );
    } // end if
    return false;
  } // end function

  /*** DETERMINES IF DEVICE SHOULD BE MAPPED FOR THIS APPLICATION ***/
  function acceptDevice(peripheral) {
    //console.log('*** Found Device ',peripheral.id,peripheral.rssi,peripheral.state);

    if (isThunderBoard(peripheral) &&
        !self.devices[peripheral.id] &&
        autoConnectThunderboard(peripheral)) {

        console.log('***','Auto-Connecting to Thunderboard',peripheral.uuid);

        /**** ADDING PERIPHERAL TO DETECTED DEVICE ***/
        self.devices[peripheral.id] = peripheral;

        if (Object.keys(self.devices).length === self.config.length) {
          noble.stopScanning();
        } // end if

        return true;
    } // end if
    return false;
  } // end function

  /**** CONVERTS THE SPECIFIED SERVICE NAMES IN jiveclientconfiguration.json TO CHARACTERISTICS FROM PERiPHERAL FOR MATCHING ****/
  function getConfigServices(peripheral) {
    var tbCfg = getThunderboardConfig(peripheral.id);
    if (tbCfg && tbCfg["services"]) {
      var serviceUUIDs = Object.keys(ThunderboardMeta.Specifications[tbCfg["type"]]["services"]).map(function(key) { return ThunderboardMeta.Specifications[tbCfg["type"]]["services"][key]; }).filter(
        function(service) {
          return (Object.keys(tbCfg["services"]).indexOf(service["name"]) > -1);
        } // end function
      );
      return serviceUUIDs;
    } // end if
    return [];
  } // end funciton

  /**** CONVERTS THE SPECIFIED CHARACTERISTICS NAMES IN jiveclientconfiguration.json TO CHARACTERISTICS FROM PERiPHERAL FOR MATCHING ****/
  function getConfigCharacteristics(peripheral,service) {
    var tbCfg = getThunderboardConfig(peripheral);
    var serviceKey = ThunderboardMeta.Services[service["uuid"]];

    if (tbCfg && serviceKey) {
        var cfgCharacteristics = tbCfg["services"][serviceKey];
        if (cfgCharacteristics) {
          return Object.keys(ThunderboardMeta.Specifications[tbCfg["type"]]["services"][serviceKey]["characteristics"])
            .map(function(key) { return ThunderboardMeta.Specifications[tbCfg["type"]]["services"][serviceKey]["characteristics"][key]; })
            .filter(
              function(characteristic) {
                return (cfgCharacteristics.indexOf(characteristic["name"]) > -1);
              } // end function
            );
        } // end if
    } // end if
    return [];
  } // end function

  function registerCharacteristic(characteristic) {
    console.log('       ','Found Characteristic ', characteristic.name + '['+characteristic.uuid+']','for service',characteristic._serviceUuid);
    var serviceKey = ThunderboardMeta.Services[characteristic._serviceUuid];
    var characteristicKey = ThunderboardMeta.Characteristics[characteristic.uuid];

    if (!serviceKey || !characteristicKey) {
      console.log('            ','*** WARN ***','Unable to find Thunderboard Service/Characteristic Definition',serviceKey,characteristic._serviceUuid,characteristicKey,characteristic.uuid);
      return;
    // } else {
    //   console.log('            ','*** TEST ***',serviceKey,!serviceKey,characteristicKey,!characteristicKey);
    }// end if

    var tbCfg = getThunderboardConfig(characteristic._peripheralId);

    /*** DETECTS IF THE READ INTERVAL HAS BEEN SPECIFIED FOR THIS CHARACTERISTIC ***/
    var readIntervalDetected = tbCfg["readIntervals"] && tbCfg["readIntervals"][serviceKey] && tbCfg["readIntervals"][serviceKey][characteristicKey];

    /*** DETECTS IF THE READ INTERVAL IS "notify" RESERVED VALUE ***/
    var isNotifyInterval = (readIntervalDetected) ? (tbCfg["readIntervals"][serviceKey][characteristicKey] === "notify") : false;

    var characteristicMeta = ThunderboardMeta.Specifications[tbCfg["type"]]["services"][serviceKey]['characteristics'][characteristicKey];

    if (isNotifyInterval) {
      /*** SETUP NOTIFY IF THE CHARACTERISTIC SUPPORTS IT ***/
      if (characteristicMeta["notify"]) {
        characteristic.notify(true);
        characteristic.on('notify', function(data,isNotification) { characteristicListener('notify',characteristic._peripheralId,characteristic._serviceUuid,characteristic.uuid,data,isNotification); });
      } else {
        console.log('            ','*** WARN ***','Attempting to use notify listeners on characterstic',characteristicKey,'which does not support "notify", ignoring...');
      } // end if
    } // end if

    characteristic.on('read', function(data,isNotification) { characteristicListener('read',characteristic._peripheralId,characteristic._serviceUuid,characteristic.uuid,data,isNotification); });
    characteristic.on('valueRead', function(data) { characteristicListener('valueRead',characteristic._peripheralId,characteristic._serviceUuid,characteristic.uuid,data); });
    characteristic.on('broadcast', function(state) { characteristicListener('broadcast',characteristic._peripheralId,characteristic._serviceUuid,characteristic.uuid,state); });

    if (!characteristicMeta["readOnly"]) {
      characteristic.on('write', function() { characteristicListener('write',characteristic.uuid); });
    } // end if

    if (readIntervalDetected && !isNotifyInterval) {
        console.log('            ','Setting up polling intervals for',characteristic._peripheralId,serviceKey,characteristicKey);

        var intervalMs = Number(tbCfg["readIntervals"][serviceKey][characteristicKey]);

        if (intervalMs > 0) {
          /**** CREATING INTERVAL TO READ CHARACTERISTIC ****/
          self.timers[characteristic._peripheralId] = self.timers[characteristic._peripheralId] || {};
          self.timers[characteristic._peripheralId][characteristicKey] = setInterval(
            function() {
              self.read(characteristic._peripheralId,serviceKey,characteristicKey);
            }, // end function
            intervalMs
          );
        } else {
          console.log('            ','Read interval disabled for characterstic',characteristicKey,', ignoring ...');
        } // end if
    } // end if
  } // end function

  /***** LISTENS TO ALL EVENTS AND BROADCASTS THEM TO THE LISTENER *******/
  function characteristicListener(eventType,peripheralUUID,serviceUUID,characteristicUUID,data,isNotification) {
    //console.log('**** eventType',eventType,'peripheralUUID',peripheralUUID,'serviceUUID',serviceUUID,'characteristicUUID',characteristicUUID,'data',data,'isNotification',isNotification);

    var eventDetails = {
      type : eventType,
      peripheral : {
        uuid : peripheralUUID
      },
      service : {
        uuid : serviceUUID,
        name : ThunderboardMeta.Services[serviceUUID]
      },
      characteristic : {
        uuid : characteristicUUID,
        name : ThunderboardMeta.Characteristics[characteristicUUID]
      }
    };

    //**** IDEA: ANY WAY TO USE THE SPEC TO AUTO-PARSE AND NORMALIZE THE DATA?
    //***** (i.e. 01010101101010101001010 = > { state: 12345, value: 123 }

    if (eventType !== 'write') {
      if (eventType !== 'broadcast') {
        eventDetails["data"] = data;
        eventDetails["isNotification"] = isNotification;
      } else {
        eventDetails["data"] = null;
        eventDetails["state"] = state;
      } // end if
    } // end if

    if (self.normalizeData) {
       var parse = ThunderboardMeta.CharacteristicDataParsers[eventDetails["characteristic"]["uuid"]];
       if (parse) {
          //console.log('*** Normalizing Value for ',eventDetails["characteristic"]["name"]);
          parse(eventDetails);
       } // end if
    } // end if
    self.listener(eventDetails);
  } // end function


  noble.on('discover',
    function(peripheral) {

      if (acceptDevice(peripheral)) {

        peripheral.connect(
          function(err) {
            console.log('***','Connected to Device',peripheral.id);
            peripheral.discoverServices(
              getConfigServices(peripheral).map(function (service) { return service["uuid"]; }),
              function(err, services) {
                console.log('    ','Found ['+services.length+'] Services for',peripheral.id);
                services.forEach(
                  function(service) {
                    service.discoverCharacteristics(
                      getConfigCharacteristics(peripheral,service).map(function (characteristic) { return characteristic["uuid"]; }),
                      function(err, characteristics) {
                        characteristics.forEach(
                          function(characteristic) {
                            registerCharacteristic(characteristic);
                          } // end function
                        );
                      } // end function
                    );
                  } // end function
                );
              } // end function
            );

            peripheral.once('disconnect',
              function() {
                console.log('***','Device Disconnected',peripheral.id);
                if (self.timers[peripheral.id]) {
                  Object.keys(self.timers[peripheral.id]).forEach(
                    function(key) {
                      var timer = self.timers[peripheral.id][key];
                      if (timer) {
                        console.log('***','Clearing Timer for',peripheral.id,key);
                        clearInterval(timer);
                      } // end if
                    } // end function
                  );
                  delete self.timers[peripheral.id];
                } // end if
                delete self.devices[peripheral.id];
                noble.startScanning([],false);
              } // end function
            );
          } // end function
        );
      } // end if

    } // end function
  );

  noble.on('warning',
    function(error) {
      console.log('***','WARNING',error);
    } // end function
  );

  noble.on('stateChange',
    function(state) {
      if (state === 'poweredOn') {
        console.log('BLE Auto-Start ...',state);
        noble.startScanning([],false);
      } else {
        console.log('BLE Powered Off ...',state);
        noble.stopScanning();
      } // end if
    } // end function
  );
} // end Constructor

Thunderboard.prototype.connect = function(peripheralUUID,callback) {
  console.log('*** Connecting',peripheralUUID);
  noble.once('connect',callback);
  noble.connect(peripheralUUID)
}; // end function


Thunderboard.prototype.disconnect = function(peripheralUUID) {
  console.log('*** Disconnecting',peripheralUUID);
  //TODO:  DETERMINE IF ALREADY CONNECTED
  noble.disconnect(peripheralUUID);
}; // end function

Thunderboard.prototype.read = function(peripheralUUID,serviceKey,characteristicKey) {
  var self = this;

  var serviceUUID = getServiceUuidByKey(self,serviceKey);
  var characteristicUUID = getCharacteristicUuidByKey(self,characteristicKey); ;
  //console.log('***',peripheralUUID,serviceKey,serviceUUID,characteristicKey,characteristicUUID);
  noble.read(peripheralUUID,serviceUUID,characteristicUUID);
}; // end function

Thunderboard.prototype.readValue = function(peripheralUUID,serviceKey,characteristicKey,descriptorKey) {
  var self = this;

  console.log('ReadValue',peripheralUUID,serviceKey,characteristicKey,descriptorKey,'...');
  var serviceUUID = getServiceUuidByKey(self,serviceKey);
  var characteristicUUID = getCharacteristicUuidByKey(self,characteristicKey); ;
  var descriptorUUID = getDescriptorUuidByKey(self,descriptorKey);


  noble.readValue(peripheralUUID,serviceUUID,characteristicUUID,descriptorUUID);
}; // end function

Thunderboard.prototype.write = function(peripheralUUID, serviceKey, characteristicKey, buffer, withoutResponse) {
  var self = this;
  console.log('Write',peripheralUUID,serviceKey,characteristicKey,buffer,withoutResponse,'...');
  var serviceUUID = getServiceUuidByKey(self,serviceKey);
  var characteristicUUID = getCharacteristicUuidByKey(self,characteristicKey); ;

  //TODO: UPDATE THE INTERFACE TO ENCAPSULATE THE BIT/BYTE RULES?

  noble.write(peripheralUUID,serviceUUID,characteristicUUID,buffer,withoutResponse);
}; // end function

Thunderboard.prototype.writeValue = function(peripheralUUID, serviceKey, characteristicKey, descriptorKey, buffer, withoutResponse) {
  var self = this;
  console.log('WriteValue',peripheralUUID,serviceKey,characteristicKey,descriptorKey,buffer,withoutResponse,'...');

  var serviceUUID = getServiceUuidByKey(self,serviceKey);
  var characteristicUUID = getCharacteristicUuidByKey(self,characteristicKey); ;
  var descriptorUUID = getDescriptorUuidByKey(self,descriptorKey);

  //TODO: UPDATE THE INTERFACE TO ENCAPSULATE THE BIT/BYTE RULES?

  noble.writeValue(peripheralUUID,serviceUUID,characteristicUUID,descriptorUUID,buffer,withoutResponse);
}; // end function

function getServiceUuidByKey(self,serviceKey) {
  return Object.keys(ThunderboardMeta.Services).find(function(key) { return ThunderboardMeta.Services[key] === serviceKey });
} // end function

function getCharacteristicUuidByKey(self,characteristicKey) {
  return Object.keys(ThunderboardMeta.Characteristics).find(function(key) { return ThunderboardMeta.Characteristics[key] === characteristicKey });
} // end function

function getDescriptorUuidByKey(self,descriptorKey) {
  return Object.keys(ThunderboardMeta.Descriptors).find(function(key) { return ThunderboardMeta.Descriptors[key] === descriptorKey });
} // end function

module.exports = Thunderboard;
