"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const database_1 = __importDefault(require("../database"));
class products {
    // index
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM products";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get The products ${err}`);
        }
    }
    // show
    async show(product_id) {
        try {
            const conn = await database_1.default.connect();
            // await new Promise((resolve) => setTimeout(resolve, 1000));
            const sql = "SELECT * FROM products where id = $1";
            const result = await conn.query(sql, [product_id]);
            conn.release();
            console.log("Query result:", result.rows);
            if (result.rows.length === 0) {
                throw new Error(`Product with id ${product_id} not found`);
            }
            const createdUser = {
                id: result.rows[0].id,
                name: result.rows[0].name,
                price: result.rows[0].price,
                category: result.rows[0].category,
            };
            return createdUser;
        }
        catch (err) {
            throw new Error(`Cannot get The product ${err}`);
        }
    }
    // const create
    async create(p) {
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO products (id, name, price, category) VALUES($1, $2, $3, $4) RETURNING *`;
            const values = [p.id, p.name, p.price, p.category];
            const result = await conn.query(sql, values);
            conn.release();
            const prod = result.rows[0];
            return {
                id: prod.id,
                name: prod.name,
                price: prod.price,
                category: prod.category,
            };
        }
        catch (err) {
            throw new Error(`Cannot insert The products ${err}`);
        }
    }
}
exports.products = products;
