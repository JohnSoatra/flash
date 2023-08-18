import CryptoJS from "crypto-js";

function encrypt(
    plainText: string,
    secretKeys: string[],
) {
    let result = plainText;
    
    for (let secretKey of secretKeys) {
        result = CryptoJS.AES.encrypt(result, secretKey).toString();
    }

    return result;
}

export default encrypt;