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
describe('Users Endpoints Test', () => {
    it('test index() /users ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.get('/users');
        expect(status).toBe(401);
    }));
    it('test index() /users with jwt', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.get('/users').set('Authorization', `Bearer ${token}`);
        expect(status).toBe(200);
    }));
    it('test show() /users/:id ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.get('/users/1');
        expect(status).toBe(401);
    }));
    it('test show() /users/:id with a jwt ', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.get('/users/1').set('Authorization', `Bearer ${token}`);
        expect(status).toBe(200);
    }));
    it('test create() /users', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.post('/users').send({
            first_name: 'Abdelrahman',
            last_name: 'Ali',
            password: 'A123159A',
        });
        expect(status).toBe(200);
    }));
    it('test update() /users', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.put('/users').send({
            id: 1,
            first_name: 'Abdelrahman',
            last_name: 'Ali',
            password: 'A123159A',
        });
        expect(status).toBe(401);
    }));
    it("test delete() /users", () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield request.delete('/users').send({
            id: 1,
        });
        expect(status).toBe(401);
    }));
});
//# sourceMappingURL=usersSpec.js.map