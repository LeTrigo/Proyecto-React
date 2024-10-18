import ClearCartButton from "./ClearCartButton"




const CartPrice = () => {
  return (
    <>
        <div className="cart-price">
            <div className="cart-price-text">
                <p>Costo de tu compra:</p>
            </div>
            <ClearCartButton className="clear-cart-button" />
        </div>
    </>
  )
}

export default CartPrice