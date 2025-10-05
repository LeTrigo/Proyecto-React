# 🚀 Guía de Instalación y Deployment

## 📋 Prerrequisitos

### Software Necesario

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 o **yarn** >= 1.22.0
- **Git** >= 2.20.0

### Cuentas de Servicios

- **GitHub** - Para control de versiones
- **Vercel** - Para deployment del frontend
- **Render** - Para deployment del backend

## 🛠️ Instalación Local

### 1. Clonar el Repositorio

```bash
# Clonar desde GitHub
git clone https://github.com/LeTrigo/Proyecto-React.git
cd Proyecto-React

# O descargar ZIP y extraer
```

### 2. Instalar Dependencias del Frontend

```bash
# En el directorio raíz
npm install

# O con yarn
yarn install
```

### 3. Instalar Dependencias del Backend

```bash
# Cambiar al directorio backend
cd backend
npm install

# Volver al directorio raíz
cd ..
```

### 4. Configurar Variables de Entorno

```bash
# Crear archivo .env.local en la raíz
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local

# O crear manualmente:
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 5. Ejecutar en Desarrollo

```bash
# Terminal 1: Iniciar el backend
npm run cartAPI

# Terminal 2: Iniciar el frontend (nueva terminal)
npm run dev
```

### 6. Verificar Instalación

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000/products
- **Health Check**: http://localhost:5000/health

## 🌐 Deployment en Producción

### 🎯 Frontend en Vercel

#### Paso 1: Preparar el Código

```bash
# Asegurarse de que todo esté commitado
git add .
git commit -m "feat: ready for production deployment"
git push origin main
```

#### Paso 2: Conectar a Vercel

1. Ir a [vercel.com](https://vercel.com)
2. Hacer login con GitHub
3. Hacer clic en "New Project"
4. Seleccionar el repositorio `Proyecto-React`
5. Configurar el proyecto:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (directorio raíz)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

#### Paso 3: Configurar Variables de Entorno

En Vercel Dashboard → Settings → Environment Variables:

```
Name: NEXT_PUBLIC_API_URL
Value: https://tu-backend-url.onrender.com
Environment: Production
```

#### Paso 4: Deploy

- Hacer clic en "Deploy"
- Esperar que termine el build (2-5 minutos)
- Tu sitio estará disponible en: `https://tu-proyecto.vercel.app`

### 🎯 Backend en Render

#### Paso 1: Crear Servicio en Render

1. Ir a [render.com](https://render.com)
2. Hacer login con GitHub
3. Hacer clic en "New +"
4. Seleccionar "Web Service"
5. Conectar el repositorio `Proyecto-React`

#### Paso 2: Configurar el Servicio

```yaml
# Configuración en Render
Name: proyecto-react-api
Environment: Node
Region: Oregon (US West)
Branch: main
Root Directory: (dejar vacío)
Build Command: cd backend && npm install
Start Command: cd backend && npm start
```

#### Paso 3: Configuración Avanzada

```yaml
# Variables de entorno (si las necesitas)
NODE_ENV: production
PORT: (Render lo asigna automáticamente)
# Auto-Deploy: Enabled
# Health Check Path: /health
```

#### Paso 4: Deploy

- Hacer clic en "Create Web Service"
- Esperar el build (3-7 minutos)
- Tu API estará en: `https://tu-proyecto.onrender.com`

### 🔗 Conectar Frontend y Backend

#### Paso 1: Actualizar Variable de Entorno en Vercel

```bash
# En Vercel Dashboard
NEXT_PUBLIC_API_URL=https://tu-proyecto.onrender.com
```

#### Paso 2: Redeploy Frontend

- En Vercel Dashboard → Deployments
- Hacer clic en "Redeploy"
- O hacer un nuevo commit:

```bash
git commit --allow-empty -m "trigger: redeploy with new API URL"
git push origin main
```

#### Paso 3: Verificar Conexión

- Abrir tu sitio de Vercel
- Verificar que los productos se cargan correctamente
- Probar el carrito de compras

## 🐛 Troubleshooting

### Problemas Comunes del Frontend

#### Error: "Cannot read properties of undefined"

```bash
# Verificar que el CartProvider esté configurado
# Archivo: src/pages/_app.js
# Debe tener <CartProvider> envolviendo <Component />
```

#### Error: Variables de entorno no definidas

```bash
# Verificar archivo .env.local
cat .env.local

# Para producción, verificar en Vercel Dashboard
# Settings → Environment Variables
```

#### Error: Build failed en Vercel

```bash
# Verificar que no hay errores de TypeScript/ESLint
npm run build

# Si hay errores, corregirlos y hacer commit
git add .
git commit -m "fix: resolve build errors"
git push origin main
```

### Problemas Comunes del Backend

#### Error: "Module not found 'json-server'"

```bash
# Verificar package.json en backend/
cd backend
cat package.json

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

#### Error: "File not found db.json"

```bash
# Verificar que db.json existe en backend/
ls backend/db.json

# Si no existe, crearlo con contenido básico
echo '{"products":[],"cart":[]}' > backend/db.json
```

#### Error: CORS en producción

```bash
# Verificar configuración CORS en backend/server.js
# Debe incluir:
res.header("Access-Control-Allow-Origin", "*")
```

### Problemas de Conectividad

#### Frontend no puede conectar con Backend

```bash
# 1. Verificar que la URL del backend esté correcta
curl https://tu-proyecto.onrender.com/health

# 2. Verificar variable de entorno en Vercel
echo $NEXT_PUBLIC_API_URL

# 3. Verificar en DevTools del navegador
# Network tab → ver requests fallidas
```

#### Backend responde 404 para rutas

```bash
# Verificar que json-server esté corriendo
curl https://tu-proyecto.onrender.com/products

# Verificar logs en Render Dashboard
# Dashboard → Service → Logs
```

## 📊 Monitoring y Mantenimiento

### Health Checks

#### Frontend (Vercel)

```bash
# Vercel tiene monitoring automático
# Dashboard → Analytics → Performance metrics
```

#### Backend (Render)

```bash
# Endpoint de health check
curl https://tu-proyecto.onrender.com/health

# Respuesta esperada:
{
  "status": "OK",
  "timestamp": "2025-10-05T...",
  "dbExists": true
}
```

### Logs y Debugging

#### Ver logs del Frontend

```bash
# En desarrollo
npm run dev
# Los logs aparecen en la consola

# En producción (Vercel)
# Dashboard → Functions → View Function Logs
```

#### Ver logs del Backend

```bash
# En desarrollo
npm run cartAPI
# Los logs aparecen en la consola

# En producción (Render)
# Dashboard → Service → Logs → View Logs
```

### Performance Monitoring

#### Métricas Clave

- **Time to First Byte (TTFB)**: < 500ms
- **First Contentful Paint (FCP)**: < 2s
- **Largest Contentful Paint (LCP)**: < 3s
- **Cumulative Layout Shift (CLS)**: < 0.1

#### Tools de Monitoreo

- **Vercel Analytics**: Incluido automáticamente
- **Google PageSpeed Insights**: lighthouse analysis
- **GTmetrix**: Performance testing

## 🔄 CI/CD Pipeline

### Automatic Deployments

#### Frontend (Vercel)

```yaml
# Auto-deploy configurado por defecto
# Triggers:
# - Push to main branch
# - Pull request previews
# - Manual redeploy
```

#### Backend (Render)

```yaml
# Auto-deploy configurado
# Triggers:
# - Push to main branch
# - Manual redeploy

# Build process:
1. git clone
2. cd backend && npm install
3. npm start
```

### Branch Strategy

```bash
# Desarrollo
git checkout -b feature/nueva-funcionalidad
# ... hacer cambios
git push origin feature/nueva-funcionalidad

# Pull Request → Review → Merge to main

# Producción (automático al hacer merge)
git checkout main
git pull origin main
# Vercel y Render deploys automáticamente
```

## 🔒 Security Checklist

### Frontend Security

- [ ] Variables de entorno no exponen datos sensibles
- [ ] No hay API keys en el código
- [ ] HTTPS habilitado en producción
- [ ] Content Security Policy configurado

### Backend Security

- [ ] CORS configurado correctamente
- [ ] Rate limiting implementado (opcional)
- [ ] Input validation en endpoints
- [ ] HTTPS habilitado en Render

### General Security

- [ ] Dependencias actualizadas
- [ ] No hay credenciales en el repositorio
- [ ] Secrets management apropiado
- [ ] Regular security audits

## 📱 Testing del Deployment

### Checklist de Testing Post-Deploy

#### Funcionalidad Básica

- [ ] Página principal carga correctamente
- [ ] Productos se muestran desde la API
- [ ] Filtros de categoría funcionan
- [ ] Búsqueda funciona
- [ ] Carrito acepta productos

#### Funcionalidad del Carrito

- [ ] Agregar productos al carrito
- [ ] Incrementar/decrementar cantidad
- [ ] Eliminar productos individuales
- [ ] Limpiar carrito completo
- [ ] Cálculo correcto de totales

#### Proceso de Checkout

- [ ] Modal de checkout abre
- [ ] Validaciones de formulario funcionan
- [ ] Navegación entre pasos
- [ ] Simulación de pago completa
- [ ] Confirmación de orden

#### Responsive Design

- [ ] Mobile (< 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (> 1024px)
- [ ] Navegación responsive
- [ ] Carrito offcanvas en móvil

#### Performance

- [ ] Tiempo de carga < 3s
- [ ] Imágenes optimizadas
- [ ] No errores en consola
- [ ] APIs responden < 1s

## 🆘 Contacto y Soporte

### Documentación

- **README.md**: Información general del proyecto
- **TECHNICAL_DOCS.md**: Documentación técnica del código
- **INSTALLATION.md**: Esta guía de instalación

### Recursos Externos

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **JSON Server**: https://github.com/typicode/json-server

### Issues y Bugs

- **GitHub Issues**: https://github.com/LeTrigo/Proyecto-React/issues
- **Email**: [tu-email@ejemplo.com]

---

✅ **¡Deployment completado! Tu aplicación está lista para producción.**
