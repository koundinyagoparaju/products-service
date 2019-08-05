const express = require('express');
const logger = require('morgan');

import userController from "./controllers/userController";
import productController from "./controllers/productController";

const app = express();

app.use(express.json());

const router = express.Router();
router.get("/api/v1/users", userController.getUsers);
router.post("/api/v1/users", userController.createUser);
router.post("/api/v1/users/login", userController.login);
router.get("/api/v1/users/:id", userController.getUserById);
router.put("/api/v1/users/:id", userController.updateUser);
router.delete("/api/v1/users/:id", userController.deleteUser);
router.get("/api/v1/products", productController.getProducts);
router.post("/api/v1/products", productController.createProduct);
router.get("/api/v1/products/:id", productController.getProductById);
router.put("/api/v1/products/:id", productController.updateProduct);
router.delete("/api/v1/products/:id", productController.deleteProduct);

app.use(router);

app.listen(process.env.PORT || 3000);

export default app;
