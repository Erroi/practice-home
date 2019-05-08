function deepCopy(origin) {
    if(origin === null){
        return null;
    }
    if (origin instanceof Map) {
        let tmpMap = new Map();
        for (let [key, value] of origin) {
            let result = deepCopy(value);
            tmpMap.set(key, result);
        }
        return tmpMap;
    } else if (origin instanceof Set) {
        let tmpSet = new Set();
        for (let value of origin) {
            let result = deepCopy(value);
            tmpSet.add(result);
        }
        return tmpSet;
    } else if (Array.isArray(origin)) {
        let tmpArr = [];
        for (let item of origin) {
            tmpArr.push(deepCopy(item));
        }
        return tmpArr;
    } else if (Object.prototype.toString.call(origin) === '[object Object]') {
        let tmpObj = {};
        for (let key in origin) {
            if (origin.hasOwnProperty(key)) {
                tmpObj[key] = deepCopy(origin[key]);
            }
        }
        return tmpObj;
    }
    return origin;
}

function deepClone(obj){
    if(obj === null){
        return null;
    }
    if(obj instanceof Date){
        return new Date(obj)
    } else if(obj instanceof RegExp){
        return new RegExp(obj)
    } else if(typeof obj !== 'object') {
        return obj
    }
    let t = new obj.constructor();
    for(let key in obj){
        t[key] = deepClone(obj[key]);
    }
    return t;
}