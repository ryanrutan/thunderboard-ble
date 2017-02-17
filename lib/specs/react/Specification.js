var tb = require('./ThunderboardConstants');

var spec = {};
spec["services"] = {};
/*** GENERIC ACCESS SERVICE ***/
spec["services"][tb.Service.Key.GenericAccess] = {
  "uuid" : tb.Service.Uuid.GenericAccess,
  "name" : tb.Service.Key.GenericAccess,
  "label" : "Generic Access Service"
};
spec["services"][tb.Service.Key.GenericAccess]["characteristics"] = {};
spec["services"][tb.Service.Key.GenericAccess]["characteristics"][tb.Characteristic.Key.DeviceName] = {
  "uuid" : tb.Characteristic.Uuid.DeviceName,
  "name" : tb.Characteristic.Key.DeviceName,
  "label" : "Device Name",
  "readonly" : false,
  "maxLength" : 20
};
spec["services"][tb.Service.Key.GenericAccess]["characteristics"][tb.Characteristic.Key.Appearance] = {
  "uuid" : tb.Characteristic.Uuid.Appearance,
  "name" : tb.Characteristic.Key.Appearance,
  "label" : "Appearance",
  "readonly" : true
};

/*** GENERIC ATTRIBUTE SERVICE ***/
spec["services"][tb.Service.Key.GenericAttribute] = {
  "uuid" : tb.Service.Uuid.GenericAttribute,
  "name" : tb.Service.Key.GenericAttribute,
  "label" : "Generic Attribute Service"
};
spec["services"][tb.Service.Key.GenericAttribute]["characteristics"] = {};
spec["services"][tb.Service.Key.GenericAttribute]["characteristics"][tb.Characteristic.Key.ServiceChanged] = {
  "uuid" : tb.Characteristic.Uuid.ServiceChanged,
  "name" : tb.Characteristic.Key.ServiceChanged,
  "label" : "Service Changed",
  "readonly" : true,
  "indicate" : true
};

/*** DEVICE INFO SERVICE ***/
spec["services"][tb.Service.Key.DeviceInfo] = {
  "uuid" : tb.Service.Uuid.DeviceInfo,
  "name" : tb.Service.Key.DeviceInfo,
  "label" : "Device Information Service"
};
spec["services"][tb.Service.Key.DeviceInfo]["characteristics"] = {};
spec["services"][tb.Service.Key.DeviceInfo]["characteristics"][tb.Characteristic.Key.Manufacturer] = {
  "uuid" : tb.Characteristic.Uuid.Manufacturer,
  "name" : tb.Characteristic.Key.Manufacturer,
  "label" : "Manufacturer Name String",
  "readonly" : true
};
spec["services"][tb.Service.Key.DeviceInfo]["characteristics"][tb.Characteristic.Key.ModelNumber] = {
  "uuid" : tb.Characteristic.Uuid.ModelNumber,
  "name" : tb.Characteristic.Key.ModelNumber,
  "label" : "Model Number String",
  "readonly" : true
};
spec["services"][tb.Service.Key.DeviceInfo]["characteristics"][tb.Characteristic.Key.HardwareRevision] = {
  "uuid" : tb.Characteristic.Uuid.HardwareRevision,
  "name" : tb.Characteristic.Key.HardwareRevision,
  "label" : "Hardware Revision String",
  "readonly" : true
};
spec["services"][tb.Service.Key.DeviceInfo]["characteristics"][tb.Characteristic.Key.FirmwareRevision] = {
  "uuid" : tb.Characteristic.Uuid.FirmwareRevision,
  "name" : tb.Characteristic.Key.FirmwareRevision,
  "label" : "Firmware Revision String",
  "readonly" : true
};
spec["services"][tb.Service.Key.DeviceInfo]["characteristics"][tb.Characteristic.Key.SystemId] = {
  "uuid" : tb.Characteristic.Uuid.SystemId,
  "name" : tb.Characteristic.Key.SystemId,
  "label" : "System ID",
  "readonly" : true
};

/*** BATTERY SERVICE ***/
spec["services"][tb.Service.Key.Battery] = {
  "uuid" : tb.Service.Uuid.Battery,
  "name" : tb.Service.Key.Battery,
  "label" : "Battery Service"
};
spec["services"][tb.Service.Key.Battery]["characteristics"] = {};
spec["services"][tb.Service.Key.Battery]["characteristics"][tb.Characteristic.Key.BatteryLevel] = {
  "uuid" : tb.Characteristic.Uuid.BatteryLevel,
  "name" : tb.Characteristic.Key.BatteryLevel,
  "label" : "Battery Level",
  "readonly" : true,
  "notify" : true
};

/*** ENVIRONMENT SERVICE ***/
spec["services"][tb.Service.Key.Environment] = {
  "uuid" : tb.Service.Uuid.Environment,
  "name" : tb.Service.Key.Environment,
  "label" : "Environmental Sensing Service"
};
spec["services"][tb.Service.Key.Environment]["characteristics"] = {};
spec["services"][tb.Service.Key.Environment]["characteristics"][tb.Characteristic.Key.Humidity] = {
  "uuid" : tb.Characteristic.Uuid.Humidity,
  "name" : tb.Characteristic.Key.Humidity,
  "label" : "Humidity",
  "readonly" : true
};
spec["services"][tb.Service.Key.Environment]["characteristics"][tb.Characteristic.Key.Temperature] = {
  "uuid" : tb.Characteristic.Uuid.Temperature,
  "name" : tb.Characteristic.Key.Temperature,
  "label" : "Temperature",
  "readonly" : true
};
spec["services"][tb.Service.Key.Environment]["characteristics"][tb.Characteristic.Key.Uv] = {
  "uuid" : tb.Characteristic.Uuid.Uv,
  "name" : tb.Characteristic.Key.Uv,
  "label" : "UV Index",
  "readonly" : true
};

/*** AMBIENT LIGHT SERVICE ***/
spec["services"][tb.Service.Key.AmbientLight] = {
  "uuid" : tb.Service.Uuid.AmbientLight,
  "name" : tb.Service.Key.AmbientLight,
  "label" : "Ambient Light Service"
};
spec["services"][tb.Service.Key.AmbientLight]["characteristics"] = {};
spec["services"][tb.Service.Key.AmbientLight]["characteristics"][tb.Characteristic.Key.AmbientLight] = {
  "uuid" : tb.Characteristic.Uuid.AmbientLight,
  "name" : tb.Characteristic.Key.AmbientLight,
  "label" : "Ambient Light",
  "readonly" : true
};

/*** CYCLE SPEED AND CADENCE SERVICE ***/
spec["services"][tb.Service.Key.CyclingSpeedCadence] = {
  "uuid" : tb.Service.Uuid.CyclingSpeedCadence,
  "name" : tb.Service.Key.CyclingSpeedCadence,
  "label" : "Cycling Speed and Cadence Service"
};
spec["services"][tb.Service.Key.CyclingSpeedCadence]["characteristics"] = {};
spec["services"][tb.Service.Key.CyclingSpeedCadence]["characteristics"][tb.Characteristic.Key.CscMeasurement] = {
  "uuid" : tb.Characteristic.Uuid.CscMeasurement,
  "name" : tb.Characteristic.Key.CscMeasurement,
  "label" : "CSC Measurement",
  "notify" : true
};
spec["services"][tb.Service.Key.CyclingSpeedCadence]["characteristics"][tb.Characteristic.Key.CscFeature] = {
  "uuid" : tb.Characteristic.Uuid.CscFeature,
  "name" : tb.Characteristic.Key.CscFeature,
  "label" : "CSC Feature",
  "readonly" : true
};
spec["services"][tb.Service.Key.CyclingSpeedCadence]["characteristics"][tb.Characteristic.Key.ScControlPoint] = {
  "uuid" : tb.Characteristic.Uuid.ScControlPoint,
  "name" : tb.Characteristic.Key.ScControlPoint,
  "label" : "SC Control Point",
  "readonly" : false,
  "indicate" : true
};

/*** ACCELERATION / ORIENTATION SERVICE ***/
spec["services"][tb.Service.Key.AccelerationOrientation] = {
  "uuid" : tb.Service.Uuid.AccelerationOrientation,
  "name" : tb.Service.Key.AccelerationOrientation,
  "label" : "Acceleration and Orientation Service"
};
spec["services"][tb.Service.Key.AccelerationOrientation]["characteristics"] = {};
spec["services"][tb.Service.Key.AccelerationOrientation]["characteristics"][tb.Characteristic.Key.Acceleration] = {
  "uuid" : tb.Characteristic.Uuid.Acceleration,
  "name" : tb.Characteristic.Key.Acceleration,
  "label" : "Acceleration",
  "notify" : true
};
spec["services"][tb.Service.Key.AccelerationOrientation]["characteristics"][tb.Characteristic.Key.Orientation] = {
  "uuid" : tb.Characteristic.Uuid.Orientation,
  "name" : tb.Characteristic.Key.Orientation,
  "label" : "Orientation",
  "notify" : true
};
spec["services"][tb.Service.Key.AccelerationOrientation]["characteristics"][tb.Characteristic.Key.ControlPoint] = {
  "uuid" : tb.Characteristic.Uuid.ControlPoint,
  "name" : tb.Characteristic.Key.ControlPoint,
  "label" : "Control Point",
  "readonly" : false,
  "notify" : true
};

/*** AUTOMATION SERVICE ***/
spec["services"][tb.Service.Key.Automation] = {
  "uuid" : tb.Service.Uuid.Automation,
  "name" : tb.Service.Key.Automation,
  "label" : "Automation IO Service"
};
spec["services"][tb.Service.Key.Automation]["characteristics"] = {};
spec["services"][tb.Service.Key.Automation]["characteristics"][tb.Characteristic.Key.Digital] = {
  "uuid" : tb.Characteristic.Uuid.Digital,
  "name" : tb.Characteristic.Key.Digital,
  "label" : "Digital",
  "readonly" : false,
  "notify" : true
};
spec["services"][tb.Service.Key.Automation]["characteristics"][tb.Characteristic.Key.CharacteristicFormat] = {
  "uuid" : tb.Characteristic.Uuid.CharacteristicFormat,
  "name" : tb.Characteristic.Key.CharacteristicFormat,
  "label" : "Characteristic Presentation Format",
  "readonly" : true
};
spec["services"][tb.Service.Key.Automation]["characteristics"][tb.Characteristic.Key.NumDigitals] = {
  "uuid" : tb.Characteristic.Uuid.NumDigitals,
  "name" : tb.Characteristic.Key.NumDigitals,
  "label" : "Number of digitals",
  "readonly" : true
};

module.exports = spec;
