const CartCounter = ({ quantity }) => {
  return (
    <>
      <div className="modern-cart-counter">
        <span className="quantity-number">{quantity}</span>
      </div>
    </>
  );
};

export default CartCounter;
