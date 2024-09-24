import express, { Request, Response } from "express";
import { orders } from "../models/ordersModel";
import { verifyToken } from "./middleware/JWT";


const store = new orders();

export const current = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const order = await store.currentOrder(user_id);
    
    res.json({ order });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "cannot get order info" });
  }
};

// export const completed = async (req: Request, res: Response) => {
//     const theorder = await store.index();
//     res.json(theorder);
// }

const orders_routes = (app: express.Application) => {
  // app.get('/users/:id/orders/current', current);
  app.get("/orders/:user_id",verifyToken, current);
};
export default orders_routes;
