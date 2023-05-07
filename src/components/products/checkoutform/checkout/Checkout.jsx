import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline } from "@material-ui/core"
import { useState, useEffect } from "react"
import useStyles from "./style"
import AddressForm from "./AddressForm"
import PaymentForm from "./PaymentForm"
import { commerce } from "../../../../lib/commerce"
import PropTypes from "prop-types"
import { Link, useNavigate } from "react-router-dom"

const steps = ["Shipping address", "Payment details"]

function Checkout({cart, onCaptureCheckout, order, error}) {
    const [activeStep, setActiveStep] = useState(0)
    const [ checkoutToken, setcheckoutToken ] = useState(null);
    const [ shippingData, setShippingData ] = useState({})
    const [isFinished, setIsFinished] = useState(false)
    const classes = useStyles()
    const navigate = useNavigate()

    const Form = () => activeStep === 0 ? 
    <AddressForm checkoutToken={checkoutToken} next={next}/> : 
    <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={next} timeout={timeout}/>

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant="h5">
                    Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}
                    <Divider className={classes.divider}/>
                    <Typography variant="subtitle2">
                        Order reference: {order.customer_reference}
                    </Typography>
                    <br/>
                    <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
                </Typography>
            </div>
        </>
    ) : isFinished ? (
        <>
            <div>
                    <Typography variant="h5">
                        Thank you for your purchase!
                    </Typography>
                    <br/>
                    <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
            </div>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress/>
        </div>
    )

    if (error) {
        <>
            <Typography variant="h5">Error: {error}</Typography>
            <br/>
            <Button component={Link} to="/" variant="outlined" type="button">Back to home</Button>
        </>
    }

    useEffect(() => {
        const generateToken = async () => {
            try {
                //generate token for checkout
                const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'})
                console.log(token)
                setcheckoutToken(token)
            } catch (error) {
                navigate("/")
            }
        }
        generateToken()
    }, [cart.id, navigate])

    const timeout = () => {
        //to prevent infinite spinner loading when time is up
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }


    const next = (data) => {
        setShippingData(data)
        nextStep()
    }

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    return (
        <>
            <CssBaseline/>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h5" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
                </Paper>
            </main>
        </>
    )
}


Checkout.propTypes = {
    cart: PropTypes.object,
    onCaptureCheckout: PropTypes.func.isRequired,
    order: PropTypes.object,
    error: PropTypes.string
}

export default Checkout