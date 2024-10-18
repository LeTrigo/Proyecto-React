import { initialState } from "@/pages/initialState";
import { useContext, useReducer } from "react";
import CartItem from "./CartItem";
import { CartContext } from "@/context/cartContext";




const ShoppingSection = () => {
  const {state} = useContext(CartContext)
  const {cart} = state

/*     const [state, dispatch] = useReducer(shoppingReducer, initialState)
 */
  return (
    <>
        <div className="shopping-section">
           {/* <CartItem /> */}

        
          
            {cart.length > 0 ? (
              cart.map((item, i) => (
                <CartItem
                  key={i}
                  item={item}
                  
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