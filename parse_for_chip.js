// Byte         Comment              Value
// Byte[1:2]    Company ID           0xFFFF
// Byte[3:4]    Letta Prefix         0x544C (ASCII : ‘LT’)
// Byte[5]      Hardware Version     0x02
// Byte[6]      Firmware Version     0x01
// Byte[7:8]    Custom Data Area-1   0x4934 (ASCII : ‘I4’)
// Byte[9:10]   Custom Data Area-2   0x0000
// Byte[11]     Button State         Between 0x00 and 0x03
// Byte[12]     Battery Level        Between 0x00 and 0x64
// Byte[13]     RSSI @1m             0xC4 (As Decimal : -60)
// Byte[14]     TX Power             0xEC for -20dbM ; 0x00 for 0dbM
// Byte[15]     Motion Status        When motion detect 0x01; normally 0x00
// Byte[16]     Reserved             0x00

// sample input: 0xFFFF4C540101493400000264C4000000
// sample output:
/*
{
  companyID: 65535,
  lettaPrefix: 19540,
  hardwareVersion: 1,
  firmwareVersion: 1,
  customDataArea1: 18740,
  customDataArea2: 0,
  buttonState: 2,
  batteryLevel: 100,
  rssi: 196,
  txPower: 0,
  motionStatus: 0,
  reserved: 0
}
*/

function hexToDec(hex) {
  return parseInt(hex, 16);
}

/**
 * @brief Parses a hex string into a JSON object.
 * @param string A string to convert into a JSON object.
 */
function parse(data) {
  // check if the string is 32 + 2 characters long
  if (data.length !== 34) {
    throw new Error("Invalid string length");
  }
  // check if the string is a hex string
  // substr(2, 33) to skip the 0x prefix
  if (!/^[0-9A-Fa-f]+$/.test(data.substr(2, 33))) {
    throw new Error("Not a hex string");
  }
  return {
    companyID: hexToDec(data.substr(2, 4)),
    lettaPrefix: hexToDec(data.substr(6, 4)),
    hardwareVersion: hexToDec(data.substr(10, 2)),
    firmwareVersion: hexToDec(data.substr(12, 2)),
    customDataArea1: hexToDec(data.substr(14, 4)),
    customDataArea2: hexToDec(data.substr(18, 4)),
    buttonState: hexToDec(data.substr(22, 2)),
    batteryLevel: hexToDec(data.substr(24, 2)),
    rssi: hexToDec(data.substr(26, 2)),
    txPower: hexToDec(data.substr(28, 2)),
    motionStatus: hexToDec(data.substr(30, 2)),
    reserved: hexToDec(data.substr(32, 2))
  };
}

console.log(parse("0xFFFF4C540101493400000264C4000000"));
