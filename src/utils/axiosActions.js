// Biblioteca para realizar peticiones HTTP a la API
import axios from "axios";

/**
 * Utilidad para limpiar URLs y evitar dobles barras en los endpoints
 * Evita errores comunes de concatenación de URLs
 *
 * @param {string} baseURL - URL base de la API
 * @param {string} path - Ruta específica del endpoint
 * @returns {string} URL limpia sin dobles barras
 *
 * @example
 * cleanURL("http://localhost:5000/", "/products") // "http://localhost:5000/products"
 * cleanURL("http://localhost:5000", "products") // "http://localhost:5000/products"
 */
const cleanURL = (baseURL, path) => {
  const base = baseURL.replace(/\/$/, ""); // Remover barra final
  const cleanPath = path.replace(/^\//, ""); // Remover barra inicial
  return `${base}/${cleanPath}`;
};

// URL base de la API obtenida de variables de entorno o valor por defecto
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Objeto con endpoints limpios para todas las peticiones API
const ENDPOINTS = {
  products: cleanURL(API_URL, "/products"),
  cart: cleanURL(API_URL, "/cart"),
};

// Logs de debug para verificar configuración en producción
if (typeof window !== "undefined") {
  console.log("API_URL:", API_URL);
  console.log("Products endpoint:", ENDPOINTS.products);
  console.log("Cart endpoint:", ENDPOINTS.cart);
}
/**
 * Obtiene el estado inicial de la aplicación
 * Carga productos disponibles y items del carrito desde la API
 *
 * @async
 * @function readState
 * @returns {Promise<Object>} Objeto con productos y carrito
 * @returns {Array} returns.products - Array de productos disponibles
 * @returns {Array} returns.cart - Array de items en el carrito
 *
 * @example
 * const { products, cart } = await readState();
 * console.log(`${products.length} productos disponibles`);
 * console.log(`${cart.length} items en el carrito`);
 */
export const readState = async () => {
  const productsResponse = await axios.get(ENDPOINTS.products),
    cartResponse = await axios.get(ENDPOINTS.cart);

  const productsList = productsResponse.data,
    cartItems = cartResponse.data;
  return {
    products: productsList,
    cart: cartItems,
  };
};

/**
 * Guarda o actualiza un producto en el carrito
 * Si el producto ya existe, incrementa su cantidad
 * Si no existe, lo agrega con cantidad inicial de 1
 *
 * @async
 * @function saveCart
 * @param {Object} product - Producto a guardar en el carrito
 * @param {string} product.id - ID único del producto
 * @param {string} product.name - Nombre del producto
 * @param {number} product.price - Precio del producto
 * @param {string} product.image - URL de la imagen del producto
 *
 * @example
 * await saveCart({
 *   id: "1",
 *   name: "Libro de programación",
 *   price: 25.99,
 *   image: "/img/libro.jpg"
 * });
 */
export const saveCart = async (product) => {
  const id = product.id;
  try {
    // Buscar si el producto ya existe en el carrito.
    const response = await axios.get(`${ENDPOINTS.cart}?id=${id}`);

    if (response.data.length > 0) {
      // Si el producto ya está en el carrito, incrementar su cantidad.
      const productInCart = response.data[0];
      const updatedProduct = {
        ...productInCart, // Mantener todas las propiedades del producto
        quantity: productInCart.quantity + 1, // Incrementar la cantidad en 1
      };

      await axios.put(`${ENDPOINTS.cart}/${id}`, updatedProduct); // Hacer PUT con el objeto completo
    } else {
      // Si no está en el carrito, agregarlo con cantidad inicial de 1.
      const newProduct = {
        ...product,
        quantity: 1, // Agregar la propiedad quantity para productos nuevos
      };

      await axios.post(ENDPOINTS.cart, newProduct); // Hacer POST con el objeto que incluye quantity
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error al guardar el producto en el carrito:", error);
    }
  }
};

/**
 * Elimina o decrementa un producto del carrito
 * Permite eliminar una unidad o todas las unidades de un producto
 *
 * @async
 * @function removeItemFromCart
 * @param {Object} product - Producto a eliminar del carrito
 * @param {string} product.id - ID único del producto
 * @param {boolean} [all=false] - Si true, elimina todas las unidades; si false, solo una unidad
 *
 * @example
 * // Eliminar una unidad
 * await removeItemFromCart(product, false);
 *
 * // Eliminar todas las unidades
 * await removeItemFromCart(product, true);
 */
export const removeItemFromCart = async (product, all = false) => {
  const id = product.id;
  try {
    // Buscar si el producto ya está en el carrito.
    const response = await axios.get(`${ENDPOINTS.cart}?id=${id}`);

    if (response.data.length > 0) {
      const productInCart = response.data[0];

      if (all) {
        // Eliminar todos los ítems del producto
        await axios.delete(`${ENDPOINTS.cart}/${productInCart.id}`);
      } else {
        if (productInCart.quantity > 1) {
          // Decrementar la cantidad en 1
          await axios.put(`${ENDPOINTS.cart}/${productInCart.id}`, {
            ...productInCart,
            quantity: productInCart.quantity - 1, // Decrementa la cantidad en 1
          });
        } else {
          // Si la cantidad es 1, eliminar el producto del carrito
          await axios.delete(`${ENDPOINTS.cart}/${productInCart.id}`);
        }
      }
    } else {
      // Producto no encontrado en el carrito - operación exitosa silenciosa
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "Error al eliminar o decrementar el producto en el carrito:",
        error
      );
    }
  }
};

/**
 * Vacía completamente el carrito de compras
 * Elimina todos los productos del carrito de forma asíncrona
 * Utiliza Promise.all para eliminar múltiples items de forma eficiente
 *
 * @async
 * @function clearAllCart
 * @returns {Promise<void>} Promesa que se resuelve cuando el carrito está vacío
 *
 * @example
 * await clearAllCart();
 * console.log("Carrito limpiado exitosamente");
 */
export const clearAllCart = async () => {
  try {
    // Primero, obtener todos los elementos del carrito
    const response = await axios.get(`${ENDPOINTS.cart}`);
    const items = response.data;

    // Si hay elementos, eliminarlos uno por uno usando Promise.all para eficiencia
    if (items.length > 0) {
      await Promise.all(
        items.map(
          (item) => axios.delete(`${ENDPOINTS.cart}/${item.id}`) // Eliminar cada producto por ID
        )
      );
    } else {
      // Carrito ya está vacío - operación exitosa silenciosa
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error al limpiar el carrito:", error);
    }
  }
};
