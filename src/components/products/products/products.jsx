import { Grid } from "@material-ui/core"
import Product from "./product/product"
import useStyles from "./style"
import PropTypes from "prop-types"


function Products({ products, onAddToCart }) {
    const classes = useStyles()
  return (
    <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Grid container justifyContent="center" spacing={4}>
            {products?.map((p) => (
                <Grid item key={p.id} xs={12} sm={6} md={4}>
                    <Product product={p} onAddToCart={onAddToCart}/>
                </Grid>
            ))}
        </Grid>
    </main>
  )
}

Products.propTypes = {
    products: PropTypes.array.isRequired,
    onAddToCart: PropTypes.func.isRequired
}

export default Products