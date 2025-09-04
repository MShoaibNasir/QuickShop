const express = require("express");
const upload=require('../middleware/multormiddleware.js')
const { CreateProduct,ProductList,ProductDelete,ProductShow,ProductUpdate } = require("../Controllers/ProductController");
const auth = require("../middleware/authMiddleware.js");
const router = express.Router();
router.post("/create",upload.single("image"),auth, CreateProduct);
router.get("/list",auth, ProductList);
router.get("/delete",auth, ProductDelete);
router.get("/show",auth, ProductShow);
router.post("/update",auth,upload.single("image"),ProductUpdate);
module.exports = router;
