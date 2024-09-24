import express, { Request, Response, NextFunction  } from "express";
import { products } from "../models/productsModel";
import { verifyToken } from "./middleware/JWT";

const store = new products();

export const index = async (req: Request, res: Response) => {
  // _req means that not gonna be read
  const prod = await store.index();
  res.json(prod);
};

export const show = async (req: Request, res: Response ) => {
  const { id } = req.params;
  const prodID = await store.show(id);
  res.json(prodID);
};

export const create = async (req: Request, res: Response, next: NextFunction ) => {
  const prods = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };

  try {
    const creating = await store.create(prods);

    res.json({ 
      data: creating,
      message: 'Created product details: '
     });
  } catch (error) {
    next(error)
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
