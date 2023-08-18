function getPath(fullPath: string) {
    fullPath = fullPath.replace(/^(http(s{0,1}):\/\/[^\/]+)/, '');
    fullPath = fullPath.replace(/(\?.*)$/, '');
    
    return fullPath;
}

export default getPath;