import { Router } from "express";
import multer from "multer";
import path from 'node:path';

import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategories } from "./app/useCases/categories/createCategories";
import { listProducts } from "./app/useCases/products/listProducts";
import { createProducts } from "./app/useCases/products/createProducts";
import { listProductsByCategories } from "./app/useCases/categories/llistProductsByCategories";

export const routes = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename: function (req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
})

// List categories
routes.get("/categories", listCategories);

// Create category
routes.post("/categories", createCategories);

// List Products
routes.get("/products", listProducts);

// Create Product
routes.post("/products", upload.single('image'), createProducts);

// Get products by category
routes.get("/categories/:categoryId/products", listProductsByCategories);

// List orders
routes.get("/orders", (req, res) => {
  res.send('OK');
});

// Create order
routes.post("/orders", (req, res) => {
  res.send('OK');
});

// Change order status
routes.patch("/orders/:orderId", (req, res) => {
  res.send('OK');
});

// Delete order
routes.delete("/orders/:orderId", (req, res) => {
  res.send('OK');
});