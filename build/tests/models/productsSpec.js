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
const products_1 = require("../../models/products");
const product = new products_1.ProductsModel();
describe('product Model Test', () => {
    it('should have an index method', () => {
        expect(product.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(product.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(product.create).toBeDefined();
    });
    it('should have a update method', () => {
        expect(product.update).toBeDefined();
    });
    it('A method that delete an order', () => {
        expect(product.delete).toBeDefined();
    });
});
it('test Product create method', () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product.create({
        name: 'hp430G',
        price: 1200,
    });
    expect(result).toEqual({
        id: 1,
        name: 'hp430G',
        price: 1200,
    });
}));
it('show all products', () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product.index();
    expect(result).toEqual([
        {
            id: 1,
            name: 'hp430G',
            price: 1200,
        },
    ]);
}));
it('show method to show the product ', () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product.show(1);
    expect(result).toEqual({
        id: 1,
        name: 'hp430G',
        price: 1200,
    });
}));
it('update method to update the Product', () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product.update({
        id: 1,
        name: 'Dell G5',
        price: 1350,
    });
    expect(result).toEqual({
        id: 1,
        name: 'Dell G5',
        price: 1350,
    });
}));
it('delete method to delete the Product', () => __awaiter(void 0, void 0, void 0, function* () {
    yield product.delete(1);
    const result = yield product.index();
    expect(result).toEqual([]);
}));
//# sourceMappingURL=productsSpec.js.map