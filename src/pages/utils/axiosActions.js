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
  await axios.post(ENDPOINTS.cart, product);
  readState();
};

export const addOneItem = async (product) => {
  const id = product.id;
  const ENDPOINT = `http://localhost:5000/cart/${id}`;
  const OPTIONS = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    data: product,
  };
  await axios(ENDPOINT, OPTIONS);
};

export const deleteOneItem = async (product) => {
  const id = product.id;
  const ENDPOINT = `http://localhost:5000/cart/${id}`;
  await axios.delete(ENDPOINT);
};

export const deleteAllItemsWithSameId = async (product) => {
  const id = product.id;
  const confirmar = confirm(
    `¿Estás seguro que quieres eliminar el libro ${product.name}?`
  );

  if (confirmar) {
    const ENDPOINT = `http://localhost:5000/cart?id=${id}`;
    const OPTIONS = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    await axios(ENDPOINT, OPTIONS);
  } else {
    return;
  }

  readState();
};

export const deleteAllCartItems = async () => {
  const ENDPOINT = "http://localhost:5000/cart";
  await axios.delete(ENDPOINT);
};
