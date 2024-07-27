import createHttpError from "http-errors";
import TodoModel from "../models/todo.model";
import { ITodoData } from "../types/index.type";

export class TodoService {
    async create(data: ITodoData) {
        const { title, description, status, priority, user, deadline } = data;

        // Validate input data if necessary
        if (!title || !user) {
            throw createHttpError(400, "Title and user are required fields");
        }

        const newTodo = new TodoModel({
            title,
            description,
            status,
            priority,
            user,
            deadline: deadline ? new Date(deadline) : undefined,
        });

        return await newTodo.save();
    }

    async update(data: ITodoData) {
        const { id, title, description, status, priority, deadline } = data;

        const isTodoExists = await TodoModel.findById(id);
        if (!isTodoExists) {
            throw createHttpError(404, "Todo not found");
        }

        // Update fields
        isTodoExists.title = title || isTodoExists.title;
        isTodoExists.description = description || isTodoExists.description;
        isTodoExists.status = status || isTodoExists.status;
        isTodoExists.priority = priority || isTodoExists.priority;
        isTodoExists.deadline = deadline
            ? new Date(deadline)
            : isTodoExists.deadline;

        return await isTodoExists.save();
    }

    async deleteOneTodo(userId: string, todoId: string) {
        const deletedTodo = await TodoModel.findOneAndDelete({
            user: userId,
            _id: todoId,
        });
        if (!deletedTodo) {
            throw createHttpError(
                404,
                "Todo not found or you don't have permission to delete this todo",
            );
        }
        return deletedTodo;
    }

    async findById(id: string) {
        const todo = await TodoModel.findById(id);
        if (!todo) {
            throw createHttpError(404, "Todo not found");
        }
        return todo;
    }

    async findByUserId(userId: string) {
        const todos = await TodoModel.find({ user: userId });
        return todos;
    }

    async findByUserIdOneTodo(userId: string, todoId: string) {
        const todo = await TodoModel.findOne({ user: userId, _id: todoId });
        if (!todo) {
            throw createHttpError(404, "Todo not found for this user");
        }
        return todo;
    }

    async findAll() {
        const todos = await TodoModel.find();
        return todos;
    }
}
