# 📋 Documentación Técnica del Código

## 🗂️ Estructura de Componentes

### 🎯 Componentes Principales

#### `src/pages/_app.js`

```javascript
/**
 * Componente raíz de la aplicación Next.js
 * Configuración global: providers, estilos, metadatos
 */
```

- **Responsabilidad**: Envolver toda la app con providers
- **Providers incluidos**: CartProvider para gestión global del estado
- **Estilos**: Bootstrap CSS y estilos globales personalizados

#### `src/pages/index.js`

```javascript
/**
 * Página principal de la aplicación
 * Renderiza: Navbar, Carousel, CardList, Footer
 */
```

- **Componentes hijos**: NavBar, Carrousel, CardList, Footer
- **Layout**: Estructura principal de la landing page
- **SEO**: Meta tags y título configurados

### 🛒 Componentes del Carrito

#### `src/pages/components/NavBar/CartItem.js`

```javascript
/**
 * Componente individual de item en el carrito
 * Props: { item }
 * Funcionalidades: Mostrar producto, controles de cantidad
 */
```

- **Props esperados**:
  - `item.id`: ID único del producto
  - `item.name`: Nombre del producto
  - `item.price`: Precio unitario
  - `item.quantity`: Cantidad en el carrito
  - `item.image`: URL de la imagen

#### `src/pages/components/NavBar/CartPrice.js`

```javascript
/**
 * Componente que muestra el total del carrito
 * Context: CartContext (total)
 * Incluye: Botón de checkout y limpiar carrito
 */
```

- **Dependencias**: CartContext para obtener el total
- **Subcomponentes**: ClearCartButton, CheckoutButton

#### `src/pages/components/NavBar/ShoppingSection.js`

```javascript
/**
 * Sección principal del carrito en el offcanvas
 * Renderiza lista de CartItem o mensaje de carrito vacío
 */
```

- **Estado condicional**: Lista de productos vs. mensaje vacío
- **Mapeo**: Renderiza CartItem por cada producto

### 📦 Componentes de Productos

#### `src/pages/components/cards/CardBase.js`

```javascript
/**
 * Tarjeta individual de producto
 * Props: { book }
 * Funcionalidades: Mostrar info, botón agregar al carrito
 */
```

- **Estructura**:
  - Imagen del producto
  - Precio en badge
  - Nombre y descripción
  - Botón "Agregar al Carrito"

#### `src/pages/components/cards/CardList.js`

```javascript
/**
 * Lista principal de productos con filtros
 * Estado: searchQuery, selectedCategory, filteredBooks
 * Funcionalidades: Filtrado por categoría y búsqueda
 */
```

- **Estados locales**:
  ```javascript
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [filteredBooks, setFilteredBooks] = useState([]);
  ```
- **Filtros disponibles**: Todas, Autoayuda, Comics, Computación, Ficción, Infantil

#### `src/pages/components/cards/CardContainer.js`

```javascript
/**
 * Contenedor que obtiene datos de la API
 * Props: { books } (opcional)
 * Funcionalidades: Fetch de productos, loading states
 */
```

### 🛍️ Componentes de Checkout

#### `src/pages/components/checkout/CheckoutButton.js`

```javascript
/**
 * Botón que abre el modal de checkout
 * Condicional: Solo se muestra si hay items en el carrito
 * Estados: showCheckout, showSuccessToast, orderData
 */
```

#### `src/pages/components/checkout/CheckoutModal.js`

```javascript
/**
 * Modal completo de checkout con múltiples pasos
 * Props: { show, onHide, onOrderSuccess }
 * Estados: step, formData, errors, isProcessing
 */
```

- **Pasos del checkout**:
  1. Información personal
  2. Dirección de envío
  3. Método de pago
  4. Confirmación

## 🔄 Gestión de Estado

### Context API Implementation

#### `src/context/cartContext.js`

```javascript
/**
 * Contexto global para el carrito de compras
 * Estado inicial: { products: [], cart: [] }
 * Actions: addToCart, deleteFromCart, clearCart
 */

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar estado inicial desde la API
  useEffect(() => {
    readState().then((data) => {
      dispatch({ type: "READ_STATE", payload: data });
    });
  }, []);

  // Funciones de acción
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  // ... más funciones
};
```

#### `src/reducer/cartReducer.js`

```javascript
/**
 * Reducer para manejar las acciones del carrito
 * Actions: ADD_TO_CART, DELETE_FROM_CART, CLEAR_CART, READ_STATE
 */

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
    // Lógica para agregar producto
    // Si existe, incrementar cantidad
    // Si no existe, agregar nuevo

    case "DELETE_FROM_CART":
    // Lógica para decrementar cantidad
    // Si cantidad = 1, eliminar del carrito

    case "CLEAR_CART":
    // Vaciar el carrito completamente

    case "READ_STATE":
    // Cargar estado inicial desde API
  }
};
```

## 🌐 Servicios y APIs

### `src/utils/axiosActions.js`

```javascript
/**
 * Servicios para comunicación con la API
 * Configuración de URLs y endpoints
 * Funciones CRUD para productos y carrito
 */

// Configuración de URLs
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const cleanURL = (baseURL, path) => {
  // Función para evitar dobles barras en URLs
};

const ENDPOINTS = {
  products: cleanURL(API_URL, "/products"),
  cart: cleanURL(API_URL, "/cart"),
};

// Funciones principales
export const readState = async () => {
  // Obtener productos y carrito inicial
};

export const saveCart = async (product) => {
  // Agregar producto al carrito
};

export const deleteFromCart = async (product) => {
  // Eliminar producto del carrito
};

export const clearCart = async () => {
  // Vaciar carrito
};
```

### Backend: `backend/server.js`

```javascript
/**
 * Servidor Express con JSON Server
 * Configuración CORS, middlewares, rutas
 */

const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();

// Verificación y carga de la base de datos
const dbPath = path.join(__dirname, "db.json");
const router = jsonServer.router(dbPath);

// Middleware CORS personalizado
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Ruta de diagnóstico
server.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    dbExists: fs.existsSync(dbPath),
  });
});
```

## 🎨 Sistema de Estilos

### `src/styles/globals.css`

#### Variables CSS Personalizadas

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --dark-gradient: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  --text-primary: #ffffff;
  --text-secondary: #cbd5e1;
}
```

#### Componentes de Producto

```css
/* Card principal del producto */
.product-card {
  width: 100%;
  max-width: 320px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

/* Cuerpo de la card con fondo oscuro */
.product-card-body {
  padding: 1.5rem;
  background: var(--dark-gradient);
}

/* Título del producto */
.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  line-height: 1.4;
  /* Truncamiento a 2 líneas */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

#### Sistema de Grid Responsive

```css
/* Grid de productos - Mobile First */
.products-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  justify-items: center;
}

/* Tablet: 2 columnas */
@media (min-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3-4 columnas */
@media (min-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1400px) {
  .products-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

#### Componentes de Navegación

```css
/* Navbar moderna */
.modern-navbar {
  background: var(--dark-gradient);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  padding: 1rem 0;
}

/* Carrito offcanvas */
.modern-cart-offcanvas {
  background: var(--dark-gradient);
  border: none;
  width: 400px;
}

/* Items del carrito */
.modern-cart-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
}
```

## 🚀 Configuraciones de Deployment

### `next.config.mjs`

```javascript
/**
 * Configuración de Next.js para producción
 * Optimizaciones y configuraciones específicas
 */

const nextConfig = {
  reactStrictMode: true,

  // Configuración de imágenes
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "proyecto-react-api.onrender.com",
      },
    ],
  },

  // Configuración de páginas
  pageExtensions: ["js", "jsx"],

  // Optimizaciones de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};
```

### Variables de Entorno

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://proyecto-react-api.onrender.com

# .env.local (desarrollo)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### `backend/package.json`

```json
{
  "name": "backend-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "json-server --port 5000 --watch ../src/db/db.json"
  },
  "dependencies": {
    "json-server": "^1.0.0-beta.2"
  },
  "engines": {
    "node": ">=16"
  }
}
```

## 🔧 Funciones Utilitarias

### Validaciones de Formularios

```javascript
/**
 * Funciones de validación para el checkout
 * Ubicación: Integradas en CheckoutModal.js
 */

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(phone) && phone.length >= 10;
};

const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

const validateStep = (step, formData) => {
  const errors = {};

  switch (step) {
    case 1: // Información personal
      if (!validateRequired(formData.firstName)) {
        errors.firstName = "El nombre es requerido";
      }
      if (!validateEmail(formData.email)) {
        errors.email = "Email inválido";
      }
      break;

    case 2: // Dirección
      if (!validateRequired(formData.address)) {
        errors.address = "La dirección es requerida";
      }
      break;

    case 3: // Pago
      if (formData.paymentMethod === "credit") {
        if (!validateRequired(formData.cardNumber)) {
          errors.cardNumber = "Número de tarjeta requerido";
        }
      }
      break;
  }

  return errors;
};
```

### Manipulación de URLs

```javascript
/**
 * Función para limpiar URLs y evitar dobles barras
 * Ubicación: src/utils/axiosActions.js
 */

const cleanURL = (baseURL, path) => {
  const base = baseURL.replace(/\/$/, ""); // Remover barra final
  const cleanPath = path.replace(/^\//, ""); // Remover barra inicial
  return `${base}/${cleanPath}`;
};

// Uso:
// cleanURL("https://api.ejemplo.com/", "/productos")
// → "https://api.ejemplo.com/productos"
```

### Formateo de Moneda

```javascript
/**
 * Función para formatear precios en pesos colombianos
 * Ubicación: Usada en toda la aplicación
 */

const formatPrice = (price) => {
  return price.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  })
}

// Uso simplificado en componentes:
${price.toLocaleString()}
```

## 📱 Responsive Design Patterns

### Breakpoints Definidos

```javascript
const breakpoints = {
  mobile: "320px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1400px",
};
```

### Patrones de Layout

```css
/* Mobile First - Patrón de Stack */
.mobile-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Tablet - Patrón de Grid 2x2 */
@media (min-width: 768px) {
  .tablet-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Desktop - Patrón de Grid flexible */
@media (min-width: 1024px) {
  .desktop-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
}
```

---

## 📚 Patrones de Código Utilizados

### 1. **Container/Presentational Pattern**

- **Container**: `CardContainer.js` - Maneja lógica y datos
- **Presentational**: `CardBase.js` - Solo renderizado

### 2. **Higher-Order Component Pattern**

- **CartProvider**: Envuelve la app con funcionalidad de carrito

### 3. **Custom Hooks Pattern**

- **useContext**: Para acceder al estado global del carrito

### 4. **Conditional Rendering Pattern**

```javascript
{
  cart.length > 0 ? <CartItems /> : <EmptyCartMessage />;
}
```

### 5. **Error Boundary Pattern**

```javascript
// Defensive programming en cada componente
const cartContext = useContext(CartContext);
if (!cartContext) return null;
```

Esta documentación técnica cubre todos los aspectos importantes del código y está lista para incluir en tu portfolio. ¿Te gustaría que agregue alguna sección específica o que desarrolle más algún aspecto en particular?
