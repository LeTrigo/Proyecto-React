import ClearCartButton from "./ClearCartButton"
import { useContext } from "react"
import { CartContext } from "@/context/cartContext"



const CartPrice = ({clearCart}) => {
  const {total} = useContext(CartContext)
  return (
    <>
        <div className="cart-price">
            <div className="cart-price-text">
                <p>El costo de tu compra es: ${total.toFixed(2)} </p>
            </div>
            <ClearCartButton className="clear-cart-button" clearCart={clearCart} />
        </div>
    </>
  )
}

export default CartPrice