import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from "@material-ui/core"
import { AddShoppingCart } from "@material-ui/icons"
import PropTypes from "prop-types"
import useStyles from "./style"

function Product({ product, onAddToCart }) {
    const classes = useStyles()
  return (
    <Card className={classes.root}>
        <CardMedia className={classes.media} image={product.image.url} title={product.name}/>
        <CardContent>
            <div className={classes.cardContent}>
                <Typography variant="h6" gutterBottom>
                    {product.name}
                </Typography>
                <Typography variant="h6">
                    {product.price.formatted_with_symbol}
                </Typography>
            </div>
            <Typography variant="body2" color="textSecondary" dangerouslySetInnerHTML={{__html: product.description}}/>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(product.id, 1)}>
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>
  )
}

Product.propTypes = {
    product: PropTypes.object.isRequired,
    onAddToCart: PropTypes.func.isRequired
}

export default Product