function getNext5Year(): string {
    return (new Date().getFullYear() + 5).toString().slice(2);
}

export default getNext5Year;