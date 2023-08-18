import CryptoJS from "crypto-js";

function decrypt(
    encryptedText: string,
    secretKeys: string[],
) {
    let result = encryptedText;
    
    for (let secretKey of secretKeys) {
        result = CryptoJS.AES.decrypt(result, secretKey).toString(CryptoJS.enc.Utf8);
    }

    return result;
}

export default decrypt;