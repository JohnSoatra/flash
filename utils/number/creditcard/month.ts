function expiredMonth(expireAt: string) {
    return expireAt.split('/')[0].trim();
}

export default expiredMonth;