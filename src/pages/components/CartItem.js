const CartItem = ({ item }) => {
  const { name, price, id } = item;
  return (
    <>
      <div className="product">
        <h4>{name}</h4>
        <h5>$ {price}</h5>
        <button>Agregar uno</button>
        <button>Eliminar uno</button>
        <button>Eliminar todos</button>
      </div>
    </>
  );
};

export default CartItem;
