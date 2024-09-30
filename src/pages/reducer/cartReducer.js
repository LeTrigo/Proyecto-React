import { TYPES } from "../actions/actions";
import { initialState } from "../initialState";

const {
  READ_STATE,
  ADD_TO_CART,
  REMOVE_ONE_ITEM,
  REMOVE_ALL_ITEMS,
  CLEAR_CART,
} = TYPES;

export const cartReducer = (state, action) => {
  {
    switch (action.type) {
      case READ_STATE: {
        return {
          ...state,
          products: action.payload.products,
          cart: action.payload.cart,
        };
      }
      case ADD_TO_CART: {
        const newItem = state.products.find(
          (product) => product.id === action.payload
        );
        const itemInCart = state.cart.find((item) => item.id === newItem.id);
        return itemInCart
          ? {
              ...state,
              cart: state.cart.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            }
          : {
              ...state,
              cart: [...state.cart, { ...newItem, quantity: 1 }],
            };
      }
      case REMOVE_ONE_ITEM:
        const itemToDelete = state.cart.find(
          (item) => item.id == action.payload
        );

        return itemToDelete.quantity > 1
          ? {
              ...state,
              cart: state.cart.map((item) =>
                item.id === itemToDelete.id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            }
          : {
              ...state,
              cart: state.cart.filter((item) => item.id !== itemToDelete.id),
            };

      case REMOVE_ALL_ITEMS: {
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload),
        };
      }
      case CLEAR_CART: {
        return {
          ...state,
          cart: [],
        };
      }
      default:
        return state;
    }
  }
};
