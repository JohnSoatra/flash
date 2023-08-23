function objectValues(object: {[key: string]: any}): any[] {
    return listValues([object]);
}

function listValues(object: any[]): any[] {
    const values = [];
    let hasObject = false;

    for (let each of object) {
        if (typeof each === 'object') {
            hasObject = true;
            values.push(...Object.values(each));
        } else {
            values.push(each);
        }
    }

    if (hasObject) {
        return listValues(values);
    }

    return object;
}

export default objectValues;