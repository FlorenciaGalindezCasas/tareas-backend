const express = require("express");
const session = require("express-session");
const cors = require("cors");
require("dotenv").config();

const taskRoute = require("./routes/task.router.js");
const tagRoute = require("./routes/tag.router.js");
const authRoute = require("./routes/auth.router.js");

const app = express();

const port = process.env.PORT || 4001;

// Configuración de CORS
app.use(
  cors({
    origin: [
      "https://tareas-front.onrender.com",
      "http://localhost:5173", 
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true, 
  })
);

// Middleware de sesión
app.use(
  session({
    secret: "florencia40029082",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", 
      httpOnly: true,
      sameSite: "strict",
    },
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

// Rutas de la aplicación
app.use("/auth", authRoute);
app.use("/task", taskRoute);
app.use("/tag", tagRoute);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
