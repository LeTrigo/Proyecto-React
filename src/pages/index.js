import Cart from "./components/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";

import { CartProvider } from "@/context/cartContext";

export default function Home() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Cart />
      </CartProvider>
    </>
  );
}
