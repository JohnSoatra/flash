type Keys = 'electron'|'maestro'|'dankort'|'interpayment'|'unionpay'|'visa'|'mastercard'|'amex'|'diners'|'discover'|'jcb';
type Type = {
    electron: RegExp,
    maestro: RegExp,
    dankort: RegExp,
    interpayment: RegExp,
    unionpay: RegExp,
    visa: RegExp,
    mastercard: RegExp,
    amex: RegExp,
    diners: RegExp,
    discover: RegExp,
    jcb: RegExp,
}

const regex: Type = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    dankort: /^(5019)\d+$/,
    interpayment: /^(636)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/
}

function cardType(creditCardNumber: number): number {
    let index = 0;

    for (let key in regex) {
        if (regex[key as Keys].test(String(creditCardNumber))) {
            return index;
        }

        index ++;
    }

    return -1;
}

function cardTypeString(index: number) {
    let _index = 0;

    for (let key in regex) {
        if (index === _index) {
            return key;
        }

        _index ++;
    }

    return null;
}

export {
    cardType,
    cardTypeString
};