import Commerce from "@chec/commerce.js"

console.log(console.log(import.meta.env.VITE_CHEC_KEY))

//has to start with REACT_APP
export const commerce = new Commerce(import.meta.env.VITE_CHEC_KEY, true)