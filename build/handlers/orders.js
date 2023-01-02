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
const orders_1 = require("../models/orders");
const store = new orders_1.OrdersModel();
const getAllOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOrders = yield store.index();
        return res.send(getOrders);
    }
    catch (error) {
        res.status(401).json(error);
    }
});
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderById = yield store.show(+req.params.id);
        return res.json(orderById);
    }
    catch (error) {
        res.status(401).json(error);
    }
});
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = {
            user_id: req.body.user_id,
            status: req.body.status,
            id: undefined,
        };
        const newOrder = yield store.create(order);
        return res.json(newOrder);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const deleteOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedOrder = yield store.delete(req.body.id);
        return res.send(deletedOrder);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const updateOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, status } = req.body;
        const updatedOrder = yield store.update(id, status);
        return res.send(updatedOrder);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order_id = req.params.id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;
    try {
        const ProductAdded = yield store.addProduct(quantity, order_id, product_id);
        res.send(ProductAdded);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const ordersRoutes = (app) => {
    app.get('/orders', AuthenticationToken_1.auth, getAllOrders);
    app.get('/orders/:id', AuthenticationToken_1.auth, getOrderById);
    app.post('/orders', AuthenticationToken_1.auth, createOrder);
    app.delete('/orders', AuthenticationToken_1.auth, deleteOrderById);
    app.put('/orders', AuthenticationToken_1.auth, updateOrderById);
    app.post('/orders/:id/products', AuthenticationToken_1.auth, addProduct);
};
exports.default = ordersRoutes;
//# sourceMappingURL=orders.js.map