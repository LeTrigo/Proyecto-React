// Importa las constantes de tipos de acciones disponibles para el reducer
import { TYPES } from "@/actions/actions";

// Destructuring de tipos de acciones para mejor legibilidad en el código
const {
  READ_STATE,
  ADD_TO_CART,
  REMOVE_ONE_ITEM,
  REMOVE_ALL_ITEMS,
  CLEAR_CART,
  DELETE_CART_ITEM,
} = TYPES;

/**
 * Reducer del carrito de compras
 * Maneja todas las actualizaciones de estado relacionadas con productos y carrito
 * Implementa el patrón Redux para manejo de estado inmutable
 *
 * @param {Object} state - Estado actual del carrito
 * @param {Object} state.products - Array de productos disponibles
 * @param {Object} state.cart - Array de productos en el carrito con cantidad
 * @param {Object} action - Acción a ejecutar
 * @param {string} action.type - Tipo de acción (READ_STATE, ADD_TO_CART, etc.)
 * @param {*} action.payload - Datos necesarios para ejecutar la acción
 * @returns {Object} Nuevo estado actualizado de forma inmutable
 */
export const cartReducer = (state, action) => {
  switch (action.type) {
    /**
     * Carga el estado inicial desde la API
     * Actualiza productos disponibles y carrito existente
     */
    case READ_STATE: {
      return {
        ...state,
        products: action.payload.products,
        cart: action.payload.cart,
      };
    }

    /**
     * Elimina completamente un ítem específico del carrito
     * Sin importar la cantidad, remueve el producto por completo
     */
    case DELETE_CART_ITEM: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }

    /**
     * Agrega un producto al carrito o incrementa su cantidad
     * Si el producto ya existe, aumenta quantity en 1
     * Si no existe, lo agrega con quantity: 1
     */
    case ADD_TO_CART: {
      const newItem = state.products.find(
        (product) => product.id === action.payload
      );

      if (!newItem) {
        console.error("Producto no encontrado en ADD_TO_CART", action.payload);
        return state; // Retorna el estado actual si no se encuentra el producto
      }

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

    /**
     * Remueve una unidad de un producto del carrito
     * Si quantity > 1, disminuye en 1
     * Si quantity = 1, elimina el producto del carrito
     */
    case REMOVE_ONE_ITEM: {
      const itemToDelete = state.cart.find((item) => item.id == action.payload);

      if (!itemToDelete) {
        console.error(
          "Producto no encontrado en REMOVE_ONE_ITEM",
          action.payload
        );
        return state; // Retorna el estado actual si no se encuentra el producto
      }

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
    }

    /**
     * Elimina todas las unidades de un producto específico del carrito
     * Remueve completamente el producto sin importar su cantidad
     */
    case REMOVE_ALL_ITEMS: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }

    /**
     * Vacía completamente el carrito
     * Remueve todos los productos y resetea el carrito a array vacío
     */
    case CLEAR_CART: {
      return {
        ...state,
        cart: [],
      };
    }

    /**
     * Caso por defecto del reducer
     * Retorna el estado sin modificaciones si la acción no es reconocida
     */
    default:
      return state;
  }
};
