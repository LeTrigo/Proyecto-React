
import { useContext } from "react";
import CartItem from "./CartItem";
import { CartContext } from "@/context/cartContext";



const ShoppingSection = () => {
  const {state, addToCart, deleteFromCart} = useContext(CartContext)
  const {cart} = state

  return (
    <>
        <div className="shopping-section">          
            {cart.length > 0 ? (
              cart.map((item, i) => (
                <CartItem
                  key={i}
                  item={item}
                  addToCart={addToCart}
                  deleteFromCart={deleteFromCart}
                  
                />
              ))
            ) : (
              <p>No hay items en el carrito</p>
            )}
          
        </div>
    </>
  )
}

export default ShoppingSection