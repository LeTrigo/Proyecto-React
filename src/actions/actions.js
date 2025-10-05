/**
 * Constantes de tipos de acciones para el reducer del carrito
 * Define todas las acciones disponibles para la gestión del estado
 * Sigue el patrón Redux para manejo de estado predecible
 *
 * @constant {Object} TYPES - Objeto con todos los tipos de acciones
 * @property {string} READ_STATE - Carga el estado inicial desde la API
 * @property {string} ADD_TO_CART - Agrega un producto al carrito
 * @property {string} REMOVE_ONE_ITEM - Elimina una unidad de un producto
 * @property {string} REMOVE_ALL_ITEMS - Elimina todas las unidades de un producto
 * @property {string} CLEAR_CART - Vacía completamente el carrito
 * @property {string} DELETE_CART_ITEM - Elimina un item específico del carrito
 *
 * @example
 * // Uso en el reducer
 * dispatch({ type: TYPES.ADD_TO_CART, payload: productId });
 * dispatch({ type: TYPES.CLEAR_CART });
 */
export const TYPES = {
  READ_STATE: "READ_STATE",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_ONE_ITEM: "REMOVE_ONE_ITEM",
  REMOVE_ALL_ITEMS: "REMOVE_ALL_ITEMS",
  CLEAR_CART: "CLEAR_CART",
  DELETE_CART_ITEM: "DELETE_CART_ITEM",
};
