import express, { RequestHandler } from "express";
import { UserService } from "../service/User.Service";
import { UserController } from "../controllers/User.Controller";
import logger from "../config/logger";
import {
    AuthMiddlewareRequest,
    IUserLoginRequest,
    IUserRegisterRequest,
} from "../types/index.type";
import { isAuthenticated } from "../middlewares/authMiddleware";

const router = express.Router();

const userService = new UserService();
const userController = new UserController(logger, userService);

router.post("/register", (req, res, next) => {
    userController.register(
        req as IUserRegisterRequest,
        res,
        next,
    ) as unknown as RequestHandler;
});

router.post("/login", (req, res, next) => {
    userController.login(
        req as IUserLoginRequest,
        res,
        next,
    ) as unknown as RequestHandler;
});

router.get(
    "/",
    isAuthenticated as unknown as RequestHandler,
    (req, res, next) => {
        userController.getSelfData(
            req as AuthMiddlewareRequest,
            res,
            next,
        ) as unknown as RequestHandler;
    },
);

export default router;
