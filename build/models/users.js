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
exports.UsersModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = process.env.SALT_ROUND;
const pepper = process.env.BCRYPT_PASSWORD;
class UsersModel {
    //getAllUsers
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT id, first_name, last_name FROM users';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Unable to get users error: ${error}`);
            }
        });
    }
    //getUser
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT id, first_name, last_name FROM users WHERE id=($1)';
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to get user ${id} error: ${error}`);
            }
        });
    }
    //createUser
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'INSERT INTO users (first_name,last_name,password) VALUES($1, $2, $3) RETURNING id, first_name, last_name ';
                const hashing = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
                const result = yield connection.query(sql, [u.first_name, u.last_name, hashing]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to create ${u.first_name + ' ' + u.last_name} error: ${error}`);
            }
        });
    }
    //deleteUser
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'DELETE FROM users WHERE id=($1) RETURNING id, first_name, last_name';
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to delete user ${id} error: ${error}`);
            }
        });
    }
    //updateUser
    update(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'UPDATE users SET first_name=($2), last_name=($3), password=($4)  WHERE id=($1) RETURNING id, first_name, last_name';
                const hashing = bcrypt_1.default.hashSync(u.password + pepper, parseInt(saltRounds));
                const result = yield connection.query(sql, [u.id, u.first_name, u.last_name, hashing]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to update ${u.id} error: ${error}`);
            }
        });
    }
}
exports.UsersModel = UsersModel;
//# sourceMappingURL=users.js.map