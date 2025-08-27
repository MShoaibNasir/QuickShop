const express = require("express");
const { registerUser,login } = require("../Controllers/userController");

const router = express.Router();
router.post("/register", registerUser);
router.post('/login', login);
module.exports = router;
C:\Users\ShoaibPc\Desktop\Ecommerce Project\backend\routes
