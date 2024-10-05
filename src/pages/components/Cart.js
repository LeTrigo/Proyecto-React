import { useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { cartReducer } from "../reducer/cartReducer";
import { TYPES } from "../actions/actions";
import Product from "./Product";
import CartItem from "./CartItem";
import { CartContext } from "@/context/cartContext";
import { readState, saveCart, deleteCart } from "@/pages/utils/axiosActions";

const {
  READ_STATE,
  ADD_TO_CART,
  REMOVE_ONE_ITEM,
  REMOVE_ALL_ITEMS,
  CLEAR_CART,
} = TYPES;

//Tengo que sacar las funciones de aquí, y solo utilizar las del context

const Cart = () => {
  const {
    state,
    dispatch,
    removeFromCart,
    clearCart,
    cartItemCount,
    deleteFromCart,
    addToCart,
  } = useContext(CartContext);

  const { products, cart } = state;

  return (
    <>
      <h2>Carrito de Compras</h2>
      <h3>Productos</h3>
      <div className="box grid-responsive">
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
      <h3>Carrito</h3>

      <div className="box">
        {cart.length > 0 ? (
          cart.map((item, i) => (
            <CartItem
              key={i}
              item={item}
              deleteFromCart={deleteFromCart}
              addToCart={addToCart}
            />
          ))
        ) : (
          <p>No hay items en el carrito</p>
        )}
      </div>
      <button onClick={clearCart}>Limpiar Carrito</button>
    </>
  );
};

export default Cart;
