import express, { Request, Response } from "express";
import { products } from "../models/productsModel";
import { verifyToken } from "./middleware/JWT";
import jwt from "jsonwebtoken";

const store = new products();

const index = async (req: Request, res: Response) => {
  // _req means that not gonna be read

  const token = req.header("Authorization")?.split("Bearer ")[1];
  // console.log("Extracted token:", token);

  if (!token) {
    console.log("\nAuthorized header: ", token);
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

  console.log("Decoded token:", decoded);
  const prod = await store.index();
  res.json(prod);
};

const show = async (req: Request, res: Response) => {
  const { user_id } = req.body;
  const prodID = await store.show(user_id);
  res.json(prodID);
};

const create = async (req: Request, res: Response) => {
  const prods = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  // const token = req.header('Authorization')?.split('Bearer ')[1];
  // if (!token) {
  //     console.log("Authorized header: ", token);
  //     console.log("\nNo token provided");
  //     return res.status(401).json({ message: "No token provided" });
  // }
  try {
    const creating = await store.create(prods);
    // let token = jwt.sign({ user_id: req.body }, process.env.TOKEN_SECRET as string);
    // parseInt(token)
    // token = 'Bearer '+token
    // console.log("Token generated:", token);

    res.json({ creating });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error creating user" });
  }
};

// const top5
// const category

const products_routes = (app: express.Application) => {
  app.get("/products", index);
  //     - Show : 'product/:id' [GET]
  app.get("/products/:id", show);
  //     - Create [token required]: 'products/authenticateToken' [POST]
  app.post("/products", verifyToken, create);
  //<!-- - [OPTIONAL] Top 5 most popular products  -->
  //<!-- - [OPTIONAL] Products by category (args: product category) -->
};
export default products_routes;
