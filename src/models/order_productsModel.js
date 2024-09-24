"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.order_products = void 0;
const database_1 = __importDefault(require("../database"));
class order_products {
    async getAllorders(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM order_products WHERE user_id=$1`;
            const result = await conn.query(sql, [user_id]);
            conn.release();
            const order_products = result.rows[0];
            return {
                product_id: order_products.product_id,
                user_id: order_products.user_id,
            };
        }
        catch (error) {
            throw new Error(`there is no:${error.message}`);
        }
    }
}
exports.order_products = order_products;
