import axios from "axios";
import { TYPES } from "../actions/actions";
const {
  READ_STATE,
  ADD_TO_CART,
  REMOVE_ONE_ITEM,
  REMOVE_ALL_ITEMS,
  CLEAR_CART,
  SAVE_CART,
  DELETE_CART_ITEM,
} = TYPES;

const ENDPOINTS = {
  products: "http://localhost:5000/products",
  cart: "http://localhost:5000/cart",
};
export const readState = async () => {
  const productsResponse = await axios.get(ENDPOINTS.products);
  const cartResponse = await axios.get(ENDPOINTS.cart);

  return {
    products: productsResponse.data,
    cart: cartResponse.data,
  };
};
export const saveCart = async (product) => {
  await axios.post(ENDPOINTS.cart, product);
};

export const deleteCart = async (id) => {
  await axios.delete(`${ENDPOINTS.cart}/${id}`);
};
