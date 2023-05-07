import { Typography, Button, Divider} from "@material-ui/core"
import { Elements, CardElement, ElementsConsumer } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Review from "./Review"
import PropTypes from "prop-types"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

function PaymentForm({shippingData, checkoutToken, backStep, onCaptureCheckout, nextStep, timeout}) {

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault()
    if (!stripe || !elements) return;
    //get all data from card info
    const cardElement = elements.getElement(CardElement)
    //
    const { error, paymentMethod } = await stripe.createPaymentMethod({type: "card", card: cardElement})

    if (error) {
      console.log(error)
    } else {
      //create new object to send to send to stripe API
      const orderData = {
        line_items: checkoutToken.line_items,
        customer: {firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email},
        shipping: {
          name: "Primary", 
          street: shippingData.address1, 
          town_city: shippingData.city,
          county_state: shippingData.subdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry
        },
        fulfillment: {shipping_method: shippingData.shippingOption},
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      }

      onCaptureCheckout(checkoutToken.id, orderData)
      timeout()
      nextStep()
    }
  }

  return (
    <>
        <Review checkoutToken={checkoutToken}/>
        <Divider/>
        <Typography variant="h6" gutterBottom style={{margin: "20px 0"}}>
          Payment method
        </Typography>
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({elements, stripe}) => (
              <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
                  <CardElement/>
                  <br/><br/>
                  <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Button variant="outlined" onClick={backStep}>Back</Button>
                    <Button type="submit" variant="contained" disabled={!stripe} color="primary">
                      Pay {checkoutToken.subtotal.formatted_with_symbol}
                    </Button>
                  </div>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
    </>
  )
}

PaymentForm.propTypes = {
  shippingData: PropTypes.object,
  checkoutToken: PropTypes.object.isRequired,
  backStep: PropTypes.func.isRequired,
  onCaptureCheckout: PropTypes.func.isRequired,
  nextStep: PropTypes.func,
  timeout: PropTypes.func
}

export default PaymentForm