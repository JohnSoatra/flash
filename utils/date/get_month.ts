function getCurrentMonth(): string {
    const month = new Date().getMonth();

    if (month < 10) {
        return '0' + month;
    }

    return month.toString();
}

export default getCurrentMonth;