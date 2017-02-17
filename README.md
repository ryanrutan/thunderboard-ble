# thunderboard-ble
by: [Ryan Rutan](https://github.com/ryanrutan)

A Node.js library to assist with the reading of data from the following Silicon Labs products.

>Note:  This code was pulled out of a project and converted into an npm module.  It still has a lot of refactoring and features to be added to make it complete, but in it's state ... it does a good job at auto-subscribing to Thunderboard data-events for processing.  **_Pull requests and feedback are always welcome; however, time to maintain this library is limited ... so patience is appreciated._** So hope you enjoy. =)

- [Thunderboard React](http://www.silabs.com/products/development-tools/wireless/bluetooth/thunderboard-react-kit-sensor-cloud-connectivity)
- [Thunderboard Sense](https://www.silabs.com/products/development-tools/wireless/bluetooth/thunderboard-sense-kit)

## Install

```bash
npm install thunderboard-ble --save
```

## Usage
Below is an example use of this library.

- **config** - JSON map of ble devices by MAC address.
- **dataCallback** - Function to handle callbacks as defined by *readIntervals* in the **config**
- **normalizeData** *(optional)*- [true|false (default)] Used to interpret the raw data values and convert them to clean measurement values.

```javascript
    var config = {
        "000b5bbbaaaa" : {
         "uuid" : "000b5bbbaaaa",
         "enabled" : false,
         "family" : "thunderboard",
         "type" : "react",
         "autoconnect" : true,
         "readIntervals" : {
           "environment" : {
             "humidity" : 15000,
             "temperature" : 15000,
             "uv" : 15000
           },
           "ambient-light" : {
             "ambient-light" : 15000
           }
          },
         "services" : {
           "generic-access" : ["device-name"],
           "device-info" : ["manufacturer"],
           "environment" : ["humidity","temperature","uv"],
           "ambient-light" : ["ambient-light"]
        }
      }
    };

    var dataCallback = function(data) {
      console.log('Thunderboard Event',data);
    };

    var normalizeData = true;

    var ThunderBoard = require('thunderboard-ble');
    var tb = new ThunderBoard(config,dataCallback,normalizeData);
```

# Service / Characterstic Names

## Thunderboard **React**

|   Service	|  Characteristics 	|
|---	|:--	|
| generic-access | device-name, appearance |
| generic-attribute	|  service-changed 	|
| device-info	|  manufacturer, model-num, hardware-revision, firmware-revision, system-id	|
| battery	| battery-level 	|
| environment	|  humidity, temperature, uv	|
| ambient-light	|  ambient-light 	|
| cycling-speed-cadence	|  csc-measurement, csc-feature, sc-control-point |
| acceleration-orientation	|  acceleration, orientation, control-point, 	|
| automation	|  digital, characteristic-format, num-digitals |

## Thunderboard **Sense**

> Note: I have not mapped all the Sense services/characteristics yet, but will complete in the near future.

|   Service	|  Characteristics 	|
|---	|:--	|
| generic-access | device-name, appearance |
| generic-attribute	|  service-changed 	|
| device-info	|  manufacturer, model-num, hardware-revision, firmware-revision, system-id	|
| battery	| battery-level 	|
| environment	|  humidity, temperature, uv, ambient-light, microphone	|
| cycling-speed-cadence	|  csc-measurement, csc-feature, sc-control-point |
| acceleration-orientation	|  acceleration, orientation, control-point, 	|
| automation	|  digital, characteristic-format, num-digitals |
