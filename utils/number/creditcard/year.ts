function expiredYear(expireAt: string) {
    return expireAt.split('/')[1].trim();
}

export default expiredYear;