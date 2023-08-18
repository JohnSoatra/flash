function round(num: number, decimal = 2) {
    const con = Math.pow(10, decimal);
    return Math.round(num * con) / con;
}

export default round;