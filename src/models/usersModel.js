"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class users {
    async index() {
        // [token required]:
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Cannot get The products ${err}`);
        }
    }
    // Show [token required]
    async show(user_id) {
        try {
            const conn = await database_1.default.connect();
            const sql = "SELECT * FROM users where id = $1";
            const result = await conn.query(sql, [user_id]);
            conn.release();
            const user = result.rows[0];
            return {
                id: user.id,
                firstName: user.firstname,
                lastName: user.lastname,
                password: user.password,
            };
        }
        catch (err) {
            throw new Error(`Cannot get The user id: ${err}`);
        }
    }
    // Create N[token required]
    async create(u) {
        //reqiered token
        try {
            const conn = await database_1.default.connect();
            const sql = `INSERT INTO users (id, firstName, lastName, password) VALUES($1, $2, $3, $4) RETURNING *`;
            const hash = bcrypt_1.default.hashSync(u.password + process.env.pepper, parseInt(process.env.SALT_ROUNDS));
            const result = await conn.query(sql, [
                u.id,
                u.firstName,
                u.lastName,
                hash,
            ]);
            conn.release();
            const createdUser = {
                id: result.rows[0].id,
                firstName: result.rows[0].firstname,
                lastName: result.rows[0].lastname,
                password: result.rows[0].password,
            };
            return createdUser;
        }
        catch (err) {
            throw new Error(`Cannot insert The user info ${err}`);
        }
    }
    async Authenticator(id, pass) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT password FROM users WHERE id=$1`;
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows.length) {
                console.log("result.rows.length exist:");
                console.log(result.rows[0]);
                const { password: hashedPassword } = result.rows[0];
                const valid = bcrypt_1.default.compareSync(pass + process.env.pepper, hashedPassword);
                if (valid) {
                    const conn = await database_1.default.connect();
                    const user = await conn.query(`SELECT id, firstName, lastName FROM users where id=$1`, [id]);
                    conn.release();
                    return user.rows[0]; // ||null
                }
            }
            return null;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    }
}
exports.users = users;
