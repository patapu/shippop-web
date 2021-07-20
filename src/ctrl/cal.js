import moment from "moment"
export const percentage = (value, sum, dot = 0, initBy = 'round') => {
    if (value >= sum) return 100
    if (value < 0) return 0
    return Math[initBy]((value / sum) * Math.pow(10, dot + 2)) / Math.pow(10, dot)
}

export const countDecimals = (value) => {
    if (`${Math.floor(value)}` === `${value}`) return 0
    if (!`${value}`.includes('.')) return 0
    return value.toString().split(".")[1].length || 0
}

export const arrayUnion = (...args) => {
    return [...new Set(args.reduce((prev, next) => {
        prev.push(...next)
        return prev
    }, []))]
}

export const isAllInChilden = ({ main, key }, ...args) => {
    main = key ? main.map(obj => obj[key] || obj) : main
    const targetArray = args.reduce((prev, next) => {
        next = key ? next.map(obj => obj[key] || obj) : next
        prev.push(...next)
        return prev
    }, [])
    console.log(main, targetArray)
    return !(main.filter(value => !targetArray.includes(value)).length)
}

export const isEqualForNest = (data1, data2) => {
    if (typeof data1 !== typeof data2) return false
    else if (data1 && typeof data1 === 'object') {
        const tempKeys1 = Object.keys(data1)
        const tempKeys2 = Object.keys(data2)
        if (tempKeys1.length !== tempKeys2.length) return false
        return tempKeys1.reduce((prev, key) => prev && isEqualForNest(data1[key], data2[key]), true)
            && Object.keys(data2).filter(key2 => !tempKeys1.includes(key2)).reduce((prev, key) => prev && isEqualForNest(data2[key], data1[key]), true)
    }
    else if (Array.isArray(data1)) {
        if (data1.length !== data2.length) return false
        return data1.reduce((prev, _, index) =>  prev && isEqualForNest(data1[index], data2[index]), true)
    }
    else return data1 === data2
}

export const isEmptyForNest = (data) => {
    if (!data) return true
    else if (typeof data === 'object') {
        const keys = Object.keys(data)
        if (!keys.length) return true
        else return Object.keys(data).reduce((prev, key) => prev && isEmptyForNest(data[key]), true)
    }
    else if (Array.isArray(data)) {
        if (!data.length) return true
        else return data.reduce((prev, _, index) =>  prev && isEmptyForNest(data[index]), true)
    }
    else return !data
}

export const isEmptyObject = data => {
    if (typeof data !== 'object') return false
    const keys = Object.keys(data)
    return !keys.length
}

export const isEmptyArray = data => {
    if (!Array.isArray(data)) return false
    return !data.length
}

export const filterEmptyForNest = (data) => {
    data = copyDeep(data)
    if (typeof data === 'object' && !Array.isArray(data)) {
        if (isEmptyObject(data)) return data
        const keys = Object.keys(data)
        keys.forEach(key => {
            let d = data[key]
            if (typeof d === 'object' || Array.isArray(d)) {
                data[key] = filterEmptyForNest(d)
                d = data[key]
            }
            if (isEmptyObject(d) || isEmptyArray(d)) {
                delete data[key]
            }
        })
    } else if (Array.isArray(data)) {
        if (isEmptyArray(data)) return data
        return data
            .map(d => {
                if (typeof d === 'object' || Array.isArray(d)) {
                    d = filterEmptyForNest(d)
                }
                return d
            })
            .filter((d, index) => {
                const con = !(isEmptyObject(d) || isEmptyArray(d))
                return con
            })
    }
    return data
}

export const isUUID = str => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str)

export const copyDeep = data => {
    try {
        return JSON.parse(JSON.stringify(data))
    } catch (error) {
        return data
    }
}

export const getARandom = (max = 100000, min = 0) => {
    return Math.floor(Math.random() * (max - min) + min)
}

export const getDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return ''
    const diff = moment(endDate).diff(startDate)
    return moment.duration(diff).humanize()
}