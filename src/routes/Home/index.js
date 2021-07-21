import { Button, Card, CardHeader, Grid, ListItem, ListItemText, Paper, Switch, Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import ProductCard from '../../components/Card/ProductCard'
import { AppContext } from '../../contexts/AppContext'
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
	const { toggleTheme, setting } = useContext(AppContext)
	return <Paper square>
		<ProductCard item={getItem(1)} />
		<ListItem>
		<ListItemText primary={
			setting.theme === 'dark'
			? 'Dark'
			: 'Light'
			}
		/>
		<Switch checked={setting.theme !== 'dark'} onChange={() => toggleTheme()}/>
		</ListItem>
	</Paper>
}