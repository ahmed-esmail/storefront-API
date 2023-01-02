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
exports.ProductsModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductsModel {
    //getAllProducts
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield connection.query(sql);
                connection.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Unable to get The Products error: ${error}`);
            }
        });
    }
    //getProduct
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to get the product with the id ${id} error: ${error}`);
            }
        });
    }
    //createProduct
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'INSERT INTO products (name,price) VALUES($1, $2) RETURNING *';
                const result = yield connection.query(sql, [p.name, p.price]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to Create product error: ${error}`);
            }
        });
    }
    //deleteProduct
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = "DELETE FROM products WHERE id=($1) RETURNING *";
                const result = yield connection.query(sql, [id]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to delete product ${id} error: ${error}`);
            }
        });
    }
    update(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connection = yield database_1.default.connect();
                const sql = 'UPDATE products SET name=($3), price=($2) WHERE id=($1) RETURNING *';
                const result = yield connection.query(sql, [p.id, p.price, p.name]);
                connection.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to update product error: ${error}`);
            }
        });
    }
}
exports.ProductsModel = ProductsModel;
//# sourceMappingURL=products.js.map