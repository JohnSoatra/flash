function formatCvc(value: string) {
    const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = val.match(/\d{3,4}/g);
    const match = (matches && matches[0]) || "";
     
    if (match) {
        return val.slice(0, 4);
    }

    return val;
}

export default formatCvc;