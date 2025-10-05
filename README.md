# 📚 Book Oasis - E-commerce de Libros

## 🚀 Descripción del Proyecto

Book Oasis es una aplicación web de e-commerce desarrollada con **Next.js** y **React** que permite a los usuarios navegar, filtrar y comprar libros online. El proyecto incluye un carrito de compras funcional, sistema de categorías, y un checkout completo con validaciones.

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 14.2.5** - Framework de React para aplicaciones web
- **React 18** - Biblioteca para interfaces de usuario
- **React Bootstrap 2.10.5** - Componentes UI responsive
- **Bootstrap 5.3.3** - Framework CSS
- **Axios 1.7.7** - Cliente HTTP para APIs
- **React Icons 5.3.0** - Iconografía
- **Framer Motion** - Animaciones

### Backend

- **JSON Server 1.0.0-beta.2** - API REST mock
- **Node.js** - Entorno de ejecución
- **Express** (integrado en JSON Server) - Servidor web

### Herramientas de Desarrollo

- **ESLint** - Linter para JavaScript
- **Prettier 3.3.3** - Formateador de código
- **SWR 2.2.5** - Librería para data fetching

## 🏗️ Arquitectura del Proyecto

```
Proyecto-React/
├── 📁 backend/                    # API Backend
│   ├── db.json                   # Base de datos JSON
│   ├── server.js                 # Servidor Express + JSON Server
│   ├── package.json              # Dependencias del backend
│   └── data.js                   # Datos de respaldo
├── 📁 public/                    # Archivos estáticos
│   ├── favicon.ico
│   ├── Logo.jpeg
│   └── 📁 img/                   # Imágenes de productos
├── 📁 src/                       # Código fuente
│   ├── 📁 actions/               # Redux actions
│   ├── 📁 context/               # Context API
│   ├── 📁 db/                    # Base de datos local
│   ├── 📁 initialState/          # Estado inicial
│   ├── 📁 pages/                 # Páginas de Next.js
│   │   ├── _app.js              # Configuración global
│   │   ├── _document.js         # Documento HTML
│   │   ├── index.js             # Página principal
│   │   ├── 📁 api/              # API routes
│   │   └── 📁 components/       # Componentes React
│   ├── 📁 reducer/              # Reducers para estado
│   ├── 📁 styles/               # Estilos CSS
│   └── 📁 utils/                # Utilidades
├── 📄 .env.production           # Variables de entorno
├── 📄 next.config.mjs          # Configuración de Next.js
├── 📄 package.json             # Dependencias principales
└── 📄 README.md                # Documentación
```

## 🌟 Características Principales

### 1. **Catálogo de Productos**

- **Filtrado por categorías**: Autoayuda, Comics, Computación, Ficción, Infantil
- **Búsqueda por nombre**: Búsqueda en tiempo real
- **Visualización responsive**: Grid adaptativo para móviles y desktop

### 2. **Carrito de Compras**

- **Agregar/Eliminar productos**: Gestión completa del carrito
- **Contador de cantidad**: Incrementar/decrementar unidades
- **Cálculo de totales**: Precio total en tiempo real
- **Persistencia**: El carrito se mantiene entre sesiones

### 3. **Sistema de Checkout**

- **Formulario multi-paso**: Información personal, envío y pago
- **Validaciones**: Campos obligatorios y formatos
- **Simulación de pago**: Proceso completo de compra
- **Confirmación**: Número de orden generado

### 4. **Interfaz de Usuario**

- **Diseño moderno**: UI/UX profesional con gradientes
- **Responsive**: Optimizado para móviles, tablets y desktop
- **Animaciones**: Transiciones suaves con CSS
- **Navegación intuitiva**: Menú hamburguesa en móviles

## 🔧 APIs y Endpoints

### Backend (JSON Server)

**Base URL**: `https://proyecto-react-api.onrender.com`

#### Productos

- `GET /products` - Obtener todos los productos
- `GET /products/:id` - Obtener producto por ID

#### Carrito

- `GET /cart` - Obtener items del carrito
- `POST /cart` - Agregar item al carrito
- `PUT /cart/:id` - Actualizar cantidad
- `DELETE /cart/:id` - Eliminar item

#### Diagnóstico

- `GET /health` - Estado del servidor

### Estructura de Datos

#### Producto

```json
{
  "id": "1",
  "name": "Nombre del libro",
  "price": 20000,
  "image": "/img/imagen.jpeg",
  "description": "Descripción del libro",
  "category": "categoria"
}
```

#### Item del Carrito

```json
{
  "id": "1",
  "name": "Nombre del libro",
  "price": 20000,
  "image": "/img/imagen.jpeg",
  "quantity": 2
}
```

## 🎨 Diseño y Estilos

### Paleta de Colores

- **Primario**: Gradiente azul-púrpura (#667eea → #764ba2)
- **Secundario**: Gradiente oscuro (#1a1a2e → #16213e)
- **Texto**: Blanco (#ffffff) sobre fondos oscuros
- **Descripción**: Gris claro (#cbd5e1)

### Tipografía

- **Principal**: Inter, Segoe UI
- **Secundaria**: Noto Sans
- **Pesos**: 400, 600, 700

### Componentes Reutilizables

- **Cards de productos**: Con hover effects y gradientes
- **Botones**: Estados hover y active
- **Modales**: Checkout y confirmación
- **Navegación**: Responsive con offcanvas

## 🔄 Gestión de Estado

### Context API

- **CartContext**: Manejo global del carrito y productos
- **Providers**: Envolviendo toda la aplicación
- **Actions**: addToCart, deleteFromCart, clearCart

### Reducers

- **cartReducer**: Lógica de actualización del estado
- **Operaciones**: ADD_TO_CART, DELETE_FROM_CART, CLEAR_CART

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Adaptaciones

- **Grid**: 1 columna en móvil, 2-4 en desktop
- **Navegación**: Menú hamburguesa en móvil
- **Cards**: Tamaño adaptativo
- **Formularios**: Layout apilado en móvil

## 🚀 Deployment

### Frontend (Vercel)

- **Platform**: Vercel
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Environment Variables**: `NEXT_PUBLIC_API_URL`

### Backend (Render)

- **Platform**: Render
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Port**: Dinámico (process.env.PORT)

## 🔒 Configuraciones de Seguridad

### CORS

```javascript
// Headers configurados en el backend
"Access-Control-Allow-Origin": "*"
"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS"
"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
```

### Variables de Entorno

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://proyecto-react-api.onrender.com
```

## 📊 Performance

### Optimizaciones

- **Next.js Image**: Optimización automática de imágenes
- **Static Generation**: Páginas pre-renderizadas
- **Code Splitting**: Carga bajo demanda de componentes
- **CSS Optimization**: Minificación automática

### Métricas

- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s
- **Time to Interactive**: < 4s

## 🧪 Testing y Validaciones

### Validaciones de Formularios

- **Campos requeridos**: Nombre, email, teléfono
- **Formatos**: Email válido, teléfono numérico
- **Longitudes**: Mínimo y máximo de caracteres

### Error Handling

- **API Errors**: Manejo de errores de red
- **Validation Errors**: Mensajes de error amigables
- **Fallbacks**: Estados de carga y error

## 📈 Futuras Mejoras

### Funcionalidades Planeadas

- [ ] Autenticación de usuarios
- [ ] Wishlist de productos
- [ ] Sistema de reviews
- [ ] Integración con pagos reales
- [ ] Panel de administración
- [ ] Analytics y métricas

### Optimizaciones Técnicas

- [ ] Server-Side Rendering dinámico
- [ ] Base de datos real (MongoDB/PostgreSQL)
- [ ] CDN para imágenes
- [ ] Cache con Redis
- [ ] Testing automatizado

## 🤝 Contribución

### Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev              # Frontend en puerto 3000
npm run cartAPI         # Backend en puerto 5000

# Producción
npm run build           # Build del frontend
npm start              # Servidor de producción
```

### Git Workflow

```bash
# Desarrollo
git checkout -b feature/nueva-funcionalidad
git add .
git commit -m "feat: descripción del cambio"
git push origin feature/nueva-funcionalidad

# Producción
git checkout main
git merge feature/nueva-funcionalidad
git push origin main
```

## 📞 Contacto y Soporte

**Desarrollador**: [Tu Nombre]
**Portfolio**: [Tu Portfolio]
**GitHub**: https://github.com/LeTrigo/Proyecto-React
**Email**: [tu-email@ejemplo.com]

---

⭐ **Si te gusta este proyecto, no olvides darle una estrella en GitHub!**
