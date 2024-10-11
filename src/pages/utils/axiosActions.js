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

// export const saveCart = async (product) => {
//   await axios.post(ENDPOINTS.cart, product);
//   readState();
// };

export const saveCart = async (product) => {
  const id = product.id;
  try {
    // Buscar si el producto ya existe en el carrito.
    const response = await axios.get(`${ENDPOINTS.cart}?id=${id}`);

    if (response.data.length > 0) {
      // Si el producto ya está en el carrito, incrementar su cantidad.
      const productInCart = response.data[0]; // Corregir, ya que response.data es un array
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
// export const addOneItem = async (product) => {
//   const id = product.id;
//   const ENDPOINT = `http://localhost:5000/cart/${id}`;
//   const OPTIONS = {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     data: product,
//   };
//   await axios(ENDPOINT, OPTIONS);
// };

// export const addOneItem = async (product) => {
//   try {
//     const id = product.id;
//     const ENDPOINT = `http://localhost:5000/cart/${id}`;
//     const OPTIONS = {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       data: product,
//     };
//     await axios(ENDPOINT, OPTIONS);
//   } catch (error) {
//     console.error("Error al agregar un producto al carrito:", error);
//   }
// };

// export const deleteOneItem = async (product) => {
//   const id = product.id;
//   const ENDPOINT = `http://localhost:5000/cart/${id}`;
//   await axios.delete(ENDPOINT);
// };

// export const deleteOneItem = async (product) => {
//   try {
//     const id = product.id;
//     const ENDPOINT = `http://localhost:5000/cart/${product.id}`;
//     await axios.delete(ENDPOINT);
//   } catch (error) {
//     console.error("Error al eliminar un producto del carrito:", error);
//   }
// };

// export const deleteAllItemsWithSameId = async (product) => {
//   const id = product.id;
//   const confirmar = confirm(
//     `¿Estás seguro que quieres eliminar el libro ${product.name}?`
//   );

//   if (confirmar) {
//     const ENDPOINT = `http://localhost:5000/cart?id=${id}`;
//     const OPTIONS = {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//     };
//     await axios(ENDPOINT, OPTIONS);
//   } else {
//     return;
//   }

//   readState();
// };

// export const deleteAllItemsWithSameId = async (product) => {
//   try {
//     const id = product.id;
//     const confirmar = confirm(
//       `¿Estás seguro que quieres eliminar todos los productos ${product.name} del carrito?`
//     );

//     if (confirmar) {
//       const ENDPOINT = `http://localhost:5000/cart?id=${id}`;
//       const OPTIONS = {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       };
//       await axios(ENDPOINT, OPTIONS);
//     } else {
//       return;
//     }

//     readState();
//   } catch (error) {
//     console.error(
//       "Error al eliminar todos los productos con el mismo ID:",
//       error
//     );
//   }
// };

// export const deleteAllCartItems = async () => {
//   const ENDPOINT = "http://localhost:5000/cart";
//   await axios.delete(ENDPOINT);
// };

// export const deleteAllCartItems = async () => {
//   try {
//     const ENDPOINT = "http://localhost:5000/cart";
//     await axios.delete(ENDPOINT);
//   } catch (error) {
//     console.error("Error al eliminar todos los productos del carrito:", error);
//   }
// };
