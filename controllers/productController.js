import Products from "../db/products";
import logger from "morgan";

class productController {
  static getProducts(req, res) {
    logger("list all products owned by the user");
    return res.json({
      products: Products.findAll()
    });
  }

  static createProduct(req, res) {
    const {code, name, color, quantity} = req.body;
    const { userId } = req.params;
    const newProduct = {
      code,
      name,
      color,
      quantity,
      ownerUserId: userId
    };
    if (Products.findByCode(code)) {
      return res.status(422).json({});
    }
    return res.status(201).json({id: Products.create(newProduct)});
  }

  static getProductById(req, res) {
    const {id} = req.params;
    let product = Products.findById(id);
    if (product) {
      return res.status(200).json(product);
    } else {
      res.status(404).json({});
    }
  }

  static updateProduct(req, res) {
    const { userId, id } = req.params;
    const { name, color, quantity } = req.body;
    const product = Products.findById(id);
    if (product) {
      if (userId !== product.ownerUserId) {
        return res.status(401).json();
      } else if (Products.update(id, {name, color, quantity})) {
        return res.status(200).json();
      }
    } else {
      res.status(422).json({});
    }
  }

  static deleteProduct(req, res) {
    const { id, userId } = req.params;
    const product = Products.findById(id);
    if (product) {
      if (product.ownerUserId !== userId) {
        return res.status(401).json();
      } else if (Products.delete(id)) {
        return res.status(200).json();
      }
    } else {
      res.status(422).json({});
    }
  }
}

export default productController;
