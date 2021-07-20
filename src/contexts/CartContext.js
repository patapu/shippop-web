import { useConfirm } from 'material-ui-confirm';
import { useSnackbar } from 'notistack';
import React, { createContext, useContext, useMemo, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useWait } from 'react-wait';
import * as cartAction from '../actions/cart';
import { copyDeep } from '../ctrl/cal';
import { AppContext } from './AppContext';

const state = {
  items: [],
  cart: [],
  visible: false,
}

const CartContext = createContext(state);

const cartReducer = (state, action) => {
  let newState = action?.payload || {};
  switch (action.type) {
    case 'SET_VALUE': {
      newState = [ ...newState ]
      break;
    }
    default:
      newState = state
      break;
  }
  localStorage.setItem('cart', JSON.stringify(newState))
  return newState
}

const CartProvider = props => {
  const { query, setQuery } = useContext(AppContext)
  const { enqueueSnackbar } = useSnackbar()
  const { startWaiting, endWaiting } = useWait()
  
  const [items, setItems] = useState(state.items)
  const [cart, actionCart] = useReducer(cartReducer, state.cart)

  const visible = useMemo(() => Boolean(query.openCart), [query.openCart])
  const setVisible = value => {
    const newQuery = copyDeep(query)
    if (!value) {
      delete newQuery.openCart
      setQuery(newQuery)
    } else {
      setQuery({
        ...query,
        openCart: value
      })
    }
  }

  const cartSum = useMemo(() => items.reduce((sum, item) => sum + item.sum, 0), [items])

  const addItem = async (item, count) => {
    try {
      startWaiting('cartAction')

      const { cart: newCart, sum, items: newItems } = await cartAction.addItem({ items, item, count })
      setItems([ ...newItems ])
      actionCart({
        type: 'SET_VALUE',
        payload: newCart
      })
      enqueueSnackbar(`Added "${item.itemName}" on your cart. (${sum})`, {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        }
      })
      endWaiting('cartAction')
    } catch (error) {
      console.error(error)
      endWaiting('cartAction')
    }
  }

  const subtractItem = async (item, count) => {
    try {
      startWaiting('cartAction')

      const { cart: newCart, sum, items: newItems } = await cartAction.subtractItem({ items, item, count })
      setItems([ ...newItems ])
      actionCart({
        type: 'SET_VALUE',
        payload: newCart
      })
      enqueueSnackbar(sum
        ? `Subtract "${item.itemName}" on your cart. (${sum})`
        : `Remove "${item.itemName}" on your cart`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          }
        })
      endWaiting('cartAction')
    } catch (error) {
      console.error(error)
      endWaiting('cartAction')
    }
  }

  const deleteStore = async (storeID) => {
    try {
      startWaiting('deleteStore')

      const { cart: newCart, items: newItems, storeName } = await cartAction.deleteStore({ items, storeID })
      setItems([ ...newItems ])
      actionCart({
        type: 'SET_VALUE',
        payload: newCart
      })
      enqueueSnackbar(`Remove "${storeName} store" on your cart`, {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        }
      })
      endWaiting('deleteStore')
    } catch (error) {
      console.error(error)
      endWaiting('deleteStore')
    }
  }
  const clearCart = async () => {
    try {
      startWaiting('clearCart')

      const { cart: newCart, items: newItems } = await cartAction.clearCart()
      setItems([ ...newItems ])
      actionCart({
        type: 'SET_VALUE',
        payload: newCart
      })
      enqueueSnackbar(`Clear your cart.`, {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        }
      })
      endWaiting('clearCart')
    } catch (error) {
      console.error(error)
      endWaiting('clearCart')
    }
  }

  return <CartContext.Provider
  value={{
    cart,
    addItem,
    subtractItem,
    deleteStore,
    clearCart,
    visible,
    setVisible,
    cartSum,
  }}
>
  {props.children}
</CartContext.Provider>
}

export { CartContext, CartProvider };