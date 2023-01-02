import { Application, Request, Response } from 'express';
import { auth } from '../middlewares/AuthenticationToken';
import jwt from 'jsonwebtoken';
import { User, UsersModel } from '../models/users';

const store = new UsersModel();

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await store.index();
        return res.send(users);
    } catch (error) {
        res.status(401).json(error);
    }
    const users = await store.index();
    res.json(users);
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await store.show(+req.params.id);
        return res.send(user);
    } catch (error) {
        res.status(401).json(error);
    }
};

const createUser = async (req: Request, res: Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            id: undefined as unknown as number,
        };

        const newUser = await store.create(user);
        const token = jwt.sign(newUser, process.env.TOKEN_SECRET as string);
        res.status(200).json(token);
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteUserById = async (req: Request, res: Response) => {
    try {
        const deletedUser = await store.delete(req.body.id);
        return res.send(deletedUser);
    } catch (error) {
        res.status(401).json(error);
        return;
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const user = {
            id: +req.body.id,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            password: req.body.password,
        };
        const updated = await store.update(user);
        return res.json(updated);
    } catch (error) {
        res.status(500).json(error);
    }
};

const usersRoutes = (app: Application) => {
    app.get('/users', auth, getAllUsers);
    app.get('/users/:id', auth, getUserById);
    app.post('/users', createUser);
    app.put('/users', auth, updateUser);
    app.delete('/users', auth, deleteUserById);
};

export default usersRoutes;
