import { Typography, Button, Card, CardActions, CardMedia, CardContent } from "@material-ui/core"
import useStyles from "./style"
import PropTypes from "prop-types"

function CartItem({item, handleRemoveFromCart, handleUpdateCartQty}) {
    const classes = useStyles()



    return (
        <Card>
            <CardMedia image={item.image.url} alt={item.name} className={classes.media}/>
            <CardContent className={classes.cardContent}>
                <Typography >{item.name}</Typography>
                <Typography >{item.line_total.formatted_with_symbol}</Typography>
                <CardActions className={classes.cartActions}>
                    <div className={classes.buttons}>
                        <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                        <Typography>{item.quantity}</Typography>
                        <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                    </div>
                    <Button variant="contained" type="button" color="secondary" onClick={() => handleRemoveFromCart(item.id)}>
                        Remove
                    </Button>
                </CardActions> 
            </CardContent>
        </Card>
    )
}

CartItem.propTypes = {
    item: PropTypes.object,
    handleUpdateCartQty: PropTypes.func,
    handleRemoveFromCart: PropTypes.func
}

export default CartItem