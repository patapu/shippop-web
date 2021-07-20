import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Card, Grid, IconButton, makeStyles, Typography } from '@material-ui/core'
import { BarChart, FavoriteBorder, ShoppingCartOutlined } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'
import React from 'react'
import { useState } from 'react'
import { showMoney } from '../../ctrl/format'

const useStyles = makeStyles(theme => ({
    root: {
        width: '234px',
    },
    img: {
        width: '150px',
        height: '150px',
    },
    hoverRoot: {
        width: '234px',
    },
    iconButton: {
        border: '2px solid #8C8C8C',
        color: '#8C8C8C',
        fontSize: '16px',
        width: '30px',
        height: '30px',
    },
    cartButton: {
        borderColor: '#0156FF',
        borderWidth: '2px',
        color: '#0156FF',
        borderRadius: '50px',
        height: '34px',
        padding: '8px 20px',
    }
}))

const createTestProduct = () => ({
    rating: 4,
    name: 'รสชาติของผลไม้ที่ยังไม่สุกงอม',
    price: 499,
    normalPrice: 599
})

export default function ProductCard({ productID, ...props }) {
    const classes = useStyles()
    const [isHover, setIsHover] = useState(false)
    const product = createTestProduct()
    return <Card className={isHover ? classes.hoverRoot : classes.root} onMouseOver={e => setIsHover(true)} onMouseLeave={e => setIsHover(false)}>
        <Box
            position="relative"
            width="100%"
            paddingTop="26px"
            textAlign="center"
        >
            <img alt="product-img" src="https://via.placeholder.com/150"/>
            <Box
                position="absolute"
                top={0}
                left="25px"
            >
                <Typography variant="caption" style={{ color: '#78A962' }}>
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                    />
                    <span style={{ paddingLeft: '4px' }}>มีสินค้า</span>
                </Typography>
            </Box>
            {isHover && <Box
                position="absolute"
                right="12px"
                top="16px"
                textAlign="right"
            >

                <IconButton size="small" className={classes.iconButton}>
                    <FavoriteBorder />
                </IconButton>
                <br/>
                <IconButton size="small" className={classes.iconButton}>
                    <BarChart/>
                </IconButton>
            </Box>}
        </Box>
        {isHover && <Grid container justifyContent="center">
            <Grid item>
                <Button variant="outlined" className={classes.cartButton}>
                    <ShoppingCartOutlined />
                    <span style={{ paddingLeft: '8px' }}>Add To Cart</span>
                </Button>
            </Grid>
        </Grid>}
        <Box
            padding="0 24px"
        >
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <Rating
                        name="hover-feedback"
                        size="small"
                        value={4}
                        precision={0.5}
                        readOnly
                    />
                </Grid>
                <Grid item>
                    <Typography color="textSecondary" variant="subtitle2">
                        Review ({4})
                    </Typography>
                </Grid>
            </Grid>
            <Typography style={{ fontSize: '13px' }} noWrap>
                {product.name}
            </Typography>
            <Box padding="8px" />
            <Typography style={{ textDecorationLine: 'line-through' }} variant="subtitle1" color="textSecondary">
                {showMoney(product.normalPrice)}
            </Typography>
            <Typography variant="h6">
                {showMoney(product.price)}
            </Typography>
        </Box>
        
    </Card>
}