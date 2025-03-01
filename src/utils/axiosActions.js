import axios from "axios";

const ENDPOINTS = {
  products: "http://localhost:5000/products",
  cart: "http://localhost:5000/cart",
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
      console.log(`Cantidad del producto con ID ${id} incrementada.`);
    } else {
      // Si no está en el carrito, agregarlo con cantidad inicial de 1.
      const newProduct = {
        ...product,
        quantity: 1, // Agregar la propiedad quantity para productos nuevos
      };

      await axios.post(ENDPOINTS.cart, newProduct); // Hacer POST con el objeto que incluye quantity
      console.log(`Producto con ID ${id} agregado al carrito.`);
    }
  } catch (error) {
    console.error("Error al guardar el producto en el carrito:", error);
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
        console.log(
          `Producto con ID ${id} eliminado completamente del carrito.`
        );
      } else {
        if (productInCart.quantity > 1) {
          // Decrementar la cantidad en 1
          await axios.put(`${ENDPOINTS.cart}/${productInCart.id}`, {
            ...productInCart,
            quantity: productInCart.quantity - 1, // Decrementa la cantidad en 1
          });
          console.log(`Cantidad del producto con ID ${id} reducida.`);
        } else {
          // Si la cantidad es 1, eliminar el producto del carrito
          await axios.delete(`${ENDPOINTS.cart}/${productInCart.id}`);
          console.log(`Producto con ID ${id} eliminado del carrito.`);
        }
      }
    } else {
      console.log(`El producto con ID ${id} no está en el carrito.`);
    }
  } catch (error) {
    console.error(
      "Error al eliminar o decrementar el producto en el carrito:",
      error
    );
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
      console.log("Carrito limpiado en el backend.");
    } else {
      console.log("El carrito ya está vacío.");
    }
  } catch (error) {
    console.error("Error al limpiar el carrito:", error);
  }
};
