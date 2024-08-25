import { TYPES } from "../actions/actions";

const { ADD_TO_CART, REMOVE_ONE_ITEM, REMOVE_ALL_ITEMS, CLEAR_CART } = TYPES;

export const cartReducer = (state, action) => {
  // Definimos el estado inicial
  const initialState = { initialState };
  {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          ...state,
        };
      case REMOVE_ONE_ITEM:
        return {
          ...state,
        };
      case REMOVE_ALL_ITEMS:
        return {
          ...state,
        };
      case CLEAR_CART:
        return {
          ...state,
        };
      default:
        return state;
    }
  }
};
