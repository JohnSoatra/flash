import VARS from "@/constants/vars";

function isReleasedAt(string: string) {
    for (let key in VARS.RELEASED_AT) {
        if (string === VARS.RELEASED_AT[key]) {
            return true;
        }
    }

    return false;
}

export default isReleasedAt;