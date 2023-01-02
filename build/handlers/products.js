"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuthenticationToken_1 = require("../middlewares/AuthenticationToken");
const products_1 = require("../models/products");
const store = new products_1.ProductsModel();
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const AllProducts = yield store.index();
        return res.send(AllProducts);
    }
    catch (error) {
        res.status(401).json(error);
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield store.show(+req.params.id);
        return res.send(product);
    }
    catch (error) {
        res.status(401).json(error);
    }
});
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            id: undefined,
        };
        const newProduct = yield store.create(product);
        return res.send(newProduct);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield store.delete(req.body.id);
        return res.send(deleted);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
        };
        const updatedProduct = yield store.update(Product);
        return res.send(updatedProduct);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const productsRoutes = (app) => {
    app.get('/products', getAllProducts);
    app.get('/products/:id', getProductById);
    app.post('/products', AuthenticationToken_1.auth, createProduct);
    app.delete('/products', AuthenticationToken_1.auth, deleteProductById);
    app.put('/products', AuthenticationToken_1.auth, updateProduct);
};
exports.default = productsRoutes;
//# sourceMappingURL=products.js.map