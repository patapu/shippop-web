import moment from "moment"

export const showPickListText = (pickList, value, defaultText = "") => {
    const data = pickList.length && pickList.find(obj => obj.value === value)
    return (data && data.text) || defaultText
}

export const addNextSpace = (data, space = ' ') => (data && `${data.trim()}${space}`) || ''
export const upperFirstChar = text => text && text[0] && text[0].toUpperCase()
export const showAddress = address => (`\
${addNextSpace(address.address_line1)}\
${showAddressNoLine1(address)}`).trim()
export const showAddressNoLine1 = address => (`${addNextSpace(address.sub_district_address_sub_district_sub_district)}\
    ${addNextSpace(address.district_address_district_district)}\
    ${addNextSpace(address.province_address_province_province)}\
    ${addNextSpace(address.country_address_country_country)}\
    ${addNextSpace(address.address_postalcode)}`).trim()
export const showType = type => (type.customer_id && 'Customer')
    || (type.contact_id && 'Contact')
    || (type.lead_id && 'Lead')
    || '-'
export const showInterest = (interestList, item) => (`${
    addNextSpace(item.interest_1 && showPickListText(interestList, item.interest_1))
}${
    addNextSpace(item.interest_2 && showPickListText(interestList, item.interest_2))
}${
    addNextSpace(item.interest_3 && showPickListText(interestList, item.interest_3))
}`).trim().split(' ').join(', ')
export const showName = user => (`${addNextSpace(user.first_name)}${addNextSpace(user.last_name)}`).trim()

export const concatName = (data, keys = [
    'title_code_table',
    'first_name',
    'last_name',
]) => keys.reduce((prev, key) => {
    const text = data[key]
    if (key.includes('title'))
        return text.slice(0, 4) === "Miss" ? addNextSpace(text) : text
    return `${prev}${addNextSpace(text)}`
}, '').trim()
export const showFullname = user => (`${user.title_code_table
    ? (user.title_code_table.slice(0, 4) === "Miss"
        ? addNextSpace(user.title_code_table)
        : user.title_code_table)
    : ''}${addNextSpace(user.first_name)}${addNextSpace(user.last_name)}`).trim()
export const showSocialIDByChannel = social => {
    const switchObj = {
        facebook: 'facebook_id',
        line: 'line_id',
        twitter: 'twitter_id',
    }
    return social[switchObj[social.channel]]
}
export const showMobilephone = user => {
    const slashIndex = user.mobilephone && ((user.mobilephone.length >= 10 && 3) || 2)
    if (!slashIndex) return ''
    return `${user.mobilephone.slice(0, slashIndex)}-${user.mobilephone.slice(slashIndex)}`
}
export const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount
        const negativeSign = amount < 0 ? "-" : "";
    
        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
    
        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}
export const formatInputMoney = amount => `${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
export const showCount = (count, defaultValue) => defaultValue === undefined || count ? formatMoney(count, 0) : defaultValue
export const showMoney = (amount, defaultValue) => defaultValue === undefined || amount ? `THB ${formatMoney(amount)}` : defaultValue
export const showDate = date => date && moment(date).format("DD/MM/YYYY")
export const showDateAndHours = date => date && moment(date).format("DD/MM/YYYY hh:mm")
export const showDateAndTime = date => date && moment(date).format("DD/MM/YYYY hh:mm:ss")
export const showAge = date => date && moment().diff(date, 'years')

export const avatarAltByFullname = (fullname, defaultAlt = "NA") => (`${fullname ? fullname.split(' ').map(
    text => upperFirstChar(text)).join('') : defaultAlt}`).trim()
export const avatarAlt = (user, keys = ['first_name', 'last_name']) => (`${keys.map(
    key => user[key] ? upperFirstChar(user[key]) : '').join('')}`).trim()

export const showMillion = (value, dot = 1) => formatMoney(Math.round((value / 1000000) * Math.pow(10, dot)) / Math.pow(10, dot), dot)
export const showKilo = (value, dot = 0) => formatMoney(Math.round((value / 1000) * Math.pow(10, dot)) / Math.pow(10, dot), dot)
export const showShortNumber = (value, millDot = 1, kiloDot = 0) => (value >= 1000000 && `${showMillion(value, millDot)}M`)
    || (value >= 1000 && `${showKilo(value, kiloDot)}K`)
    || value

export const addLastBracket = (text, splitKey = ' ') => {
    let splitValue = text.split(splitKey).filter(v => v.trim())
    let lastValue = splitValue.pop()
    return `${splitValue.join(splitKey)}${splitValue.length ? splitKey : ''}${lastValue ? `(${lastValue})` :''}`
}

export const showDateComplete = (startDate, endDate, defaultShow = '') => {
    const m1 = moment(startDate)
    const m2 = moment(endDate)
    if (!startDate || !endDate) {
        if (startDate) return m1.format('DD/MM/YYYY hh:mm A')
        else if (endDate) return m2.format('DD/MM/YYYY hh:mm A')
        else return defaultShow
    }
    const isSameYear = m1.isSame(m2, 'Year')
    if (isSameYear) {
        const isSameMonth = m1.isSame(m2, 'month')
        if (isSameMonth) {
            const isSameDay = m1.isSame(m2, 'day')
            if (isSameDay) {
                const isSameAMPM = m1.format('A') === m2.format('A')
                if (isSameAMPM) {
                    const isSameTime = m1.isSame(m2, 'hour') && m1.isSame(m2, 'minute')
                    if (isSameTime) return m2.format('DD/MM/YYYY hh:mm A')
                    return `${m1.format('DD/MM/YYYY hh:mm')} - ${m2.format('hh:mm A')}`
                }
                return `${m1.format('DD/MM/YYYY hh:mm A')} - ${m2.format('hh:mm A')}`
            }
            return `${m1.format('DD')} - ${m2.format('DD/MM/YYYY')}`
        }
        return `${m1.format('DD/MM')} - ${m2.format('DD/MM/YYYY')}`
    }
    return `${m1.format('DD/MM/YYYY')} - ${m2.format('DD/MM/YYYY')}`
}

export const setPicklistLastBracket = rows => rows.map(({ text, value }) => ({
    value,
    text: addLastBracket(text)
}))

export const capitalize = value => value.charAt(0).toUpperCase() + value.slice(1)

export const removeNestKey = (data, ...keys) => {
    if (Array.isArray(data)) {
        return data.map((d) => removeNestKey(d, ...keys))
    } else if (typeof data === 'object') {
        Object.keys(data).forEach(key => {
            if (keys.includes(key)) delete data[key]
            else if (Array.isArray(data[key])) removeNestKey(data[key], ...keys)
        })
        return data
    }
    return data
}

export const setDefaultKey = (defaultObj, targetObj) => Object.keys(defaultObj).reduce((prev, key) => ({ ...prev, [key]: targetObj[key] }), {})
