"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("../config/logger"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const Todo_Service_1 = require("../service/Todo.Service");
const Todo_Controller_1 = require("../controllers/Todo.Controller");
const router = express_1.default.Router();
const todoService = new Todo_Service_1.TodoService();
const todoController = new Todo_Controller_1.TodoController(logger_1.default, todoService);
router.post("/", authMiddleware_1.isAuthenticated, (req, res, next) => {
    todoController.newTodo(req, res, next);
});
router.put("/:id", authMiddleware_1.isAuthenticated, (req, res, next) => {
    todoController.updateTodo(req, res, next);
});
router.delete("/:id", authMiddleware_1.isAuthenticated, (req, res, next) => {
    todoController.deleteSelfOneTodo(req, res, next);
});
router.get("/getAll", authMiddleware_1.isAuthenticated, (req, res, next) => {
    todoController.getAllSelfTodos(req, res, next);
});
router.get("/get-by-status", authMiddleware_1.isAuthenticated, (req, res, next) => {
    todoController.getByStatus(req, res, next);
});
router.get("/:id", authMiddleware_1.isAuthenticated, (req, res, next) => {
    todoController.getSelfOneTodo(req, res, next);
});
exports.default = router;
