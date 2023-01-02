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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(server_1.default);
const testUser = {
    first_name: 'Abdelrahman',
    last_name: 'Ali',
    password: 'A123159A',
};
const token = jsonwebtoken_1.default.sign(testUser, process.env.TOKEN_SECRET);
describe('products Endpoints Test', () => {
    it('test index() /products ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.get('/products');
        expect(status).toBe(200);
    }));
    it('test show() /products/:id ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.get('/products/1');
        expect(status).toBe(200);
    }));
    it('test create() /products', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.post('/products').send({
            name: 'test products',
            price: 99,
        });
        expect(status).toBe(401);
    }));
    it('test create() /products with a jwt', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request
            .post('/products')
            .send({
            name: 'test products',
            price: 99,
        })
            .set('Authorization', `Bearer ${token}`);
        expect(status).toBe(200);
    }));
    it('test delete() /products', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.delete('/products').send({
            id: 1,
        });
        expect(status).toBe(401);
    }));
    it('test delete() /products with jwt', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request
            .delete('/products')
            .send({
            id: 1,
        })
            .set('Authorization', `Bearer ${token}`);
        expect(status).toBe(200);
    }));
    it('test update() /products', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.put('/products').send({
            id: 1,
            name: 'test2',
            price: 1024,
        });
        expect(status).toBe(401);
    }));
    it('test update() /products with jwt ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request
            .put('/products')
            .send({
            id: 1,
            name: 'test2',
            price: 1024,
        })
            .set('Authorization', `Bearer ${token}`);
        expect(status).toBe(200);
    }));
});
//# sourceMappingURL=productsSpec.js.map