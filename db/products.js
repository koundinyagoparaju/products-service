import uuidv1 from"uuid/v1";
class Products {
    static products = [];
    static findAll(userId) {
        return this.products.find(product => product.ownerUserId === userId);
    }

    static findByCode(code) {
return this.products.find(product => product.code === code);
    }
    static create(product) {
        product.id = uuidv1();
        this.products.push(product);
        return product.id;
    }
    static update(productId, productUpdate) {
        const product = {...this.findById(productId), ...productUpdate};
        this.products = this.products.filter(prdct => prdct.id !== productId).push(product);
        return product;
    }

    static findById(productId) {
        return this.products.find(product => product.id === productId);
    }

    static delete(productId) {
        this.products = this.products.filter(prdct => prdct.id !== productId);
        return productId;
    }
}

export default Products;
