"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_Service_1 = require("../service/User.Service");
const User_Controller_1 = require("../controllers/User.Controller");
const logger_1 = __importDefault(require("../config/logger"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const userService = new User_Service_1.UserService();
const userController = new User_Controller_1.UserController(logger_1.default, userService);
router.post("/register", (req, res, next) => {
    userController.register(req, res, next);
});
router.post("/login", (req, res, next) => {
    userController.login(req, res, next);
});
router.get("/", authMiddleware_1.isAuthenticated, (req, res, next) => {
    userController.getSelfData(req, res, next);
});
router.post("/logout", authMiddleware_1.isAuthenticated, (req, res, next) => {
    userController.logout(req, res, next);
});
exports.default = router;
