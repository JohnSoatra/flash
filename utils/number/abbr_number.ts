function abr(num: number, dec = 1) {
    let result = num.toString();
    const decPlaces = Math.pow(10, dec);
    const abbrev = [ "k", "m", "b", "t" ];
    
    for (let i = abbrev.length - 1; i >= 0; i --) {
        const size = Math.pow(10, (i + 1 ) * 3);

        if(size <= num) {
            num = Math.round(num * decPlaces / size) / decPlaces;
            
            if((num == 1000) && (i < abbrev.length - 1)) {
                num = 1;
                i ++;
            }
            
            result = num.toString() + abbrev[i];
            
            break;
        }
    }

    return result;
}

export default abr;