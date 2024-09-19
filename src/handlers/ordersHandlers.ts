import express, { Request, Response } from "express";
import { orders } from "../models/ordersModel";
import { verifyToken } from "./middleware/JWT";
// import jwt from "jsonwebtoken";
// import bodyParser from 'body-parser'

const store = new orders();

// const app = express();
// app.use(bodyParser.json())
const current = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  try {
    const order = await store.currentOrder(user_id);
    // const token = jwt.sign({ userId: user_id.id }, process.env.TOKEN_SECRET as string);
    // console.log("Token generated:", token);

    const token = req.header("Authorization")?.split("Bearer ")[1];
    if (!token) {
      console.log("Authorized header: ", token);
      console.log("\nNo token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    res.json({ order, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error creating user" });
  }
};

// const completed = async (req: Request, res: Response) => {
//     const theorder = await store.index();
//     res.json(theorder);
// }

const orders_routes = (app: express.Application) => {
  // app.get('/users/:user_id/orders/current', current);
  app.get("/orders/:id",verifyToken, current);
};
export default orders_routes;
