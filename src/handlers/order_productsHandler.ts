import express, {Request, Response } from "express";
import { order_products } from "../models/order_productsModel";

const store = new order_products();

const getOrders = async (req: Request,res: Response) =>{
    const { user_id } = req.params;
    const prodID = await store.getAllorders(user_id);
    res.json(prodID);
}

const order_products_routes = (app: express.Application) => {
    app.get('/orders/products/:id', getOrders);
}
export default order_products_routes