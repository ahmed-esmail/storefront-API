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
const orders_1 = require("../../models/orders");
const users_1 = require("../../models/users");
const products_1 = require("../../models/products");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../../database"));
const order = new orders_1.OrdersModel();
const user = new users_1.UsersModel();
const product = new products_1.ProductsModel();
const testUser = {
    first_name: 'Abdelrahman',
    last_name: 'Ali',
    password: 'A123159A',
};
const testProduct = {
    id: 1,
    name: 'hp430G',
    price: 1200,
};
const token = jsonwebtoken_1.default.sign(testUser, process.env.TOKEN_SECRET);
describe('Order Model Test', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user.create(testUser);
        yield product.create(testProduct);
    }));
    it('should have an index method', () => {
        expect(order.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(order.create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(order.update).toBeDefined();
    });
    it('A method that delete an order', () => {
        expect(order.delete).toBeDefined();
    });
    it('should have a add product to order method', () => {
        expect(order.addProduct).toBeDefined();
    });
    it('test order create method ', () => __awaiter(void 0, void 0, void 0, function* () {
        const orderSpec = yield order.create({ status: 'testing', user_id: 1 });
        expect(orderSpec).toEqual({
            id: 1,
            status: 'testing',
            user_id: 1,
        });
    }));
    it('show all orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.index();
        expect(result).toEqual([
            {
                id: 1,
                status: 'testing',
                user_id: 1,
            },
        ]);
    }));
    it('show method to show specific order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.show(1);
        expect(result).toEqual({
            id: 1,
            status: 'testing',
            user_id: 1,
        });
    }));
    it('update method to update the order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield order.update(1, 'update Status');
        expect(result).toEqual({
            id: 1,
            status: 'update Status',
            user_id: 1,
        });
    }));
    it('delete method to delete the order', () => __awaiter(void 0, void 0, void 0, function* () {
        yield order.delete(1);
        const result = yield order.index();
        expect(result).toEqual([]);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield database_1.default.connect();
        yield conn.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;');
        yield conn.query('DELETE FROM products;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;');
        conn.release();
    }));
});
//# sourceMappingURL=ordersSpec.js.map