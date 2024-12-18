const { connection } = require("../config/connection");
const { createUser, verifyUser } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [validatedUser] = await verifyUser(email);

    if (!validatedUser) {
      return res.status(404).json({ error: "Usuario no registrado" });
    } else if (!(await bcrypt.compare(password, validatedUser.password))) {
      return res.status(404).json({ error: "Contraseña incorrecta" });
    } else {
      const token = jwt.sign({ user: validatedUser.user_id }, "token_secreto", {
        expiresIn: "1h",
      });
      if (req.session) {
        req.session.userId = validatedUser.user_id;
      } else {
        console.error("Session undefined");
      }
      res.json({ success: true, message: "Login exitoso", token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Error de servidor" });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await verifyUser(email);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "El usuario ya está registrado" });
    }

    const newUser = await createUser({ username, email, password });

    res.status(201).json({
      success: true,
      message: "Registro exitoso",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Server error" });
  }
}

const logout = (req, res) => {
  res.json({ success: true, message: "Successful logout" });
};

const isLoggedIn = (req) => {
  const token = req.headers.authorization;
  console.log("Token en isLoggedIn:", token);
  if (!token) {
    return false;
  }
  try {
    const decoded = jwt.verify(token, "token_secreto");
    req.user = decoded.user;
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = { login, verifyUser, logout, isLoggedIn, register };
