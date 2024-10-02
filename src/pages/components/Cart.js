import { useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { cartReducer } from "../reducer/cartReducer";
import { initialState } from "../initialState";
import { TYPES } from "../actions/actions";
import Product from "./Product";
import CartItem from "./CartItem";

const {
  READ_STATE,
  ADD_TO_CART,
  REMOVE_ONE_ITEM,
  REMOVE_ALL_ITEMS,
  CLEAR_CART,
} = TYPES;

const Cart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const { products, cart } = state;

  const readState = async () => {
    const ENDPOINTS = {
      products: "http://localhost:5000/products",
      cart: "http://localhost:5000/cart",
    };
    const productsResponse = await axios.get(ENDPOINTS.products),
      cartResponse = await axios.get(ENDPOINTS.cart);

    const productsList = await productsResponse.data,
      cartItems = await cartResponse.data;

    dispatch({
      type: READ_STATE,
      payload: {
        products: productsList,
        cart: cartItems,
      },
    });
  };

  useEffect(() => {
    readState();
  }, []);

  const addToCart = async (id, product) => {
    const ENDPOINTS = {
      cart: "http://localhost:5000/cart",
    };
    const cartResponse = await axios.post(ENDPOINTS.cart, product);

    dispatch({ type: ADD_TO_CART, payload: id });
  };

  const deleteFromCart = (id, all = false) => {
    if (all) {
      dispatch({ type: REMOVE_ALL_ITEMS, payload: id });
    } else {
      dispatch({ type: REMOVE_ONE_ITEM, payload: id });
    }
  };

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
          <CartItem
            key={i}
            item={item}
            deleteFromCart={deleteFromCart}
            addToCart={addToCart}
          />
        ))}
      </div>
      <button onClick={clearCart}>Limpiar Carrito</button>
    </>
  );
};

export default Cart;
