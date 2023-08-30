function formatNumber(value: string) {
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    return val;
}

export default formatNumber;