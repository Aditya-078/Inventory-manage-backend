const express = require("express");
const router = express.Router();
const protect = require("../middleWare/authMiddleware");
const authorizeSubscribers = require('../middleWare/auth.js')
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  
} = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");
const { auth } = require("express-openid-connect");
const errorHandler = require("../middleWare/errorMiddleware");




router.post("/", protect, authorizeSubscribers, upload.single("image"), createProduct);
router.patch("/:id", protect, authorizeSubscribers, upload.single("image"), updateProduct);
router.get("/", protect,  getProducts);
router.get("/:id", protect,authorizeSubscribers, getProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
