"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
class TodoController {
    constructor(logger, TodoService) {
        this.logger = logger;
        this.TodoService = TodoService;
    }
    newTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, status, priority, deadline } = req.body;
                const userId = req.userId;
                this.logger.info("New request to create a todo", Object.assign(Object.assign({}, req.body), { userId }));
                const newTodo = yield this.TodoService.create({
                    title,
                    description,
                    status,
                    priority,
                    user: userId,
                    deadline,
                });
                res.status(201).json({ task: newTodo });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    updateTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, status, priority, deadline } = req.body;
                const userId = req.userId;
                this.logger.info("New request to update a todo", Object.assign(Object.assign({}, req.body), { userId }));
                const updatedTodo = yield this.TodoService.update({
                    id: req.params.id,
                    title,
                    description,
                    status,
                    priority,
                    deadline,
                });
                res.status(201).json({ task: updatedTodo });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getAllSelfTodos(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                this.logger.info("New request to get all self todos", {
                    userId,
                });
                const allSelfTodos = yield this.TodoService.findAll();
                res.status(201).json(allSelfTodos);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getByStatus(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                this.logger.info("New request to get all self todo based on status", {
                    userId,
                });
                const allTodos = yield this.TodoService.findByUserId(userId);
                const Progress = allTodos.filter((todo) => todo.status === "Progress");
                const Under_Review = allTodos.filter((todo) => todo.status === "Under Review");
                const Completed = allTodos.filter((todo) => todo.status === "Completed");
                res.status(200).json({
                    Progress,
                    "Under Review": Under_Review,
                    Completed,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getSelfOneTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const todoId = req.params.id;
                this.logger.info("New request to get one self todos", {
                    userId,
                });
                const oneSelfTodo = yield this.TodoService.findByUserIdOneTodo(userId, todoId);
                res.status(200).json(oneSelfTodo);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    deleteSelfOneTodo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.userId;
                const todoId = req.params.id;
                this.logger.info("New request to delete one self todo", {
                    userId,
                    todoId,
                });
                yield this.TodoService.deleteOneTodo(userId, todoId);
                res.status(200).json({ message: "Todo is deleted" });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.TodoController = TodoController;
//# sourceMappingURL=Todo.Controller.js.map