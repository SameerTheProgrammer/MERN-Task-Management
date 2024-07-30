import { Logger } from "winston";
import {
    AuthMiddlewareRequest,
    ICreateTodoRequest,
    IUploadTodoRequest,
} from "../types/index.type";
import { NextFunction, Response } from "express";
import { TodoService } from "../service/Todo.Service";

export class TodoController {
    constructor(
        private logger: Logger,
        private TodoService: TodoService,
    ) {}

    async newTodo(req: ICreateTodoRequest, res: Response, next: NextFunction) {
        try {
            const { title, description, status, priority, deadline } = req.body;
            const userId = req.userId;

            this.logger.info("New request to create a todo", {
                ...req.body,
                userId,
            });

            const newTodo = await this.TodoService.create({
                title,
                description,
                status,
                priority,
                user: userId,
                deadline,
            });

            res.status(201).json({
                message: "Todo is created",
                id: newTodo._id,
            });
        } catch (error) {
            return next(error);
        }
    }

    async updateTodo(
        req: IUploadTodoRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { title, description, status, priority, deadline } = req.body;
            const userId = req.userId;

            this.logger.info("New request to update a todo", {
                ...req.body,
                userId,
            });

            const updatedTodo = await this.TodoService.update({
                id: req.params.id,
                title,
                description,
                status,
                priority,
                deadline,
            });

            res.status(201).json({
                message: "Todo is updated",
                id: updatedTodo._id,
            });
        } catch (error) {
            return next(error);
        }
    }

    async getAllSelfTodos(
        req: AuthMiddlewareRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const userId = req.userId;

            this.logger.info("New request to get all self todos", {
                userId,
            });

            const allSelfTodos = await this.TodoService.findAll();

            res.status(201).json(allSelfTodos);
        } catch (error) {
            return next(error);
        }
    }

    async getByStatus(
        req: AuthMiddlewareRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const userId = req.userId;

            this.logger.info(
                "New request to get all self todo based on status",
                {
                    userId,
                },
            );

            const allTodos = await this.TodoService.findByUserId(userId!);

            const Progress = allTodos.filter(
                (todo) => todo.status === "Progress",
            );
            const Under_Review = allTodos.filter(
                (todo) => todo.status === "Under Review",
            );
            const Completed = allTodos.filter(
                (todo) => todo.status === "Completed",
            );

            res.status(200).json({
                Progress,
                "Under Review": Under_Review,
                Completed,
            });
        } catch (error) {
            return next(error);
        }
    }
    async getSelfOneTodo(
        req: AuthMiddlewareRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const userId = req.userId;
            const todoId = req.params.id;

            this.logger.info("New request to get one self todos", {
                userId,
            });

            const oneSelfTodo = await this.TodoService.findByUserIdOneTodo(
                userId!,
                todoId,
            );

            res.status(200).json(oneSelfTodo);
        } catch (error) {
            return next(error);
        }
    }

    async deleteSelfOneTodo(
        req: AuthMiddlewareRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const userId = req.userId;
            const todoId = req.params.id;

            this.logger.info("New request to delete one self todo", {
                userId,
                todoId,
            });

            await this.TodoService.deleteOneTodo(userId!, todoId);

            res.status(200).json({ message: "Todo is deleted" });
        } catch (error) {
            return next(error);
        }
    }
}
