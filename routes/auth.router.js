const express = require("express");
const router = express.Router();
const { login, logout, register } = require("../controllers/auth.controller");
const { createUser, verifyUser } = require("../models/user.model");

router.post("/login", login);
router.post("/register", register)
router.get("/logout", logout);

module.exports = router;
