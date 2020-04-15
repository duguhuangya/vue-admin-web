
/**
 * @param {data} 任意参数
 * @returns {Object}
 * @description 任意数据深拷贝
 */
export const deepClone = (data) => {
    let type = getType(data)
    let obj
    if (type === 'array') {
        obj = []
    } else if (type === 'object') {
        obj = {}
    } else {
        // 不再具有下一层次
        return data
    }
    if (type === 'array') {
        for (let i = 0, len = data.length; i < len; i++) {
            obj.push(deepClone(data[i]))
        }
    } else if (type === 'object') {
        for (let key in data) {
            obj[key] = deepClone(data[key])
        }
    }
    return obj
}

/**
 * @param {obj} 任意参数
 * @returns {String}
 * @description 判断参数类型
 */
export const getType = (obj) => {
    // tostring会返回对应不同的标签的构造函数
    let toString = Object.prototype.toString
    let map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    }
    if (obj instanceof Element) {
        return 'element'
    }
    return map[toString.call(obj)]
}