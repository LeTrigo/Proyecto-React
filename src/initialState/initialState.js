/**
 * Estado inicial de la aplicación
 * Define la estructura base del estado global antes de cargar datos de la API
 * Utilizado por el CartProvider como punto de partida
 *
 * @constant {Object} initialState - Estado inicial del carrito
 * @property {Array} products - Array vacío que contendrá los productos disponibles
 * @property {Array} cart - Array vacío que contendrá los productos en el carrito
 *
 * @example
 * // Estructura después de cargar datos:
 * {
 *   products: [
 *     { id: "1", name: "Libro", price: 25.99, image: "/img/libro.jpg" }
 *   ],
 *   cart: [
 *     { id: "1", name: "Libro", price: 25.99, quantity: 2 }
 *   ]
 * }
 */
export const initialState = {
  products: [],
  cart: [],
};
