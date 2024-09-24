"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = void 0;
const database_1 = __importDefault(require("../database"));
class orders {
    // <!-- - Current Order by user (args: user id)[token required] -->
    // current method
    async currentOrder(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE user_id=$1 AND status_of_order = 'A'`;
            const result = await conn.query(sql, [user_id]);
            conn.release();
            const order = result.rows[0];
            return {
                id: order.id,
                product_id: order.product_id,
                prod_quantity: order.prod_quantity,
                user_id: order.user_id,
                status_of_order: order.status_of_order,
            };
        }
        catch (err) {
            throw new Error(`Could not get current order for user ${user_id}: ${err}`);
        }
    }
    // completed method  (Still didn't use)
    async completedOrder(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE user_id = $1 AND status_of_order = 'C'`;
            const result = await conn.query(sql, [user_id]);
            conn.release();
            const order = result.rows[0];
            return {
                id: order.id,
                product_id: order.product_id,
                prod_quantity: order.prod_quantity,
                user_id: order.user_id,
                status_of_order: order.status_of_order,
            };
        }
        catch (err) {
            throw new Error(`Could not get current order for user ${user_id}: ${err}`);
        }
    }
}
exports.orders = orders;
