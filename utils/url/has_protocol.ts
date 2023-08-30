function hasProtocol(url: string) {
    const regProtocol = /^((blob:){0,1}http(s){0,1}:\/\/.*)$/
    return regProtocol.test(url);
}


export default hasProtocol;