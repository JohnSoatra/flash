function isNullUndefined(value: any) {
    return (
        value === null ||
        value === undefined
    );
}

function stringEmpty(value: string) {
    return value === '';
}

function isPositive(num: number) {
    return num > 0;
}

function isZero(num: number) {
    return num === 0;
}

function isNegative(num: number) {
    return num < 0;
}

function createHeaders(csrfToken: string) {
    return new Headers({
        'Content-Type': 'x-www-form-urlencoded',
        'X-CSRF-TOKEN': csrfToken
    });
}

export {
    isNullUndefined,
    stringEmpty,
    isPositive,
    isNegative,
    isZero,
    createHeaders
};