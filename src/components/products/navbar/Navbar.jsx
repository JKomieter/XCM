import { AppBar, Toolbar, IconButton, Badge,  Typography } from "@material-ui/core"

import logo from "../../../assets/image/—Pngtree—shop store icon_3563808.jpg"
import { ShoppingCart } from "@material-ui/icons"
import useStyles from "./style.js"
import PropTypes from "prop-types"
import { Link, useLocation } from "react-router-dom"

function Navbar({numItems}) {
    const location = useLocation()

    const classes = useStyles()
    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="XCM" height="25px" className={classes.image}/>
                        XCM
                    </Typography>
                    <div className={classes.grow}/>
                    { location.pathname === "/" && (
                        <div className={classes.button}>
                            <IconButton component={Link} to="/cart" aria-label="Show cart item" color="inherit">
                                <Badge badgeContent={numItems} color="secondary">
                                    <ShoppingCart/>
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

Navbar.propTypes = {
    numItems: PropTypes.number
}


export default Navbar