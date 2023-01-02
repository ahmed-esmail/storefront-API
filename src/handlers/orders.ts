import { Application, Request, Response } from 'express';
import { auth } from '../middlewares/AuthenticationToken';
import { Order, OrdersModel } from '../models/orders';

const store = new OrdersModel();

const getAllOrders = async (_req: Request, res: Response) => {
    try {
        const getOrders = await store.index();
        return res.send(getOrders);
    } catch (error) {
        res.status(401).json(error);
    }
};

const getOrderById = async (req: Request, res: Response) => {
    try {
        const orderById = await store.show(+req.params.id);
        return res.json(orderById);
    } catch (error) {
        res.status(401).json(error);
    }
};

const createOrder = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status,
            id: undefined as unknown as number,
        };
        const newOrder = await store.create(order);
        return res.json(newOrder);
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteOrderById = async (req: Request, res: Response) => {
    try {
        const deletedOrder = await store.delete(req.body.id);
        return res.send(deletedOrder);
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateOrderById = async (req: Request, res: Response) => {
    try {
        const { id, status } = req.body;
        const updatedOrder = await store.update(id, status);
        return res.send(updatedOrder);
    } catch (error) {
        res.status(400).json(error);
    }
};

const addProduct = async (req: Request, res: Response) => {
    const order_id: string = req.params.id;
    const product_id: string = req.body.product_id;
    const quantity: number = req.body.quantity;

    try {
        const ProductAdded = await store.addProduct(quantity, order_id, product_id);
        res.send(ProductAdded);
    } catch (error) {
        res.status(400).json(error);
    }
};

const ordersRoutes = (app: Application) => {
    app.get('/orders', auth, getAllOrders);
    app.get('/orders/:id', auth, getOrderById);
    app.post('/orders', auth, createOrder);
    app.delete('/orders', auth, deleteOrderById);
    app.put('/orders', auth, updateOrderById);
    app.post('/orders/:id/products', auth, addProduct);
};
export default ordersRoutes;
