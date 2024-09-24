"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.show = exports.index = void 0;
const productsModel_1 = require("../models/productsModel");
const JWT_1 = require("./middleware/JWT");
const store = new productsModel_1.products();
const index = async (req, res) => {
    // _req means that not gonna be read
    const token = req.header("Authorization")?.split("Bearer ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    const prod = await store.index();
    res.json(prod);
};
exports.index = index;
const show = async (req, res) => {
    const { user_id } = req.params;
    const prodID = await store.show(user_id);
    res.json(prodID);
};
exports.show = show;
const create = async (req, res, next) => {
    const prods = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
    };
    try {
        const creating = await store.create(prods);
        res.json({ creating });
    }
    catch (error) {
        next(error);
        console.log(error);
        res.status(500).json({ error: "Error creating user" });
    }
};
exports.create = create;
// const top5
// const category
const products_routes = (app) => {
    app.get("/products", exports.index);
    //     - Show : 'product/:id' [GET]
    app.get("/products/:id", exports.show);
    //     - Create [token required]: 'products/authenticateToken' [POST]
    app.post("/products", JWT_1.verifyToken, exports.create);
    //<!-- - [OPTIONAL] Top 5 most popular products  -->
    //<!-- - [OPTIONAL] Products by category (args: product category) -->
};
exports.default = products_routes;
