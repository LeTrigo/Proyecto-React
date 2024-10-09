import ClearCartButton from "./ClearCartButton"
import DeleteAllItems from "./DeleteAllItems"
import DeleteItem from "./DeleteItem"





const CartItem = () => {
  return (
    <>
    <div className="cart-item">
        <div className="cart-product"> 
            <img className="product-img" src="./img/eloquent-js.jpeg" alt="producto" />
                <div className="cart-product-description">
                    <h5>'Articulo'</h5>
                    <p>'Cantidad'</p>
                    <p>'Precio'</p>
                </div>
        </div>
        <div className="delete-buttons">
            <DeleteItem />
            <DeleteAllItems />
        </div>
    </div>
    </>
  )
}

export default CartItem