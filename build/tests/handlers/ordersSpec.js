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
const server_1 = __importDefault(require("../../server"));
const users_1 = require("../../models/users");
const products_1 = require("../../models/products");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../database"));
const user = new users_1.UsersModel();
const product = new products_1.ProductsModel();
const request = (0, supertest_1.default)(server_1.default);
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
describe('Orders Endpoints Test', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user.create(testUser);
        yield product.create(testProduct);
    }));
    it('test index() /orders ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.get('/orders');
        expect(status).toBe(401);
    }));
    it('test index() /orders with jwt', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.get('/orders').set('Authorization', `Bearer ${token}`);
        expect(status).toBe(200);
    }));
    it('test show() /orders/:id ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.get('/orders/1');
        expect(status).toBe(401);
    }));
    it('test show() /orders/:id with a jwt ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.get('/orders/1').set('Authorization', `Bearer ${token}`);
        expect(status).toBe(200);
    }));
    it('test create() /orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.post('/orders').send({
            status: 'test1',
            user_id: 1,
        });
        expect(status).toBe(401);
    }));
    it("test delete() /orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.delete('/orders').send({
            id: 1,
        });
        expect(status).toBe(401);
    }));
    it('test delete() /orders with jwt', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request
            .delete('/orders')
            .send({
            id: 1,
        })
            .set('Authorization', `Bearer ${token}`);
        expect(status).toBe(200);
    }));
    it('test update() /orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.put('/orders').send({
            id: 1,
            status: 'test2',
            user_id: 1,
        });
        expect(status).toBe(401);
    }));
    it('test update() /orders with jwt ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request
            .put('/orders')
            .send({
            id: 1,
            status: 'test2',
            user_id: 1,
        })
            .set('Authorization', `Bearer ${token}`);
        expect(status).toBe(200);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield database_1.default.connect();
        yield conn.query('DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;');
        yield conn.query('DELETE FROM products;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;');
        conn.release();
    }));
});
//# sourceMappingURL=ordersSpec.js.map