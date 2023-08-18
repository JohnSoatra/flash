import { isNumber } from "../number/number";

function isCreditCardNumber(string: string) {
    return isNumber(string) && string.length === 14;
}

export default isCreditCardNumber;