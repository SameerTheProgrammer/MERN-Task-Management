import express, { RequestHandler } from "express";
import logger from "../config/logger";
import {
    AuthMiddlewareRequest,
    ICreateTodoRequest,
    IUploadTodoRequest,
} from "../types/index.type";
import { isAuthenticated } from "../middlewares/authMiddleware";
import { TodoService } from "../service/Todo.Service";
import { TodoController } from "../controllers/Todo.Controller";

const router = express.Router();

const todoService = new TodoService();
const todoController = new TodoController(logger, todoService);

router.post(
    "/",
    isAuthenticated as unknown as RequestHandler,
    (req, res, next) => {
        todoController.newTodo(
            req as ICreateTodoRequest,
            res,
            next,
        ) as unknown as RequestHandler;
    },
);

router.put(
    "/:id",
    isAuthenticated as unknown as RequestHandler,
    (req, res, next) => {
        todoController.updateTodo(
            req as IUploadTodoRequest,
            res,
            next,
        ) as unknown as RequestHandler;
    },
);

router.delete(
    "/:id",
    isAuthenticated as unknown as RequestHandler,
    (req, res, next) => {
        todoController.deleteSelfOneTodo(
            req as AuthMiddlewareRequest,
            res,
            next,
        ) as unknown as RequestHandler;
    },
);

router.get(
    "/getAll",
    isAuthenticated as unknown as RequestHandler,
    (req, res, next) => {
        todoController.getAllSelfTodos(
            req as AuthMiddlewareRequest,
            res,
            next,
        ) as unknown as RequestHandler;
    },
);

router.get(
    "/get-by-status",
    isAuthenticated as unknown as RequestHandler,
    (req, res, next) => {
        todoController.getByStatus(
            req as AuthMiddlewareRequest,
            res,
            next,
        ) as unknown as RequestHandler;
    },
);

router.get(
    "/:id",
    isAuthenticated as unknown as RequestHandler,
    (req, res, next) => {
        todoController.getSelfOneTodo(
            req as AuthMiddlewareRequest,
            res,
            next,
        ) as unknown as RequestHandler;
    },
);

export default router;
