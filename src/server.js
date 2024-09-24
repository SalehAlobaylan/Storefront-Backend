"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const productsHandler_1 = __importDefault(require("./handlers/productsHandler"));
const usersHandlers_1 = __importDefault(require("./handlers/usersHandlers"));
const ordersHandlers_1 = __importDefault(require("./handlers/ordersHandlers"));
const order_productsHandler_1 = __importDefault(require("./handlers/order_productsHandler"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
const address = "0.0.0.0:3000";
const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
exports.app.use((0, cors_1.default)(corsOptions)); // Now this middleware makes the cors enabled globally on all endpoints
exports.app.use(body_parser_1.default.json());
(0, productsHandler_1.default)(exports.app);
(0, usersHandlers_1.default)(exports.app);
(0, ordersHandlers_1.default)(exports.app);
(0, order_productsHandler_1.default)(exports.app);
exports.app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
