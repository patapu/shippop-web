import { Button, Card, CardHeader, Grid, Paper, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import ProductCard from '../../components/Card/ProductCard'
import { CartContext } from '../../contexts/CartContext'

const getItem = id => ({
	itemID: id,
	itemName: `name${id}`,
	storeID: id,
	storeName: `storeName${id}`,
	storeDescription: `storeDescription${id} storeDescription${id} storeDescription${id} storeDescription${id} storeDescription${id} \
	storeDescription${id} storeDescription${id} storeDescription${id} storeDescription${id} storeDescription${id}`,
	itemDescription: `itemDescription${id} itemDescription${id} itemDescription${id} itemDescription${id} itemDescription${id} \
	itemDescription${id} itemDescription${id} itemDescription${id} itemDescription${id} itemDescription${id}`,
	amount: 2
}) 

export default function Home(props) {
	const { addItem } = useContext(CartContext)
	return <Paper square>
		<ProductCard item={getItem(1)} />
	</Paper>
}