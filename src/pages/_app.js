// Estilos globales de la aplicación
import "@/styles/globals.css";
// Provider del contexto del carrito para estado global
import { CartProvider } from "@/context/cartContext";

/**
 * Componente principal de la aplicación Next.js
 * Envuelve toda la aplicación con el CartProvider para estado global
 * Aplica estilos globales y configura el contexto del carrito
 *
 * @component
 * @param {Object} props - Props del componente App
 * @param {React.Component} props.Component - Componente de página a renderizar
 * @param {Object} props.pageProps - Props específicas de la página
 * @returns {JSX.Element} Aplicación envuelta con providers necesarios
 *
 * @example
 * // Este componente es utilizado automáticamente por Next.js
 * // para envolver todas las páginas de la aplicación
 */
export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}
