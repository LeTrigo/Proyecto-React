const CartItem = ({ item, deleteFromCart }) => {
  const { name, price, id, quantity } = item;
  return (
    <>
      <div className="product">
        <h4>{name}</h4>
        <h5>
          $ {price} x {quantity} = {price * quantity}
        </h5>
        <button>Agregar uno</button>
        <button onClick={() => deleteFromCart(id)}>Eliminar uno</button>
        <button onClick={() => deleteFromCart(id, true)}>Eliminar todos</button>
      </div>
    </>
  );
};

export default CartItem;
