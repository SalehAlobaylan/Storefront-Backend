import express, { Request, Response, NextFunction  } from "express";
import { users } from "../models/usersModel";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/JWT";

const store = new users();

export const index = async (req: Request, res: Response,next: NextFunction ) => {

  try {
    const users = await store.index();
    // console.log('list of users: ' + users)
    res.json({ users });
  } catch (error) {
    next(error)
    return res.status(401).json({ message: "Cannot return list of Users" });
    
  }
};

// show endpoint handler
export const show = async (req: Request, res: Response ) => {
  const { id  } = req.params;
  try{
    const user = await store.show(id );
    res.json({ user });
  }catch (error) {
    res.status(404).json({ error });
  }
  
};

// create endpoint handler

export const create = async (req: Request, res: Response) => {


  try {
    const { id, firstName, lastName, password } = req.body;
    const newUser = await store.create({ id, firstName, lastName, password });

    res.status(200).json({
      data: { user: newUser },
      message: "A new user has been created successfully",
    });
  } catch (error) {
    
    console.log(error)
    res.status(500).json({ error: "Error creating user" });
  }
};

// authntication endpoint handler
export const auth = async (req: Request, res: Response,next: NextFunction ) => {
  try{
      // console.log('Decoded Token:', req.user);  // Log the decoded token to check if it’s valid
      const { id, password } = req.body;
      const authen = await store.Authenticator(id, password);
      if (!authen) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: authen.id }, process.env.TOKEN_SECRET as string);
    
      res.status(200).json({ authen, token });
  } catch (error) {
    next(error)
    console.error('Error in authentication:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const users_routes = (app: express.Application) => {
  // - Index [token required]: 'Users/authenticateToken' [GET]
  app.get("/users",verifyToken, index);
  // - Show [token required]  '/Users/:id' [GET]
  app.get("/users/:id",verifyToken, show);
  // - Create N[token required]: '/Users' [POST]
  app.post("/users", create);
  app.post("/auth", auth);
};
export default users_routes;
