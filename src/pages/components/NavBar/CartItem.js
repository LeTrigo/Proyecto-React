import AddItem from "./AddItem"
import CartCounter from "./CartCounter"
import ClearCartButton from "./ClearCartButton"
import DeleteAllItems from "./DeleteAllItems"
import DeleteItem from "./DeleteItem"





const CartItem = () => {
  return (
    <>
    <div className="cart-item">
        <div className="cart-product"> 
            <img className="product-img" src="./img/eloquent-js.jpeg" alt="producto" />
        </div>
          <div className="cart-product-description">
            <dfn>$ 'Precio'</dfn>
          </div>
        <div className="delete-buttons">
          <DeleteItem />
          <CartCounter />
          <AddItem />
        </div>
        <div className="DeleteAllItems">
          <DeleteAllItems />
        </div>
    </div>
    </>
  )
}

export default CartItem