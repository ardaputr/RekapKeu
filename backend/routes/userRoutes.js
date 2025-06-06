const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

// Route register dan login
router.post("/register", userController.register);
router.post("/login", userController.login);

// Route untuk data user yang dilindungi (misalnya untuk update dan get)
router.get("/user/:id", authMiddleware, userController.getUserById);
router.put("/user/:id", authMiddleware, userController.updateUser);

// Pastikan route berikut sudah ada untuk admin mengelola user
router.get("/users", authMiddleware, userController.getAllUsers);
router.put("/user/:id", authMiddleware, userController.adminUpdateUser);
router.delete("/user/:id", authMiddleware, userController.deleteUser);

module.exports = router;
