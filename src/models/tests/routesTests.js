"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../server");
const productsModel_1 = require("../productsModel");
const usersModel_1 = require("../usersModel");
const ordersModel_1 = require("../ordersModel");
const order_productsModel_1 = require("../order_productsModel");
const uuid_1 = require("uuid");
const UUID = (0, uuid_1.v4)();
const request = (0, supertest_1.default)(server_1.app);
const storeP = new productsModel_1.products();
const storeU = new usersModel_1.users();
const storeO = new ordersModel_1.orders();
const storeOP = new order_productsModel_1.order_products();
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpYXQiOjE3MjcxMjE5NDl9.OzC6hrSL7NBjIqzYr2SoDpsK0xTGMOUzraMX5dDDfEQ';
const product = {
    id: `${UUID}`,
    name: "for",
    price: 1,
    category: "testing"
};
const user = {
    id: `${UUID}`,
    firstName: "for",
    lastName: "testing",
    password: "only"
};
const order = {
    id: '1111',
    product_id: '1111',
    prod_quantity: 1,
    user_id: '1111',
    status_of_order: 'A'
};
const order_product = {
    product_id: '1111',
    user_id: '1111'
};
beforeAll(async () => {
    const createUser = await storeU.create(user);
    user.id = createUser.id;
    console.log(user.id);
    const createProduct = await storeP.create(product);
    product.id = createProduct.id;
    console.log(product.id);
    const createOrder = await storeO.currentOrder(order.user_id);
    order.id = createOrder.id;
    console.log(order.user_id);
    const createOrderProducts = await storeOP.getAllorders(order_product.user_id);
    order_product.user_id = createOrderProducts.user_id;
    console.log(order_product.user_id);
});
describe('Lists Products endpoints', () => {
    it('should get list of products', async () => {
        const res = await request
            .get('/products/')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-type', 'application/json');
        expect(res.status).toBe(200);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    });
    //   it('should get one of the products', async () => {
    //     const res = await request
    //       .get(`/products/${product.id}`)
    //       .set('Authorization', `Bearer ${token}`)
    //       .set('Content-type', 'application/json');
    //     const { name, price } = res.body;
    //     expect(name).toBe('for');
    //     expect(price).toBe(1);
    // });
});
describe('Lists users endpoints', () => {
    it('should get list of users', async () => {
        const res = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-type', 'application/json');
        expect(res.status).toBe(200);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    });
    //   it('should get one of the products', async () => {
    //     const res = await request
    //       .get(`/products/${product.id}`)
    //       .set('Authorization', `Bearer ${token}`)
    //       .set('Content-type', 'application/json');
    //     const { name, price } = res.body;
    //     expect(name).toBe('for');
    //     expect(price).toBe(1);
    // });
});
describe('order endpoint', () => {
    it('should get spicefic order', async () => {
        const res = await request
            .get(`/orders/${order.user_id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-type', 'application/json');
        expect(res.status).toBe(200);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    });
});
describe('orderProduct endpoint', () => {
    it('should get all order for a user', async () => {
        const res = await request
            .get(`/orders/products/${order_product.user_id}`)
            .set('Authorization', `Bearer ${token}`)
            .set('Content-type', 'application/json');
        expect(res.status).toBe(200);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    });
});
