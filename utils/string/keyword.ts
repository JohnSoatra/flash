function keyword(string: string) {
    return string.split(/[^A-Za-z0-9]/).filter((each: string) => each).join('|');
}

export default keyword;