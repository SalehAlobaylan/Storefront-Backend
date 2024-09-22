"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.create = exports.show = exports.index = void 0;
const usersModel_1 = require("../models/usersModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_1 = require("./middleware/JWT");
const store = new usersModel_1.users();
const index = async (req, res) => {
    const token = req.header("Authorization")?.split("Bearer ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        console.log("Decoded token:", decoded);
        const theuser = await store.index();
        res.json({ theuser });
    }
    catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
};
exports.index = index;
// show endpoint handler
const show = async (req, res) => {
    const { user_id } = req.params;
    const token = req.header("Authorization")?.split("Bearer ")[1];
    if (!token) {
        console.log("Authorized header: ", token);
        console.log("No token provided");
        return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    console.log("Decoded token:", decoded);
    const user = await store.show(user_id);
    res.json({ user });
};
exports.show = show;
// create endpoint handler
const create = async (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, firstName, lastName, password } = req.body;
        const newUser = await store.create(req.body);
        res.status(200).json({
            data: { newUser },
            message: "A new user has been created successfully",
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating user" });
    }
};
exports.create = create;
// authntication endpoint handler
const auth = async (req, res) => {
    const { id, password } = req.body;
    const authen = await store.Authenticator(id, password);
    if (!authen) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jsonwebtoken_1.default.sign({ id: authen.id }, process.env.token);
    res.json({ user: authen, token });
};
exports.auth = auth;
const users_routes = (app) => {
    // - Index [token required]: 'Users/authenticateToken' [GET]
    app.get("/users", JWT_1.verifyToken, exports.index);
    // - Show [token required]  '/Users/:id' [GET]
    app.get("/users/:id", JWT_1.verifyToken, exports.show);
    // - Create N[token required]: '/Users' [POST]
    app.post("/users", JWT_1.verifyToken, exports.create);
    app.post("/auth", exports.auth);
};
exports.default = users_routes;
