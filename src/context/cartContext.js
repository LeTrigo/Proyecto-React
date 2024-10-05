import React, { createContext, useReducer, useEffect } from "react";
import { cartReducer } from "@/pages/reducer/cartReducer";
import { initialState } from "@/pages/initialState";
import { readState, saveCart, deleteCart } from "@/pages/utils/axiosActions";
import { TYPES } from "@/pages/actions/actions";

const {
  READ_STATE,
  ADD_TO_CART,
  REMOVE_ONE_ITEM,
  REMOVE_ALL_ITEMS,
  CLEAR_CART,
  SAVE_CART,
  DELETE_CART_ITEM,
} = TYPES;
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const loadInitialState = async () => {
    const data = await readState();
    dispatch({ type: READ_STATE, payload: data });
  };

  useEffect(() => {
    loadInitialState();
  }, []);

  const addToCart = async (product) => {
    dispatch({ type: ADD_TO_CART, payload: product.id });
    await saveCart(product);
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = async (id, all = false) => {
    if (all) {
      dispatch({ type: REMOVE_ALL_ITEMS, payload: id });
    } else {
      dispatch({ type: REMOVE_ONE_ITEM, payload: id });
    }
    await deleteCart(id);
  };

  // Función para limpiar el carrito
  const clearCart = async () => {
    dispatch({ type: CLEAR_CART });
    await deleteCart();
    dispatch({ type: REMOVE_ALL_ITEMS });
  };

  // Calcular el total de ítems en el carrito usando `state.cart`
  const cartItemCount = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        clearCart,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
