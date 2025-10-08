import { Router } from "express";
import multer from "multer";
import path from 'node:path';

import { listCategories } from "./app/useCases/categories/listCategories";
import { createCategories } from "./app/useCases/categories/createCategories";
import { listProducts } from "./app/useCases/products/listProducts";
import { createProducts } from "./app/useCases/products/createProducts";
import { listProductsByCategories } from "./app/useCases/categories/llistProductsByCategories";
import { listOrders } from "./app/useCases/orders/listOrders";
import { createOrders } from "./app/useCases/orders/createOrders";
import { changeOrderStatus } from "./app/useCases/orders/changeOrderStatus";
import { cancelOrder } from "./app/useCases/orders/cancelOrder";

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
routes.get("/orders", listOrders);

// Create order
routes.post("/orders", createOrders);

// Change order status
routes.patch("/orders/:orderId", changeOrderStatus);

// Delete order
routes.delete("/orders/:orderId", cancelOrder);
