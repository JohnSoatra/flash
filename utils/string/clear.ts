function clear(str: string, ...rest: any) {
    str = str.replace(/\s/g, '');
    
    for (let [index, value] of Object.entries(rest)) {
        str = str.replace(RegExp(`\\$${index}`, 'g'), value as any);
    }

    return str;
}

export default clear;