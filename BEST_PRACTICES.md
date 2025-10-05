# 🎯 Mejores Prácticas y Patrones de Desarrollo

## 📐 Arquitectura y Patrones

### 1. **Component Architecture Pattern**

#### Separation of Concerns

```javascript
// ❌ Componente monolítico (malo)
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // 200+ líneas de código mezclando lógica y UI
};

// ✅ Componentes separados (bueno)
const ProductPage = () => (
  <div>
    <ProductFilter />
    <ProductGrid />
    <CartSidebar />
  </div>
);
```

#### Container/Presentational Pattern

```javascript
// Container: Maneja lógica y estado
const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  return <ProductList products={products} loading={loading} />;
};

// Presentational: Solo renderizado
const ProductList = ({ products, loading }) => {
  if (loading) return <Loading />;

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

### 2. **State Management Pattern**

#### Context + Reducer Pattern

```javascript
// ✅ Centralizado y predecible
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const actions = {
    addToCart: (product) => dispatch({ type: "ADD_TO_CART", payload: product }),
    removeFromCart: (id) => dispatch({ type: "REMOVE_FROM_CART", payload: id }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  };

  return (
    <CartContext.Provider value={{ state, ...actions }}>
      {children}
    </CartContext.Provider>
  );
};
```

#### Custom Hooks Pattern

```javascript
// ✅ Lógica reutilizable
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};

// ✅ Hook específico para productos
export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};
```

## 🛡️ Error Handling y Defensive Programming

### 1. **Null Safety Pattern**

```javascript
// ✅ Defensive programming
const ProductCard = ({ product }) => {
  // Early return si no hay producto
  if (!product) {
    console.warn("ProductCard: product prop is required");
    return null;
  }

  const { id, name, price, image, description } = product;

  // Validar propiedades críticas
  if (!id || !name) {
    console.error("ProductCard: missing required product data", product);
    return <ErrorPlaceholder />;
  }

  return (
    <div className="product-card">
      <img src={image || "/placeholder.jpg"} alt={name} />
      <h3>{name}</h3>
      <p>${(price || 0).toLocaleString()}</p>
      <p>{description || "Sin descripción disponible"}</p>
    </div>
  );
};
```

### 2. **API Error Handling**

```javascript
// ✅ Manejo robusto de errores
export const fetchProducts = async () => {
  try {
    const response = await axios.get(ENDPOINTS.products);

    // Validar respuesta
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid API response format");
    }

    return response.data;
  } catch (error) {
    // Log específico por tipo de error
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.message);
    } else {
      console.error("Unexpected Error:", error.message);
    }

    // Re-throw para que el componente pueda manejar
    throw new Error(`Failed to fetch products: ${error.message}`);
  }
};
```

### 3. **Context Safety Pattern**

```javascript
// ✅ Verificación de contexto en cada uso
const CartItem = ({ item }) => {
  const cartContext = useContext(CartContext);

  // Verificar contexto antes de usar
  if (!cartContext) {
    console.error("CartItem: Must be used within CartProvider");
    return null;
  }

  const { addToCart, removeFromCart } = cartContext;

  // Verificar item antes de renderizar
  if (!item || !item.id) {
    console.warn("CartItem: Invalid item data", item);
    return null;
  }

  return <div className="cart-item">{/* Renderizado seguro */}</div>;
};
```

## 🎨 UI/UX Best Practices

### 1. **Responsive Design Pattern**

```css
/* ✅ Mobile-First approach */
.product-grid {
  /* Mobile por defecto */
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}

/* Tablet: progresivamente mejorado */
@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding: 1.5rem;
  }
}

/* Desktop: máxima funcionalidad */
@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
  }
}
```

### 2. **Loading States Pattern**

```javascript
// ✅ Estados de carga explícitos
const ProductList = () => {
  const { products, loading, error } = useProducts();

  // Estado de carga
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Cargando productos...</p>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="error-container">
        <h3>Error al cargar productos</h3>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  // Estado vacío
  if (!products.length) {
    return (
      <div className="empty-state">
        <img src="/empty-products.svg" alt="Sin productos" />
        <h3>No hay productos disponibles</h3>
        <p>Vuelve a intentar más tarde</p>
      </div>
    );
  }

  // Estado exitoso
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

### 3. **Accessibility Pattern**

```javascript
// ✅ Componentes accesibles
const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  ariaLabel,
  ...props
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || children}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {children}
    </button>
  );
};

// ✅ Uso semántico
const ProductCard = ({ product }) => (
  <article className="product-card" role="article">
    <img src={product.image} alt={`Imagen de ${product.name}`} loading="lazy" />
    <header>
      <h3 id={`product-${product.id}`}>{product.name}</h3>
    </header>
    <div className="product-info">
      <p aria-describedby={`product-${product.id}`}>{product.description}</p>
      <span
        className="price"
        role="text"
        aria-label={`Precio: ${product.price} pesos`}
      >
        ${product.price.toLocaleString()}
      </span>
    </div>
    <Button
      onClick={() => addToCart(product)}
      ariaLabel={`Agregar ${product.name} al carrito`}
    >
      Agregar al Carrito
    </Button>
  </article>
);
```

## 🔧 Performance Optimization

### 1. **Memoization Pattern**

```javascript
// ✅ Optimización con React.memo
const ProductCard = React.memo(({ product, onAddToCart }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price.toLocaleString()}</p>
      <button onClick={() => onAddToCart(product)}>Agregar al Carrito</button>
    </div>
  );
});

// ✅ Memoización de callbacks
const ProductList = ({ products }) => {
  const { addToCart } = useCart();

  // Evitar re-crear función en cada render
  const handleAddToCart = useCallback(
    (product) => {
      addToCart(product);
    },
    [addToCart]
  );

  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};
```

### 2. **Lazy Loading Pattern**

```javascript
// ✅ Lazy loading de componentes pesados
const CheckoutModal = lazy(() => import("./CheckoutModal"));
const AdminPanel = lazy(() => import("./AdminPanel"));

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/checkout"
        element={
          <Suspense fallback={<CheckoutSkeleton />}>
            <CheckoutModal />
          </Suspense>
        }
      />
    </Routes>
  </Router>
);
```

### 3. **Image Optimization Pattern**

```javascript
// ✅ Optimización de imágenes con Next.js
import Image from "next/image";

const ProductImage = ({ src, alt, priority = false }) => (
  <div className="image-container">
    <Image
      src={src}
      alt={alt}
      width={300}
      height={400}
      priority={priority} // Para imágenes above-the-fold
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  </div>
);
```

## 🧹 Code Quality Patterns

### 1. **Clean Code Principles**

```javascript
// ❌ Código poco claro
const processOrder = (data) => {
  if (data && data.items && data.items.length > 0) {
    let total = 0;
    for (let i = 0; i < data.items.length; i++) {
      total += data.items[i].price * data.items[i].qty;
    }
    if (total > 1000) {
      total *= 0.9; // 10% discount
    }
    return { ...data, total, discount: total > 1000 };
  }
  return null;
};

// ✅ Código claro y expresivo
const calculateOrderTotal = (order) => {
  if (!isValidOrder(order)) {
    return null;
  }

  const subtotal = calculateSubtotal(order.items);
  const discount = calculateDiscount(subtotal);
  const total = subtotal - discount;

  return {
    ...order,
    subtotal,
    discount,
    total,
  };
};

const isValidOrder = (order) => {
  return order && Array.isArray(order.items) && order.items.length > 0;
};

const calculateSubtotal = (items) => {
  return items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
};

const calculateDiscount = (subtotal) => {
  const DISCOUNT_THRESHOLD = 1000;
  const DISCOUNT_RATE = 0.1;

  return subtotal >= DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0;
};
```

### 2. **Constants and Configuration**

```javascript
// ✅ Constantes centralizadas
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  ENDPOINTS: {
    PRODUCTS: "/products",
    CART: "/cart",
    ORDERS: "/orders",
  },
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

export const UI_CONFIG = {
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200,
  },
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 500,
};

export const BUSINESS_RULES = {
  MAX_CART_ITEMS: 10,
  MIN_ORDER_AMOUNT: 1000,
  SHIPPING_THRESHOLD: 5000,
  TAX_RATE: 0.19,
};
```

### 3. **Type Safety with PropTypes** (o TypeScript)

```javascript
import PropTypes from "prop-types";

const ProductCard = ({ product, onAddToCart, className }) => {
  // Componente implementation...
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.oneOf([
      "autoayuda",
      "comics",
      "computacion",
      "ficcion",
      "infantil",
    ]),
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ProductCard.defaultProps = {
  className: "",
  product: {
    image: "/placeholder.jpg",
    description: "Sin descripción disponible",
  },
};
```

## 🔒 Security Best Practices

### 1. **Input Validation**

```javascript
// ✅ Validación de entrada
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

const validatePhoneNumber = (phone) => {
  // Remover caracteres no numéricos
  const cleanPhone = phone.replace(/\D/g, "");
  return cleanPhone.length >= 10 && cleanPhone.length <= 15;
};

const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";

  return input
    .trim()
    .replace(/[<>]/g, "") // Remover caracteres peligrosos
    .slice(0, 1000); // Limitar longitud
};
```

### 2. **Environment Variables Safety**

```javascript
// ✅ Variables de entorno seguras
const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return "http://localhost:5000"; // Fallback para desarrollo
  }

  // Validar que sea una URL válida
  try {
    new URL(apiUrl);
    return apiUrl;
  } catch {
    console.error("Invalid API URL:", apiUrl);
    return "http://localhost:5000";
  }
};

// ❌ Nunca exponer keys privadas
// const API_KEY = process.env.SECRET_API_KEY // ¡NO en frontend!

// ✅ Solo variables públicas
const PUBLIC_CONFIG = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GA_ID,
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
};
```

## 📊 Testing Strategies

### 1. **Component Testing Pattern**

```javascript
// ✅ Testing con React Testing Library
import { render, screen, fireEvent } from "@testing-library/react";
import { CartProvider } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const mockProduct = {
  id: "1",
  name: "Test Product",
  price: 100,
  image: "/test-image.jpg",
  description: "Test description",
};

const renderWithCart = (component) => {
  return render(<CartProvider>{component}</CartProvider>);
};

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    renderWithCart(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toHaveAttribute(
      "src",
      "/test-image.jpg"
    );
  });

  it("adds product to cart when button is clicked", () => {
    const mockAddToCart = jest.fn();

    renderWithCart(
      <ProductCard product={mockProduct} onAddToCart={mockAddToCart} />
    );

    fireEvent.click(screen.getByText("Agregar al Carrito"));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
```

### 2. **API Testing Pattern**

```javascript
// ✅ Testing de servicios API
import axios from 'axios'
import { fetchProducts } from '../utils/api'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('API Services', () => {
  beforeEach(() => {
    mockedAxios.get.mockClear()
  })

  it('fetches products successfully', async () => {
    const mockProducts = [{ id: '1', name: 'Test Product' }]
    mockedAxios.get.mockResolvedValue({ data: mockProducts })

    const result = await fetchProducts()

    expect(mockedAxios.get).toHaveBeenCalledWith('/products')
    expect(result).toEqual(mockProducts)
  })

  it('handles API errors gracefully', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Network Error'))

    await expect(fetchProducts()).rejects.toThrow('Failed to fetch products')
  })
})
```

## 🚀 Deployment Best Practices

### 1. **Environment Configuration**

```javascript
// ✅ Configuración por ambiente
const getConfig = () => {
  const env = process.env.NODE_ENV || "development";

  const config = {
    development: {
      API_URL: "http://localhost:5000",
      DEBUG: true,
      CACHE_TTL: 0,
    },
    production: {
      API_URL: process.env.NEXT_PUBLIC_API_URL,
      DEBUG: false,
      CACHE_TTL: 3600,
    },
    test: {
      API_URL: "http://localhost:3001",
      DEBUG: false,
      CACHE_TTL: 0,
    },
  };

  return config[env];
};
```

### 2. **Build Optimization**

```javascript
// next.config.js
const nextConfig = {
  // Optimizaciones de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Optimización de imágenes
  images: {
    domains: ["proyecto-react-api.onrender.com"],
    formats: ["image/webp", "image/avif"],
  },

  // Headers de seguridad
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};
```

---

## 📝 Resumen de Principios

### SOLID Principles

- **S**ingle Responsibility: Cada componente tiene una responsabilidad específica
- **O**pen/Closed: Componentes abiertos para extensión, cerrados para modificación
- **L**iskov Substitution: Los componentes pueden ser sustituidos por sus variantes
- **I**nterface Segregation: Interfaces específicas en lugar de una general
- **D**ependency Inversion: Depender de abstracciones, no de implementaciones

### Clean Code Rules

1. **Nombres descriptivos**: Variables y funciones autoexplicativas
2. **Funciones pequeñas**: Una responsabilidad por función
3. **No repetir código**: DRY (Don't Repeat Yourself)
4. **Comentarios mínimos**: El código debe ser autoexplicativo
5. **Manejo de errores**: Siempre manejar casos edge

### Performance Guidelines

1. **Lazy loading**: Cargar componentes bajo demanda
2. **Memoization**: Evitar re-renders innecesarios
3. **Image optimization**: Usar Next.js Image para optimización automática
4. **Bundle splitting**: Dividir el código en chunks optimizados
5. **Caching**: Implementar estrategias de cache apropiadas

Estas prácticas aseguran que el código sea mantenible, escalable y profesional para incluir en tu portfolio.
