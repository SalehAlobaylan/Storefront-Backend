"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.current = void 0;
const ordersModel_1 = require("../models/ordersModel");
const JWT_1 = require("./middleware/JWT");
const store = new ordersModel_1.orders();
const current = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await store.currentOrder(id);
        const token = req.header("Authorization")?.split("Bearer ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        res.json({ order, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating user" });
    }
};
exports.current = current;
// export const completed = async (req: Request, res: Response) => {
//     const theorder = await store.index();
//     res.json(theorder);
// }
const orders_routes = (app) => {
    // app.get('/users/:id/orders/current', current);
    app.get("/orders/:id", JWT_1.verifyToken, exports.current);
};
exports.default = orders_routes;
