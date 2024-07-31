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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const todo_model_1 = __importDefault(require("../models/todo.model"));
class TodoService {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, status, priority, user, deadline } = data;
            // Validate input data if necessary
            if (!title || !user) {
                throw (0, http_errors_1.default)(400, "Title and user are required fields");
            }
            const newTodo = new todo_model_1.default({
                title,
                description,
                status,
                priority,
                user,
                deadline,
            });
            return yield newTodo.save();
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, description, status, priority, deadline } = data;
            const isTodoExists = yield todo_model_1.default.findById(id);
            if (!isTodoExists) {
                throw (0, http_errors_1.default)(404, "Todo not found");
            }
            // Update fields
            isTodoExists.title = title || isTodoExists.title;
            isTodoExists.description = description || isTodoExists.description;
            isTodoExists.status = status || isTodoExists.status;
            isTodoExists.priority = priority || isTodoExists.priority;
            isTodoExists.deadline = deadline || isTodoExists.deadline;
            return yield isTodoExists.save();
        });
    }
    deleteOneTodo(userId, todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedTodo = yield todo_model_1.default.findOneAndDelete({
                user: userId,
                _id: todoId,
            });
            if (!deletedTodo) {
                throw (0, http_errors_1.default)(404, "Todo not found or you don't have permission to delete this todo");
            }
            return deletedTodo;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield todo_model_1.default.findById(id);
            if (!todo) {
                throw (0, http_errors_1.default)(404, "Todo not found");
            }
            return todo;
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield todo_model_1.default.find({ user: userId });
            return todos;
        });
    }
    findByUserIdOneTodo(userId, todoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield todo_model_1.default.findOne({ user: userId, _id: todoId });
            if (!todo) {
                throw (0, http_errors_1.default)(404, "Todo not found for this user");
            }
            return todo;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const todos = yield todo_model_1.default.find();
            return todos;
        });
    }
}
exports.TodoService = TodoService;
