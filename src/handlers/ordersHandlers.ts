import express, {Request,Response} from 'express'; 
import { order, orders } from '../models/ordersModel';
import { verifyToken } from '../middleware/JWT';

const store = new orders();

const current = async (req: Request, res: Response) => {

        const userId = req.body.user_id;
        const order = await store.currentOrder(userId);
        res.json(order);

};


// const index = async (_req: Request, res: Response) => {
//     const theorder = await store.index();
//     res.json(theorder);
// }

const orders_routes = (app: express.Application) => {
    app.get('/users/:user_id/orders/current',verifyToken, current);}
export default orders_routes;