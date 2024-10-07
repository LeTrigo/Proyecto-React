




const CartItem = () => {
  return (
    <>
    <div className="cart-item">
        <div className="cart-product"> 
            <img src="./img/eloquent-js.jpeg" alt="producto" />
                <div className="cart-product-description">
                    <p>'Articulo'</p>
                    <p>'Cantidad'</p>
                    <p>'Precio'</p>
                </div>
        </div>
        <div>
            <button>Eliminar uno</button>
            <button>Eliminar todos</button>
        </div>
        <div>
            <button>Limpiar carrito</button>
        </div>
    </div>
    </>
  )
}

export default CartItem