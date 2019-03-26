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