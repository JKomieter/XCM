// import Navbar from "./components/products/navbar/Navbar"
// import Products from "./components/products/products"
import { commerce } from "./lib/commerce"
import { Products, Navbar, Cart, Checkout } from "./components/products"
import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  
  
  const fetchCart = async () => {
    //get cart content
    setCart(await commerce.cart.retrieve());
  }
  
  
  const handleAddToCart = async (productId, quantity) => {
  //adding product to cart
    const item = await commerce.cart.add(productId, quantity)
    setCart(item)
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    //changing the quantity object
    const item = await commerce.cart.update(productId, {quantity})
    setCart(item);
  }

  const handleRemoveFromCart = async (productId) => {
    const item = await commerce.cart.remove(productId)
    setCart(item)
  }

  const handleEmptyCart = async () => {
    const item = await commerce.cart.empty();
    setCart(item)
  }
  
  console.log(`Cart ${cart}`);

  const fetchProducts = async () => {
    //get all the products from commerce js and set it to products
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      //send order to commerce js
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
      setOrder(incomingOrder)
      console.log(order)
      //refresh cart after payment
      refreshCart()
    } catch (error) {
      //get meaningful error message
      setErrorMessage(error.data.error.message)
    }
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart)
  }

  return (
    <div>
      <Navbar numItems={cart.total_items}/>
      <Routes>
          <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart}/>} />
          <Route path="/cart" element={<Cart 
            cart={cart} 
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart}
            handleUpdateCartQty={handleUpdateCartQty}/>} 
            />
            <Route exact path="/checkout" element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>}/>
      </Routes>
    </div>
  )
}

export default App