// Byte         Comment              Value
// Byte[1]      AdvA                 0x06
// Byte[2:4]    Adv flags            0x020106
// Byte[5:8]    ID                   0x0303AAFE
// Byte[9]      Length
// Byte[10]     Adv Type             0x16
// Byte[11:12]  UUID                 0xAAFE
// Byte[13]     Frame Type           0x21
// Byte[14]     Version Tag          0x1
// Byte[15:16]  Sensor mask          0bit: voltage, 1bit:temp, 2bit: humidty, 3bit: acc, 4~7bit: reserved
// Byte[17:18]  Voltage              big-endian battery voltage, unit is mV
// Byte[19:20]  Temperature          Exist if temp bit set 1. Temperature, Fixed Point 8.8 format
// Byte[21:22]  Humidity             Exist if humidty bit set 1. Temperature, Fixed Point 8.8 format
// Byte[23:24]  Acc axis X pos       Exist if acc bit was set 1. big-endian axis X, unit is mg
// Byte[25:26]  Acc axis Y pos       Exist if acc bit was set 1. big-endian axis Y, unit is mg
// Byte[27:28]  Acc axis Z pos       Exist if acc bit was set 1. big-endian axis Z, unit is mg

// sample input: 0x060201060303AAFE45163FC20201000000050EAF13880EC000C30021
// sample output:
/*
{
  advA: 6,
  advFlags: 131334,
  id: 50572030,
  length: 69,
  advType: 22,
  uuid: 16322,
  frameType: 2,
  versionTag: 1,
  sensorMask: 0,
  voltage: 5,
  temperature: 37.59,
  humidity: 50,
  accX: 3776,
  accY: 195,
  accZ: 33
}
*/

function hexToDec(hex) {
  return parseInt(hex, 16);
}

// TODO: Voltage should be in big endian format
function parse(data) {
  // check if the string is 28*2 + 2 characters long
  if (data.length !== 58) {
    throw new Error("Invalid string length");
  }
  // check if the string is a hex string
  // substr(2, 33) to skip the 0x prefix
  if (!/^[0-9A-Fa-f]+$/.test(data.substr(2, 53))) {
    throw new Error("Not a hex string");
  }
  return {
    advA: hexToDec(data.substr(2, 2)),
    advFlags: hexToDec(data.substr(4, 6)),
    id: data.substr(10, 8),
    length: hexToDec(data.substr(18, 2)),
    advType: hexToDec(data.substr(20, 2)),
    uuid: data.substr(22, 4),
    frameType: hexToDec(data.substr(26, 2)),
    versionTag: hexToDec(data.substr(28, 2)),
    sensorMask: hexToDec(data.substr(30, 4)),
    voltage: hexToDec(data.substr(34, 4)),
    temperature: hexToDec(data.substr(38, 4)) / 100,
    humidity: hexToDec(data.substr(42, 4)) / 100,
    accX: hexToDec(data.substr(46, 4)),
    accY: hexToDec(data.substr(50, 4)),
    accZ: hexToDec(data.substr(54, 4)),
  };
}

console.log(
  parse("0x060201060303AAFE45163FC20201000000050EAF13880EC000C30021")
);
