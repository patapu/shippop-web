export const getItem = key => {
    let value = localStorage.getItem(key)
    try {
        value = JSON.parse(value)
    } catch (error) {
    }
    return value
}