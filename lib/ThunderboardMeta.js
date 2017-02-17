'use strict';

var tb = require('./ThunderboardConstants');
var ThunderboardReactSpec = require('./specs/'+tb.DeviceType.React+'/Specification');
var ThunderboardSenseSpec = require('./specs/'+tb.DeviceType.Sense+'/Specification');

var meta = {};
Object.assign(meta,tb);

meta["Specifications"] = {};
meta["Specifications"][tb.DeviceType.React] = ThunderboardReactSpec;
meta["Specifications"][tb.DeviceType.Sense] = ThunderboardSenseSpec;

meta["Services"] = {};
meta["Services"][tb.Service.Uuid.GenericAccess] = tb.Service.Key.GenericAccess;
meta["Services"][tb.Service.Uuid.DeviceInfo] = tb.Service.Key.DeviceInfo;
meta["Services"][tb.Service.Uuid.GenericAttribute] = tb.Service.Key.GenericAttribute;
meta["Services"][ tb.Service.Uuid.Battery] = tb.Service.Key.Battery;
meta["Services"][tb.Service.Uuid.Environment] = tb.Service.Key.Environment;
meta["Services"][tb.Service.Uuid.AmbientLight] = tb.Service.Key.AmbientLight;
meta["Services"][tb.Service.Uuid.CyclingSpeedCadence] = tb.Service.Key.CyclingSpeedCadence;
meta["Services"][tb.Service.Uuid.AccelerationOrientation] = tb.Service.Key.AccelerationOrientation;
  //meta["Services"]["ec61a454ed00a5e8b8f9de9ec026ec51"] = "unknown-sense-1";
  //meta["Services"]["efd658aec400ef3376e791b00019103b"] = "unknown-sense-2";
  //meta["Services"]["fcb89c40c60059f37dc35ece444a401b"] = "unknown-sense-3";
meta["Services"][tb.Service.Uuid.Automation] = tb.Service.Key.Automation;

meta["Characteristics"] = {};
meta["Characteristics"][tb.Characteristic.Uuid.DeviceName] = tb.Characteristic.Key.DeviceName;
meta["Characteristics"][tb.Characteristic.Uuid.Appearance] = tb.Characteristic.Key.Appearance;
meta["Characteristics"][tb.Characteristic.Uuid.ServiceChanged] = tb.Characteristic.Key.ServiceChanged;
meta["Characteristics"][tb.Characteristic.Uuid.Manufacturer] = tb.Characteristic.Key.Manufacturer;
meta["Characteristics"][tb.Characteristic.Uuid.ModelNumber] = tb.Characteristic.Key.ModelNumber;
//tb.Characteristic.Uuid.SerialNumber] = tb.Characteristic.Key.SerialNumber;
meta["Characteristics"][tb.Characteristic.Uuid.HardwareRevision] = tb.Characteristic.Key.HardwareRevision;
meta["Characteristics"][tb.Characteristic.Uuid.FirmwareRevision] = tb.Characteristic.Key.FirmwareRevision;
meta["Characteristics"][tb.Characteristic.Uuid.SystemId] = tb.Characteristic.Key.SystemId;
meta["Characteristics"][tb.Characteristic.Uuid.BatteryLevel] = tb.Characteristic.Key.BatteryLevel;
meta["Characteristics"][tb.Characteristic.Uuid.Pressure] = tb.Characteristic.Key.Pressure;
meta["Characteristics"][tb.Characteristic.Uuid.Humidity] = tb.Characteristic.Key.Humidity;
meta["Characteristics"][tb.Characteristic.Uuid.Temperature] = tb.Characteristic.Key.Temperature;
meta["Characteristics"][tb.Characteristic.Uuid.Uv] = tb.Characteristic.Key.Uv;
meta["Characteristics"][tb.Characteristic.Uuid.AmbientLight] = tb.Characteristic.Key.AmbientLight;
meta["Characteristics"][tb.Characteristic.Uuid.Microphone] = tb.Characteristic.Key.Microphone;
//meta["Characteristics"]["c8546913bf0345eb8dde9f8754f4a32e"] = "unknown-sense-4";
meta["Characteristics"][tb.Characteristic.Uuid.CscMeasurement] = tb.Characteristic.Key.CscMeasurement;
meta["Characteristics"][tb.Characteristic.Uuid.CscFeature] = tb.Characteristic.Key.CscFeature;
meta["Characteristics"][tb.Characteristic.Uuid.ScControlPoint] = tb.Characteristic.Key.ScControlPoint;
meta["Characteristics"][tb.Characteristic.Uuid.Acceleration] = tb.Characteristic.Key.Acceleration;
meta["Characteristics"][tb.Characteristic.Uuid.Orientation] = tb.Characteristic.Key.Orientation;
meta["Characteristics"][tb.Characteristic.Uuid.ControlPoint] = tb.Characteristic.Key.ControlPoint;
meta["Characteristics"][tb.Characteristic.Uuid.Digital] = tb.Characteristic.Key.Digital;
meta["Characteristics"][tb.Characteristic.Uuid.CharacteristicFormat] = tb.Characteristic.Key.CharacteristicFormat;
//meta["Characteristics"][tb.Characteristic.Uuid.Unknown1] = tb.Characteristic.Key.Unknown1;
//meta["Characteristics"][tb.Characteristic.Uuid.Unknown2] = tb.Characteristic.Key.Unknown2;
//meta["Characteristics"][tb.Characteristic.Uuid.Unknown3] = tb.Characteristic.Key.Unknown3;
//meta["Characteristics"][tb.Characteristic.Uuid.Unknown4] = tb.Characteristic.Key.Unknown4;
//meta["Characteristics"][tb.Characteristic.Uuid.Unknown5] = tb.Characteristic.Key.Unknown5;
//meta["Characteristics"][tb.Characteristic.Uuid.Unknown6] = tb.Characteristic.Key.Unknown6;
meta["Characteristics"][tb.Characteristic.Uuid.NumDigitals] = tb.Characteristic.Key.NumDigitals;

meta["CharacteristicDataParsers"] = {};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.DeviceName] = function (eventDetails) {
    eventDetails["value"] = eventDetails["data"].toString();
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.Appearance] = function (eventDetails) {
  //TODO: ERROR CHECK FOR DATA LENGTH
  eventDetails["value"] = (eventDetails["data"].readUInt16LE(0)/100);
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.Manufacturer] = function (eventDetails) {
    eventDetails["value"] = eventDetails["data"].toString();
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.ModelNumber] = function (eventDetails) {
    eventDetails["value"] = eventDetails["data"].toString();
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.SerialNumber] = function (eventDetails) {
     //TODO: CONFIRM IMPLEMENTATION
     eventDetails["value"] = eventDetails["data"].toString();
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.HardwareRevision] = function (eventDetails) {
    eventDetails["value"] = eventDetails["data"].toString();
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.FirmwareRevision] = function (eventDetails) {
  eventDetails["value"] = eventDetails["data"].toString();
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.SystemId] = function (eventDetails) {
 //TODO: ERROR CHECK FOR DATA LENGTH
 eventDetails["value"] = {
    "manufacturer" : eventDetails["data"].readUIntLE(0,5),
    "organization" : eventDetails["data"].readUIntLE(5,3)
 };
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.BatteryLevel] = function (eventDetails) {
  if (eventDetails["data"] && eventDetails["data"].length == 1) {
    eventDetails["value"] = eventDetails["data"][0];
  } // end if
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.Pressure] = function (eventDetails) {
   //TODO: CONFIRM IMPLEMENTATION
   eventDetails["value"] = (eventDetails["data"].readUInt16LE(0)/1000);
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.Temperature] = function (eventDetails) {
  //TODO: ERROR CHECK FOR DATA LENGTH
  var celcius = (eventDetails["data"].readInt16LE(0)/100);
  eventDetails["value"] = {
    "C" : celcius,
    "F" : (((celcius*9)/5)+32)
  };
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.Humidity] = function (eventDetails) {
   //TODO: ERROR CHECK FOR DATA LENGTH
   eventDetails["value"] = (eventDetails["data"].readUInt16LE(0)/100);
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.Uv] = function (eventDetails) {
  //TODO: ERROR CHECK FOR DATA LENGTH
  eventDetails["value"] = eventDetails["data"][0];
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.Pressure] = function (eventDetails) {
  //TODO: ERROR CHECK FOR DATA LENGTH
  //TODO: VALIDATE IMPLEMENTATION
  eventDetails["value"] = (eventDetails["data"].readUInt16LE(0)/100);
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.AmbientLight] = function (eventDetails) {
  //TODO: ERROR CHECK FOR DATA LENGTH
  eventDetails["value"] = (eventDetails["data"].readUInt32LE(0)/100);
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.Microphone] = function (eventDetails) {
  //TODO: ERROR CHECK FOR DATA LENGTH
  //TODO: VALIDATE IMPLEMENTATION
  eventDetails["value"] = (eventDetails["data"].readUInt16LE(0)/100);
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.CscMeasurement] = function (eventDetails) {
  var data = eventDetails["data"];
  if (Buffer.isBuffer(data)) {
    //TODO: ERROR CHECK FOR DATA LENGTH
    eventDetails["value"] = {
        "active" : (1 === data.readUInt8(0)),
        "revolutions" : data.readUInt32LE(1),
        "lastWheelEventTime" : data.readUInt16LE(5)
    };
  // } else {
  //   eventDetails["value"] = eventDetails["data"];
  } // end if
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.CscFeature] = function (eventDetails) {
  //TODO: ERROR CHECK FOR DATA LENGTH
  eventDetails["value"] = (eventDetails["data"][0] === 1);
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.Acceleration] = function (eventDetails) {
  var data = eventDetails["data"];
  if (Buffer.isBuffer(data)) {
    //TODO: ERROR CHECK FOR DATA LENGTH
    eventDetails["value"] = {
      "x" : data.readInt16BE(0),
      "y" : data.readInt16BE(2),
      "z" : data.readInt16BE(4)
    };
    //TODO:  NEED TO SHIFT FOR 0.001 NEEDED?
  } else {
    eventDetails["value"] = data;
  } // end if
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.Orientation] = function (eventDetails) {
  var data = eventDetails["data"];
  if (Buffer.isBuffer(data)) {
    //TODO: ERROR CHECK FOR DATA LENGTH
    eventDetails["value"] = {
      "alpha" : data.readInt16BE(0),
      "beta" : data.readInt16BE(2),
      "gamma" : data.readInt16BE(4)
    };
    //TODO:  NEED TO SHIFT FOR 0.001 NEEDED?
  } else {
    eventDetails["value"] = data;
  } // end if
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.Digital] = function (eventDetails) {
  var data = eventDetails["data"];
  //TODO: ERROR CHECK FOR DATA LENGTH
  //TODO: MOVE THESE TO PUBLIC CONSTANTS IN THE PACKAGE
  //TOOD: BRUSH UP ON BITWISE SHORT-HAND (it's been a while) =)
  var activeState = "inactive";
  if ( ((data[0] & 1) == 1) && ((data[0] & 2) == 0) ) {
    activeState = "active";
  } else if ( ((data[0] & 1) == 0) && ((data[0] & 2) == 1) ) {
    activeState = "tri";
  } else if ( ((data[0] & 1) == 1) && ((data[0] & 2) == 1) ) {
    activeState = "unknown";
  } // end if
  eventDetails["value"] = activeState;
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.CharacteristicFormat] = function (eventDetails) {
  var data = eventDetails["data"];
  if (Buffer.isBuffer(data)) {
    //TODO: ERROR CHECK FOR DATA LENGTH
    eventDetails["value"] = {
      "format" : data[0],
      "exponent" : data.readInt8(1),
      "unit" : data.readUInt16LE(2),
      "namespace" : data.readUInt8(4),
      "description" : (1 === data.readUInt16BE(5)) ? "Digital Input" : "Digital Output"
    };
  } // end if
};

meta["CharacteristicDataParsers"][tb.Characteristic.Uuid.NumDigitals] = function (eventDetails) {
  //TODO: ERROR CHECK FOR DATA LENGTH
  eventDetails["value"] = eventDetails["data"][0];
};

module.exports = meta;
