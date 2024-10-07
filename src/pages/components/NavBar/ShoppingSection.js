import { initialState } from "@/pages/initialState";
import { useReducer } from "react";
import CartItem from "./CartItem";




const ShoppingSection = () => {

/*     const [state, dispatch] = useReducer(shoppingReducer, initialState)
 */
  return (
    <>
        <div>
          <CartItem />
        </div>
    </>
  )
}

export default ShoppingSection