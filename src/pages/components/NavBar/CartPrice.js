import ClearCartButton from "./ClearCartButton"




const CartPrice = () => {
  return (
    <>
        <div className="cart-price">
            <div className="cart-price-text">
                <p>Costo de tu compra: $99999</p>
            </div>
            <ClearCartButton className="clear-cart-button" />
        </div>
    </>
  )
}

export default CartPrice