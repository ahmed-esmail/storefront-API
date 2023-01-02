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
const AuthenticationToken_1 = require("../middlewares/AuthenticationToken");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = require("../models/users");
const store = new users_1.UsersModel();
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield store.index();
        return res.send(users);
    }
    catch (error) {
        res.status(401).json(error);
    }
    const users = yield store.index();
    res.json(users);
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.show(+req.params.id);
        return res.send(user);
    }
    catch (error) {
        res.status(401).json(error);
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            id: undefined,
        };
        const newUser = yield store.create(user);
        const token = jsonwebtoken_1.default.sign(newUser, process.env.TOKEN_SECRET);
        res.status(200).json(token);
    }
    catch (error) {
        res.status(400).json(error);
    }
});
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield store.delete(req.body.id);
        return res.send(deletedUser);
    }
    catch (error) {
        res.status(401).json(error);
        return;
    }
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            id: +req.body.id,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            password: req.body.password,
        };
        const updated = yield store.update(user);
        return res.json(updated);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
const usersRoutes = (app) => {
    app.get('/users', AuthenticationToken_1.auth, getAllUsers);
    app.get('/users/:id', AuthenticationToken_1.auth, getUserById);
    app.post('/users', createUser);
    app.put('/users', AuthenticationToken_1.auth, updateUser);
    app.delete('/users', AuthenticationToken_1.auth, deleteUserById);
};
exports.default = usersRoutes;
//# sourceMappingURL=users.js.map