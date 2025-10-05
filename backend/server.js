// server.js
const jsonServer = require("json-server");
const path = require("path");
const fs = require("fs");

const server = jsonServer.create();

// Verificar que el archivo db.json existe y leerlo
const dbPath = path.join(__dirname, "db.json");
console.log("Looking for db.json at:", dbPath);
console.log("File exists:", fs.existsSync(dbPath));

if (fs.existsSync(dbPath)) {
  const dbContent = fs.readFileSync(dbPath, 'utf8');
  console.log("DB content preview:", dbContent.substring(0, 200) + "...");
}

const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, "public"),
});

server.use(middlewares);

// Ruta de diagnóstico
server.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    dbPath: path.join(__dirname, "db.json"),
    dbExists: fs.existsSync(path.join(__dirname, "db.json"))
  });
});

// Enable CORS for all routes
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
  next();
});

server.use(router);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
