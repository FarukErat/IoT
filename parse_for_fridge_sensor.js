// Byte         Comment              Value
// Byte[1:2]    Company ID           0xFFFF
// Byte[3:4]    Letta Prefix         0x544C (ASCII : ‘LT’)
// Byte[5]      Hardware Version     0x01
// Byte[6]      Firmware Version     0x01
// Byte[7]      Project ID           0x03
// Byte[8:9]    Temperature * 100    0x0F69 (Decimal : 3945) (Reel :39.45)
// Byte[10:11]  Humidity * 100       0x1388 (Decimal : 5000) (Reel : %50.00)
// Byte[12]     Door State           0x00 (0x00: Closed / 0x01: Open)
// Byte[13:16]  Door Open Count      Between Decimal : 0-4294967295
// Byte[17:20]  Door Open Time       1 Second Precision
// Byte[21]     Button Press Count   Between 0-3 (Decimal)
// Byte[22]     Battery Level        Between 0-100 (Decimal)
// Byte[23]     Reserved             0x00

// sample input: 0xFFFF4C540101030F69138801000000050000001E006400
// sample output:
/*
{
  companyID: 65535,
  lettaPrefix: 19540,
  hardwareVersion: 1,
  firmwareVersion: 1,
  projectID: 3,
  temperature: 39.45,
  humidity: 50,
  doorState: 1,
  doorOpenCount: 5,
  doorOpenTime: 30,
  buttonPressCount: 0,
  batteryLevel: 100,
  reserved: 0
}
*/

function hexToDec(hex) {
  return parseInt(hex, 16);
}

function parse(data) {
  // check if the string is 23*2 + 2 characters long
  if (data.length !== 48) {
    throw new Error("Invalid string length");
  }
  // check if the string is a hex string
  // substr(2, 33) to skip the 0x prefix
  if (!/^[0-9A-Fa-f]+$/.test(data.substr(2, 45))) {
    throw new Error("Not a hex string");
  }
  return {
    companyID: data.substr(2, 4),
    lettaPrefix: hexToDec(data.substr(6, 4)),
    hardwareVersion: hexToDec(data.substr(10, 2)),
    firmwareVersion: hexToDec(data.substr(12, 2)),
    projectID: data.substr(14, 2),
    temperature: hexToDec(data.substr(16, 4)) / 100,
    humidity: hexToDec(data.substr(20, 4)) / 100,
    doorState: hexToDec(data.substr(24, 2)),
    doorOpenCount: hexToDec(data.substr(26, 8)),
    doorOpenTime: hexToDec(data.substr(34, 8)),
    buttonPressCount: hexToDec(data.substr(42, 2)),
    batteryLevel: hexToDec(data.substr(44, 2)),
    reserved: hexToDec(data.substr(46, 2)),
  };
}

console.log(parse("0xFFFF4C540101030F69138801000000050000001E006400"));
