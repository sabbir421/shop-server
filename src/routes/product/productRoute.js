const express = require("express");
const multer = require("multer");
const {
  productListing,
} = require("../../controller/productController");
const { getProducts } = require("../../controller/fetchProduct");

// Configure multer for storing files in memory before uploading to S3
const storage = multer.memoryStorage(); 
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
});

// Allow multiple color variants (dynamically handle up to 10 variants)
const multipleUpload = upload.any();

const router = express.Router();

router.post("/listing/create", multipleUpload, productListing);
router.get("/list", getProducts);
module.exports = router;
