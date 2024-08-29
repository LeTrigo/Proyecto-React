import React, { useReducer } from "react";
import { cartReducer } from "../reducer/cartReducer";
import { initialState } from "../initialState";
import { TYPES } from "../actions/actions";
import Product from "./Product";
import CartItem from "./CartItem";
const { ADD_TO_CART, REMOVE_ONE_ITEM, REMOVE_ALL_ITEMS, CLEAR_CART } = TYPES;

const Cart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const { products, cart } = state;

  const addToCart = (id) => dispatch({ type: ADD_TO_CART, payload: id });

  const deleteFromCart = (id) =>
    dispatch({ type: REMOVE_ONE_ITEM, payload: id });

  const clearCart = (id) => dispatch({ type: CLEAR_CART });

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
        {cart.map((item, i) => (
          <CartItem key={i} item={item} deleteFromCart={deleteFromCart} />
        ))}
      </div>
      <button onClick={clearCart}>Limpiar Carrito</button>
    </>
  );
};

export default Cart;
