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
const index = async (req, res, next) => {
    try {
        const users = await store.index();
        // console.log('list of users: ' + users)
        res.json({ users });
    }
    catch (error) {
        next(error);
        return res.status(401).json({ message: "Cannot return list of Users" });
    }
};
exports.index = index;
// show endpoint handler
const show = async (req, res) => {
    const { user_id } = req.params;
    const user = await store.show(user_id);
    res.json({ user });
};
exports.show = show;
// create endpoint handler
const create = async (req, res, next) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const userCreds = { id: req.body.id, firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password } = req.body;
        const newUser = await store.create(userCreds);
        res.status(200).json({
            data: { newUser },
            message: "A new user has been created successfully",
        });
    }
    catch (error) {
        next(error);
        console.log(error);
        res.status(500).json({ error: "Error creating user" });
    }
};
exports.create = create;
// authntication endpoint handler
const auth = async (req, res, next) => {
    try {
        // console.log('Decoded Token:', req.user);  // Log the decoded token to check if it’s valid
        const { id, password } = req.body;
        const authen = await store.Authenticator(id, password);
        if (!authen) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: authen.id }, process.env.TOKEN_SECRET);
        res.status(200).json({ authen, token });
    }
    catch (error) {
        next(error);
        console.error('Error in authentication:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.auth = auth;
const users_routes = (app) => {
    // - Index [token required]: 'Users/authenticateToken' [GET]
    app.get("/users", JWT_1.verifyToken, exports.index);
    // - Show [token required]  '/Users/:id' [GET]
    app.get("/users/:id", JWT_1.verifyToken, exports.show);
    // - Create N[token required]: '/Users' [POST]
    app.post("/users", exports.create);
    app.post("/auth", exports.auth);
};
exports.default = users_routes;
