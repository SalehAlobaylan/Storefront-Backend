import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

import products_routes from "./handlers/productsHandler";
import users_routes from "./handlers/usersHandlers";
import orders_routes from "./handlers/ordersHandlers";

dotenv.config();

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions)); // Now this middleware makes the cors enabled globally on all endpoints
app.use(bodyParser.json());

products_routes(app);
users_routes(app);
orders_routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
