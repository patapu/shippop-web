import { addDelay } from "../ctrl/timeout"

export const initCart = async ({ items }) => {
  try {
    await addDelay(1000)
    console.log(items)
    const cart = items.reduce((prev, item) => {
      if (!prev.find(store => store.storeID === item.storeID)) {
        prev.push({
          storeID: item.storeID,
          storeName: item.storeName,
          storeDescription: item.storeDescription,
          items: items.filter(itemObj => item.storeID === itemObj.storeID)
        })
      }
      return prev
    }, [])
    localStorage.setItem('cart', JSON.stringify(cart))
    return Promise.resolve(cart)
  } catch (error) {
    return Promise.reject(error)
  }
}


export const addItem = async ({ items, item, count }) => {
  try {
    await addDelay(1000)
    const itemIndex = items.findIndex(itemObj => itemObj.itemID === item.itemID)
    let sum
    if (itemIndex !== -1) {
      items[itemIndex].sum += count
      sum = items[itemIndex].sum
    } else {
      items.push({
        ...item,
        sum: count
      })
      sum = count
    }
    const cart = await initCart({ items })
    console.log("addItem", cart)

    return Promise.resolve({ cart, sum, items })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const subtractItem = async ({ count, items, item }) => {
  try {
    await addDelay(2000)
    const itemIndex = items.findIndex(itemObj => itemObj.itemID === item.itemID)
    let sum
    if (itemIndex !== -1) {
      items[itemIndex].sum -= count
      sum = items[itemIndex].sum
      if (sum === 0) {
        items = items.filter((_, index) => index !== itemIndex)
      }
    }
    const cart = await initCart({ items })
    return Promise.resolve({ cart, sum, items })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const deleteStore = async ({ items, storeID }) => {
  try {
    let storeName
    await addDelay(2000)
    items = items.filter(item => {
      if (item.storeID === storeID) {
        storeName = item.storeName
        return false
      }
      return true
    })
    const cart = await initCart({ items })
    return Promise.resolve({ items, cart, storeName })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const clearCart = async () => {
  try {
    await addDelay(2000)
    return Promise.resolve({ cart: [], items: [] })
  } catch (error) {
    return Promise.reject(error)
  }
}
