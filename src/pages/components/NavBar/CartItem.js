import AddItem from "./AddItem";
import DeleteAllItems from "./DeleteAllItems";
import DeleteItem from "./DeleteItem";
import { useContext } from "react";
import { CartContext } from "@/context/cartContext";
import CartCounter from "./CartCounter";
import Image from "next/image";

const CartItem = ({ item }) => {
  const { addToCart, deleteFromCart } = useContext(CartContext);

  const { name, quantity, image, price, id } = item;

  return (
    <>
      <div className="modern-cart-item">
        <div className="cart-item-header">
          <div className="cart-item-image">
            <Image
              src={image}
              alt={name}
              width={60}
              height={75}
              className="cart-product-img"
            />
          </div>

          <div className="cart-item-content">
            <h6 className="cart-item-title">{name}</h6>
            <div className="cart-item-price">
              <span className="price-label">Precio unitario:</span>
              <span className="unit-price">${price.toLocaleString()}</span>
            </div>
            <div className="cart-item-total">
              <span className="total-label">Total:</span>
              <span className="total-price">
                ${(price * quantity).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="cart-item-controls">
          <div className="quantity-controls">
            <DeleteItem deleteFromCart={deleteFromCart} book={item} />
            <CartCounter quantity={quantity} />
            <AddItem addToCart={addToCart} book={item} />
          </div>

          <div className="remove-item">
            <DeleteAllItems deleteFromCart={deleteFromCart} book={item} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
