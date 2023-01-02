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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrdersModel {
    //getAllOrders
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Unable to get all the orders: ${error}`);
            }
        });
    }
    //getOrder
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to get the order error: ${error}`);
            }
        });
    }
    //createOrder
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (status,user_id) VALUES($1, $2) RETURNING *';
                const result = yield connection.query(sql, [o.status, o.user_id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to add the order error: ${error}`);
            }
        });
    }
    //deleteOrder
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
                const SQL = 'DELETE FROM ordered_products WHERE id=($1)';
                yield connection.query(SQL, [id]);
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to delete order ${id} error: ${error}`);
            }
        });
    }
    //updateOrder
    update(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'UPDATE orders SET status=($2) WHERE id=($1) RETURNING *';
                const result = yield connection.query(sql, [id, status]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to update order ${id} error: ${error}`);
            }
        });
    }
    //addProduct
    addProduct(quantity, order_id, product_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO ordered_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
                const connection = yield database_1.default.connect();
                const result = yield connection.query(sql, [quantity, order_id, product_id]);
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to Add Product ${error}`);
            }
        });
    }
}
exports.OrdersModel = OrdersModel;
//# sourceMappingURL=orders.js.map