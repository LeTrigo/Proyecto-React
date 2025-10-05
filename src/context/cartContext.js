// React hooks y contexto para gestión de estado global
import React, { createContext, useReducer, useEffect, useContext } from "react";
// Reducer que maneja la lógica de actualización del carrito
import { cartReducer } from "@/reducer/cartReducer";
// Estado inicial de la aplicación (productos y carrito vacío)
import { initialState } from "@/initialState/initialState";
// Servicios API para comunicación con el backend
import {
  readState,
  saveCart,
  clearAllCart,
  removeItemFromCart,
} from "@/utils/axiosActions";
// Constantes de tipos de acciones para el reducer
import { TYPES } from "@/actions/actions";

// Destructuring de tipos de acciones para mejor legibilidad
const {
  READ_STATE,
  ADD_TO_CART,
  REMOVE_ONE_ITEM,
  REMOVE_ALL_ITEMS,
  CLEAR_CART,
} = TYPES;

/**
 * Contexto global para el carrito de compras
 * Proporciona estado y funciones para manejar productos y carrito
 */
export const CartContext = createContext();

/**
 * Provider del contexto de carrito que envuelve la aplicación
 * Gestiona el estado global del carrito y productos usando useReducer
 *
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 * @returns {JSX.Element} Provider con estado y funciones del carrito
 */
export const CartProvider = ({ children }) => {
  // Hook useReducer para manejar estado complejo del carrito
  const [state, dispatch] = useReducer(cartReducer, initialState);

  /**
   * Carga el estado inicial desde la API
   * Obtiene productos disponibles y items del carrito
   */
  const loadInitialState = async () => {
    const data = await readState();
    dispatch({ type: READ_STATE, payload: data });
  };

  // Cargar estado inicial al montar el componente
  useEffect(() => {
    loadInitialState();
  }, []);

  /**
   * Agrega un producto al carrito
   * Si el producto ya existe, incrementa la cantidad
   * Si no existe, lo agrega con cantidad 1
   *
   * @param {Object} product - Producto a agregar al carrito
   * @param {string} product.id - ID único del producto
   * @param {string} product.name - Nombre del producto
   * @param {number} product.price - Precio del producto
   * @param {string} product.image - URL de la imagen del producto
   */
  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product.id });
    // Sincronizar con el backend
    saveCart(product);
  };

  /**
   * Elimina un producto del carrito
   *
   * @param {Object} product - Producto a eliminar
   * @param {boolean} all - Si true, elimina todas las unidades; si false, solo una unidad
   */
  const deleteFromCart = (product, all = false) => {
    // Actualizar backend primero
    removeItemFromCart(product, all);

    // Actualizar estado local
    if (all) {
      dispatch({ type: REMOVE_ALL_ITEMS, payload: product.id });
    } else {
      dispatch({ type: REMOVE_ONE_ITEM, payload: product.id });
    }

    // Sincronizar estado después de la operación
    readState();
  };

  /**
   * Limpia completamente el carrito
   * Elimina todos los productos del carrito
   */
  /**
   * Limpia completamente el carrito de compras
   * Realiza la limpieza tanto en el backend como en el estado local
   *
   * @function clearCart
   * @description Ejecuta la acción CLEAR_CART que vacía el array del carrito
   * y sincroniza esta acción con el servidor backend
   */
  const clearCart = () => {
    // Limpiar en el backend
    clearAllCart();
    // Actualizar estado local
    dispatch({ type: CLEAR_CART });
  };

  /**
   * Calcula el número total de items en el carrito
   * Suma las cantidades de todos los productos
   *
   * @type {number} Número total de items en el carrito
   */
  const cartItemCount = state.cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /**
   * Calcula el total monetario de la compra
   * Multiplica precio por cantidad de cada item y suma todos los resultados
   *
   * @type {number} Total monetario del carrito en la moneda configurada
   */
  const total = state.cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  /**
   * Proveedor del contexto del carrito
   * Proporciona el estado y las acciones del carrito a todos los componentes hijos
   *
   * @returns {JSX.Element} Provider component con value que contiene:
   * - state: Estado completo del carrito
   * - dispatch: Función para ejecutar acciones del reducer
   * - addToCart: Función para agregar productos
   * - deleteFromCart: Función para eliminar productos
   * - clearCart: Función para limpiar el carrito
   * - total: Total monetario calculado
   * - cartItemCount: Contador de items en el carrito
   */
  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        deleteFromCart,
        clearCart,
        total,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto del carrito
 * Proporciona una forma conveniente de acceder al estado y funciones del carrito
 * desde cualquier componente hijo del CartProvider
 *
 * @function useCart
 * @returns {Object} Objeto con todas las propiedades del contexto:
 * - state: Estado completo del carrito con productos y datos
 * - dispatch: Función del reducer para acciones directas
 * - addToCart: Función para agregar productos al carrito
 * - deleteFromCart: Función para eliminar productos del carrito
 * - clearCart: Función para vaciar completamente el carrito
 * - total: Total monetario calculado de todos los productos
 * - cartItemCount: Número total de items en el carrito
 *
 * @throws {Error} Si se usa fuera del CartProvider
 * @example
 * // Uso básico en un componente
 * const { state, addToCart, total, cartItemCount } = useCart();
 *
 * // Agregar producto al carrito
 * addToCart(producto);
 *
 * // Acceder al estado del carrito
 * console.log(state.cart); // Array de productos en el carrito
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de CartProvider");
  }
  return context;
};
