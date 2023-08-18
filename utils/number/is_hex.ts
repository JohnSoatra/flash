const re = /^(0x[0-9a-f]{1,}|[0-9a-f]{1,})$/;

function isHex(string: string) {
    return re.test(string);
}

export {
    isHex
}