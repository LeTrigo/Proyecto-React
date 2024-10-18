import AddItem from "./AddItem"
import CartCounter from "./CartCounter"
import ClearCartButton from "./ClearCartButton"
import DeleteAllItems from "./DeleteAllItems"
import DeleteItem from "./DeleteItem"
import { useContext } from "react"
import { CartContext } from "@/context/cartContext"





const CartItem = ({item, props}) => {
  const {addToCart} = useContext(CartContext)

  const{name, quantity, image, price}= item 
  return (
    <>
   
    <div className="cart-item">
        <div className="cart-product"> 
            <img src={image} alt="producto" />
           
        </div>
        <p>{name}</p>
          <div className="cart-product-description">
            <dfn>${price * quantity}</dfn>
          </div>
        <div className="delete-buttons">
          <DeleteItem />
          <span>{quantity}</span>
          <AddItem  addToCart={addToCart} book={props.book} />
        </div>
        <div className="DeleteAllItems">
          <DeleteAllItems />
        </div>
    </div>
    </>
  )
}

export default CartItem