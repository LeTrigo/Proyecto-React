import { TYPES } from "../actions/actions";

const { ADD_TO_CART, REMOVE_ONE_ITEM, REMOVE_ALL_ITEMS, CLEAR_CART } = TYPES;

export const cartReducer = (state, action) => {
  // Definimos el estado inicial
  {
    switch (action.type) {
      case ADD_TO_CART: {
        const newItem = state.products.find(
          (product) => product.id === action.payload
        );
        return {
          ...state,
          cart: [...state.cart, newItem],
        };
      }
      case REMOVE_ONE_ITEM:
        return {};
      case REMOVE_ALL_ITEMS: {
      }
      case CLEAR_CART: {
      }
      default:
        return state;
    }
  }
};
