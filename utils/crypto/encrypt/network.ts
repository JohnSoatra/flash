import VARS from "@/constants/vars";
import encrypt from "./encrypt";

function networkEncrypt(rawString: string) {
    return encrypt(rawString, [VARS.ENV.networkSecret]);
}

export default networkEncrypt;