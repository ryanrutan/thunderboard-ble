'use strict';

var constants = {};

constants["Family"] = "thunderboard";

var DEVICE_SUBTYPE_REACT = "react";
var DEVICE_SUBTYPE_SENSE = "sense";
constants["DeviceType"] = {
  React : DEVICE_SUBTYPE_REACT,
  Sense : DEVICE_SUBTYPE_SENSE
};
constants["DeviceTypes"] = [ DEVICE_SUBTYPE_REACT, DEVICE_SUBTYPE_SENSE ];

constants["ManufacturerData"] = {};
constants["ManufacturerData"][DEVICE_SUBTYPE_REACT] = Buffer.from('47000100','hex');
constants["ManufacturerData"][DEVICE_SUBTYPE_SENSE] = Buffer.from('47000200','hex');

constants["Service"] = {
  "Uuid" : {
    GenericAccess : "1800",
    DeviceInfo : "180a",
    GenericAttribute : "1801",
    Battery : "180f",
    Environment : "181a",
    AmbientLight : "d24c4f4e17a74548852cabf51127368b",
    CyclingSpeedCadence : "1816",
    AccelerationOrientation : "a4e649f44be511e5885dfeff819cdc9f",
    Automation : "1815"
  },
  "Key" : {
    GenericAccess : "generic-access",
    DeviceInfo : "device-info",
    GenericAttribute : "generic-attribute",
    Battery : "battery",
    Environment : "environment",
    AmbientLight : "ambient-light",
    CyclingSpeedCadence : "cycling-speed-cadence",
    AccelerationOrientation : "acceleration-orientation",
    Automation : "automation"
  }
};

constants["Characteristic"] = {
  "Uuid" : {
    DeviceName : "2a00",
    Appearance : "2a01",
    ServiceChanged : "2a05",
    Manufacturer : "2a29",
    ModelNumber : "2a24",
    //SerialNumber : "2a25",
    HardwareRevision : "2a27",
    FirmwareRevision : "2a26",
    SystemId : "2a23",
    BatteryLevel : "2a19",
    Pressure : "2a6d",
    Humidity  : "2a6f",
    Temperature : "2a6e",
    Uv : "2a76",
    AmbientLight : "c8546913bfd945eb8dde9f8754f4a32e",
    Microphone : "c8546913bf0245eb8dde9f8754f4a32e",
    //EnvControlPoint : "c8546913bf0345eb8dde9f8754f4a32e",
    CscMeasurement : "2a5b",
    CscFeature : "2a5c",
    ScControlPoint : "2a55",
    Acceleration : "c4c1f6e24be511e5885dfeff819cdc9f",
    Orientation : "b7c4b694bee345ddba9ff3b5e994f49a",
    ControlPoint : "71e30b8c41314703b0a0b0bbba75856b",
    Digital : "2a56",
    CharacteristicFormat : "2904",
    //IAQ : "ec61a454ed01a5e8b8f9de9ec026ec51", //SERVICE
    //ECO2 : "efd658aec401ef3376e791b00019103b",
    //TV02 : "efd658aec402ef3376e791b00019103b",
    //IAQControlPoint : "efd658aec402ef3376e791b00019103b",
    //UI : "fcb89c40c60059f37dc35ece444a401b", //SERVICE
    //Buttons : "fcb89c40c60159f37dc35ece444a401b",
    //LEDs : "fcb89c40c60259f37dc35ece444a401b",
    //RGBLEDs : "fcb89c40c60359f37dc35ece444a401b",
    //UIControlPoint : "fcb89c40c60459f37dc35ece444a401b",
    NumDigitals : "2909"
    //AutimationIO : 1815 //SERVICE
    //AutimationDigital : 2A56
  },
  
  "Key" : {
    DeviceName : "device-name",
    Appearance : "appearance",
    ServiceChanged : "service-changed",
    Manufacturer : "manufacturer",
    ModelNumber : "model-num",
    //SerialNumber : "serial-num",
    HardwareRevision : "hardware-revision",
    FirmwareRevision : "firmware-revision",
    SystemId : "system-id",
    BatteryLevel : "battery-level",
    Pressure : "pressure",
    Humidity  : "humidity",
    Temperature : "temperature",
    Uv : "uv",
    AmbientLight : "ambient-light",
    Microphone : "microphone",
    CscMeasurement : "csc-measurement",
    CscFeature : "csc-feature",
    ScControlPoint : "sc-control-point",
    Acceleration : "acceleration",
    Orientation : "orientation",
    ControlPoint : "control-point",
    Digital : "digital",
    CharacteristicFormat : "characteristic-format",
    //Unknown1 : "unknown-1",
    //Unknown2 : "unknown-2",
    //Unknown3 : "unknown-3",
    //Unknown4 : "unknown-4",
    //Unknown5 : "unknown-5",
    //Unknown6 : "unknown-6",
    NumDigitals : "num-digitals"
  }
};

constants["Descriptors"] = { /*** TODO: ****/ };

module.exports = constants;
