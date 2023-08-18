import { isNumber } from "../number/number";

function isCvc(string: string) {
    return isNumber(string) && (string.length === 3 || string.length === 4);
}

export default isCvc;