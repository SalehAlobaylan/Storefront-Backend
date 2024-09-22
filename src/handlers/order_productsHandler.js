"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = void 0;
const order_productsModel_1 = require("../models/order_productsModel");
const store = new order_productsModel_1.order_products();
const getOrders = async (req, res) => {
    const { user_id } = req.params;
    const prodID = await store.getAllorders(user_id);
    res.json(prodID);
};
exports.getOrders = getOrders;
const order_products_routes = (app) => {
    app.get('/orders/products/:id', exports.getOrders);
};
exports.default = order_products_routes;