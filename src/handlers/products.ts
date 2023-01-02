import { Application, Request, Response } from 'express';
import { auth } from '../middlewares/AuthenticationToken';
import { Product, ProductsModel } from '../models/products';

const store = new ProductsModel();

const getAllProducts = async (_req: Request, res: Response) => {
    try {
        const AllProducts = await store.index();
        return res.send(AllProducts);
    } catch (error) {
        res.status(401).json(error);
    }
};

const getProductById = async (req: Request, res: Response) => {
    try {
        const product = await store.show(+req.params.id);
        return res.send(product);
    } catch (error) {
        res.status(401).json(error);
    }
};

const createProduct = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            id: undefined as unknown as number,
        };
        const newProduct = await store.create(product);
        return res.send(newProduct);
    } catch (error) {
        res.status(400).json(error);
    }
};

const deleteProductById = async (req: Request, res: Response) => {
    try {
        const deleted = await store.delete(req.body.id);
        return res.send(deleted);
    } catch (error) {
        res.status(400).json(error);
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const Product: Product = {
            id: req.body.id,
            name: req.body.name,
            price: req.body.price,
        };

        const updatedProduct = await store.update(Product);
        return res.send(updatedProduct);
    } catch (error) {
        res.status(400).json(error);
    }
};

const productsRoutes = (app: Application) => {
    app.get('/products', getAllProducts);
    app.get('/products/:id', getProductById);
    app.post('/products', auth, createProduct);
    app.delete('/products', auth, deleteProductById);
    app.put('/products', auth, updateProduct);
};

export default productsRoutes;
