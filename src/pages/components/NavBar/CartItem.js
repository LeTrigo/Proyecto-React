import AddItem from "./AddItem"
import DeleteAllItems from "./DeleteAllItems"
import DeleteItem from "./DeleteItem"
import { useContext } from "react"
import { CartContext } from "@/context/cartContext"
import CartCounter from "./CartCounter"



const CartItem = ( {item}) => {
  const {addToCart, deleteFromCart} = useContext(CartContext)

  const {name, quantity, image, price, id} = item

  return (
    <>
    <div className="cart-item">
        <div className="cart-product"> 
            <img src={image} alt="producto" /> 
        </div>
        <p className="cart-product-title">{name}</p>
          <div className="cart-product-description">
            <dfn>${price * quantity}</dfn>
          </div>
        <div className="delete-buttons">
          <DeleteItem deleteFromCart={deleteFromCart} book={item}/>
          <CartCounter quantity={quantity}/>
         
          <AddItem  addToCart={addToCart} book={item} />
        </div>
        <div className="DeleteAllItems">
          <DeleteAllItems deleteFromCart={deleteFromCart} book={item}/>
        </div>
    </div>
    </>
  )
}

export default CartItem