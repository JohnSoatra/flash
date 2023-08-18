const Consonants = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const Numbers = '0123456789';

function random(length: number = 6, onlyNumber: boolean = true) {
    let result = '';
    let characters = onlyNumber ? Numbers : (Consonants + Numbers);
    let charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export default random;