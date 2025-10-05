import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const ENDPOINTS = {
  products: `${API_URL}/products`,
  cart: `${API_URL}/cart`,
};
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

export const clearAllCart = async () => {
  try {
    // Primero, obtener todos los elementos del carrito
    const response = await axios.get(`${ENDPOINTS.cart}`);
    const items = response.data;

    // Si hay elementos, eliminarlos uno por uno
    if (items.length > 0) {
      await Promise.all(
        items.map(
          (item) => axios.delete(`${ENDPOINTS.cart}/${item.id}`) // Eliminar cada producto por ID
        )
      );
    } else {
    }
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Error al limpiar el carrito:", error);
    }
  }
};
