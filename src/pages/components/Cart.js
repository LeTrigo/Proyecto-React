import { useReducer, useEffect, useContext } from "react";
import axios from "axios";
import { cartReducer } from "../reducer/cartReducer";
import { initialState } from "../initialState";
import { TYPES } from "../actions/actions";
import Product from "./Product";
import CartItem from "./CartItem";
import { CartContext } from "@/context/CartContext";

const {
  READ_STATE,
  ADD_TO_CART,
  REMOVE_ONE_ITEM,
  REMOVE_ALL_ITEMS,
  CLEAR_CART,
} = TYPES;

const Cart = () => {
  // Estado local usando useReducer
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Si tienes un contexto global (asegúrate de usar un nombre diferente para evitar conflictos)
  const {
    cart: cartItems,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  // Cambié el nombre del estado `cart` local a `cartItems` para evitar conflictos con `globalCart`
  const { products, cart } = state;

  const readState = async () => {
    const ENDPOINTS = {
      products: "http://localhost:5000/products",
      cart: "http://localhost:5000/cart",
    };

    const productsResponse = await axios.get(ENDPOINTS.products),
      cartResponse = await axios.get(ENDPOINTS.cart);

    const productsList = productsResponse.data;
    const cartItems = cartResponse.data;

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

    const postResponse = await axios.post(ENDPOINTS.cart, product);

    dispatch({ type: ADD_TO_CART, payload: id });
  };

  const deleteFromCart = async (product, id, all = false) => {
    const ENDPOINTS = {
      cart: `http://localhost:5000/cart/`,
    };

    // Eliminar un ítem o todos los ítems del servidor según el parámetro `all`
    const deleteResponse = await axios.delete(ENDPOINTS.cart, product);

    if (all) {
      dispatch({ type: REMOVE_ALL_ITEMS, payload: id });
    } else {
      dispatch({ type: REMOVE_ONE_ITEM, payload: id });
    }
  };

  const clearLocalCart = async (id) => {
    // Limpiar el carrito en el estado local

    await axios.delete("http://localhost:5000/cart"); // Eliminar todo del servidor
    dispatch({ type: CLEAR_CART });
  };
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
        {cartItems.length > 0 ? (
          cartItems.map((item, i) => (
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
      <button onClick={clearLocalCart}>Limpiar Carrito</button>
    </>
  );
};

export default Cart;
