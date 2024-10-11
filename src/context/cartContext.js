import React, { createContext, useReducer, useEffect } from "react";
import { cartReducer } from "@/pages/reducer/cartReducer";
import { initialState } from "@/pages/initialState";
import {
  readState,
  saveCart,
  deleteCart,
  updateProductQuantity,
  clearAllCart,
  removeItemFromCart,
} from "@/pages/utils/axiosActions";
import { TYPES } from "@/pages/actions/actions";

const {
  READ_STATE,
  ADD_TO_CART,
  REMOVE_ONE_ITEM,
  REMOVE_ALL_ITEMS,
  CLEAR_CART,
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

  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product.id });

    saveCart(product);
  };

  // Función para eliminar un producto del carrito
  const deleteFromCart = (product, all = false) => {
    removeItemFromCart(product, all);
    if (all) {
      dispatch({ type: REMOVE_ALL_ITEMS, payload: product.id });
    } else {
      dispatch({ type: REMOVE_ONE_ITEM, payload: product.id });
    }
    readState();
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    clearAllCart();

    dispatch({ type: CLEAR_CART });
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
        deleteFromCart,
        clearCart,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
