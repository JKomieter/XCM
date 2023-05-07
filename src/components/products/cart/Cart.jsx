import { Container, Typography, Button, Grid } from "@material-ui/core"
import PropTypes from "prop-types"
import useStyles from "./style"
import CartItem from "./cartItem/CartItem"
import { Link } from "react-router-dom"
function Cart({cart, handleRemoveFromCart, handleEmptyCart, handleUpdateCartQty}) {
    const classes = useStyles()
    
    console.log(cart)

    const EmptyCart = () => (
        <Typography variant="subtitle1" className={classes.Link}>
            You have no items in your cart, <Link to="/">start adding some</Link>!
        </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={4}>
                {
                    cart.line_items.map((item) => (
                        <Grid item xs={12} sm={3} key={item.id}>
                            <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart}/>
                        </Grid>
                    ))
                }
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant="h5">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button variant="contained" color="secondary" className={classes.emptyButton} size="large" type="button" onClick={handleEmptyCart}>
                        Empty Cart
                    </Button>
                    <Button component={Link} to="/checkout" variant="contained" color="primary" className={classes.checkoutButton} size="large" type="button">
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    )

    if (!cart.line_items) return "Loading..."

  return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography className={classes.title} variant="h4" gutterBottom>
            Your Shopping Cart
        </Typography>
        { !cart.line_items.length ? <EmptyCart /> : <FilledCart/> }
    </Container>
  )
}

Cart.propTypes = {
    cart: PropTypes.object,
    handleUpdateCartQty: PropTypes.func,
    handleRemoveFromCart: PropTypes.func,
    handleEmptyCart: PropTypes.func

}

export default Cart