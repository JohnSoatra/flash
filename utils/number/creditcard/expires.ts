function formatExpires(value: string) {
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{2,4}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
     
    for (let i = 0; i < match.length; i += 2) {
        parts.push(match.substring(i, i + 2));
    }
     
    if (parts.length) {
        return parts.join(" / ");
    }

    return val;
}

export default formatExpires;