function toBoolean(str: 'true'|'false') {
    switch(str) {
        case 'true':
            return true;
        case 'false':
            return false;
    }
}

export default toBoolean;