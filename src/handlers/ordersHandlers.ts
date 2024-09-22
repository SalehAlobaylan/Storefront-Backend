import express, { Request, Response } from "express";
import { orders } from "../models/ordersModel";
import { verifyToken } from "./middleware/JWT";


const store = new orders();

export const current = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const order = await store.currentOrder(id);

    const token = req.header("Authorization")?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    res.json({ order, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error creating user" });
  }
};

// export const completed = async (req: Request, res: Response) => {
//     const theorder = await store.index();
//     res.json(theorder);
// }

const orders_routes = (app: express.Application) => {
  // app.get('/users/:id/orders/current', current);
  app.get("/orders/:id",verifyToken, current);
};
export default orders_routes;
