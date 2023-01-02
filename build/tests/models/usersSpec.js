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
const users_1 = require("../../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user = new users_1.UsersModel();
const testUser = {
    first_name: 'Abdelrahman',
    last_name: 'Ali',
    password: 'A123159A',
};
const token = jsonwebtoken_1.default.sign(testUser, process.env.TOKEN_SECRET);
describe('user Model Test', () => {
    it('should have an index method', () => {
        expect(user.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(user.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(user.create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(user.update).toBeDefined();
    });
    it('A method that delete an order', () => {
        expect(user.delete).toBeDefined();
    });
    it('test order create method ', () => __awaiter(void 0, void 0, void 0, function* () {
        const userSpec = yield user.create(testUser);
        expect(userSpec).toEqual({
            id: 1,
            first_name: 'Abdelrahman',
            last_name: 'Ali',
        });
    }));
    it('show all users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.index();
        expect(result).toEqual([
            {
                id: 1,
                first_name: 'Abdelrahman',
                last_name: 'Ali',
            },
        ]);
    }));
    it('show method to show the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.show(1);
        expect(result).toEqual({
            id: 1,
            first_name: 'Abdelrahman',
            last_name: 'Ali',
        });
    }));
    it('update method to update the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield user.update({
            id: 1,
            first_name: 'Abdo',
            last_name: 'Ali',
            password: 'password123@@',
        });
        expect(result).toEqual({
            id: 1,
            first_name: 'Abdo',
            last_name: 'Ali',
        });
    }));
    it('delete method to delete the user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield user.delete(1);
        const result = yield user.index();
        expect(result).toEqual([]);
    }));
});
//# sourceMappingURL=usersSpec.js.map