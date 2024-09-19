import express, { Request, Response } from "express";
import { users } from "../models/usersModel";
import jwt from "jsonwebtoken";
import { verifyToken } from "./middleware/JWT";
// import bodyParser from 'body-parser'

const store = new users();

// const app = express();
// app.use(bodyParser.json())

const index = async (req: Request, res: Response) => {
  // console.log("Entering index function");
  // console.log("Authorization Header:", req.headers.authorization);

  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  const token = req.header("Authorization")?.split("Bearer ")[1];
  // console.log("Extracted token:", token);

  if (!token) {
    console.log("\nAuthorized header: ", token);
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    console.log("Decoded token:", decoded);

    const theuser = await store.index();
    res.json({ theuser });
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// show endpoint handler
const show = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const token = req.header("Authorization")?.split("Bearer ")[1];
  if (!token) {
    console.log("Authorized header: ", token);
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
  console.log("Decoded token:", decoded);

  const user = await store.show(user_id);
  res.json({ user });
};

// create endpoint handler

const create = async (req: Request, res: Response) => {
  // const userCreds = {
  //     id: req.body.id,
  //     firstName: req.body.firstName,
  //     lastName: req.body.lastName,
  //     password: req.body.password
  // };

  try {
    // const { id, firstName, lastName, password } = req.body;
    const newUser = await store.create(req.body);
    // const token = jwt.sign({ userId: newUser.id }, process.env.TOKEN_SECRET as string);

    // console.log("Token generated:", token);

    res.status(200).json({
      data: { newUser },
      message: "A new user has been created successfully",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error creating user" });
  }
};

// authntication endpoint handler
const auth = async (req: Request, res: Response) => {
  const { id, password } = req.body;
  const authen = await store.Authenticator(id, password);
  if (!authen) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: authen.id }, process.env.token as string);

  res.json({ user: authen, token });
};

const users_routes = (app: express.Application) => {
  // - Index [token required]: 'Users/authenticateToken' [GET]
  app.get("/users",verifyToken, index);
  // - Show [token required]  '/Users/:id' [GET]
  app.get("/users/:id",verifyToken, show);
  // - Create N[token required]: '/Users' [POST]
  app.post("/users",verifyToken, create);
  app.post("/auth", auth);
};
export default users_routes;
