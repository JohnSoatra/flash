function randomChoose<Type>(array: Type[]): Type {
    const random = Math.floor(Math.random() * array.length);
    
    return array[random];
}

export default randomChoose;