import { Badge, Container, makeStyles, Slide, useScrollTrigger } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useContext, useRef, useState } from 'react'
import { CartContext } from '../../contexts/CartContext'
import { AppContext } from '../../contexts/AppContext'

function HideOnScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return (
    <Slide appear={false} direction="left" in={!trigger} >
      {children}
    </Slide>
  );
}

export default function MainLayout({ children }) {
  const { setVisible, cartSum } = useContext(CartContext)
  const { toggleDrawer } = useContext(AppContext)
  
  const actions = [
    {
      name: 'Cart',
      icon: <Badge badgeContent={cartSum} color="secondary">
        <ShoppingCartIcon />
      </Badge>,
      onClick: e => setVisible(true)
    },
    {
      name: 'Menu',
      icon: <Badge color="secondary">
        <MenuIcon />
      </Badge>,
      onClick: e => toggleDrawer()
    }
  ]
  return <>
    <Container disableGutters>
      {children}
    </Container>
  </>
}