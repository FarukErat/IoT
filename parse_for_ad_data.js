// Byte         Comment              Value
// Byte[1]      AdvA                 0x06
// Byte[2:4]    Adv flags            0x020106
// Byte[5:8]    ID                   0x0303AAFE
// Byte[9]      Length
// Byte[10]     Adv Type             0x16
// Byte[11:12]  UUID                 0xAAFE
// Byte[13]     Frame Type           0x22
// Byte[14]     Model ID             Device Model ID
// Byte[15]     Battery Level        Battery Percentage
// Byte[16:21]  MAC Address          Big Endian
// Byte[22:23]  Software Version     Big-endian format. For example if the value is 0x0632, then version is V6.49

// sample input: 0x060201060303AAFE4516AAFE22FE320C30021E2E2F0FE0
// sample output:
/*

*/

function hexToDec(hex) {
  return parseInt(hex, 16);
}

// TODO: MAC address and software version should be in big endian format
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
        advA: hexToDec(data.substr(2, 2)),
        advFlags: hexToDec(data.substr(4, 6)),
        id: hexToDec(data.substr(10, 8)),
        length: hexToDec(data.substr(18, 2)),
        advType: hexToDec(data.substr(20, 2)),
        uuid: hexToDec(data.substr(22, 4)),
        frameType: hexToDec(data.substr(26, 2)),
        modelID: hexToDec(data.substr(28, 2)),
        batteryLevel: hexToDec(data.substr(30, 2)),
        macAddress: data.substr(32, 12),
        softwareVersion: hexToDec(data.substr(44, 4))
    };
}

console.log(parse("0x060201060303AAFE4516AAFE22FE320C30021E2E2F0FE0"));