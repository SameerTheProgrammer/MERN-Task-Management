import express, { RequestHandler } from "express";
import { UserService } from "../service/User.Service";
import { UserController } from "../controllers/User.Controller";
import logger from "../config/logger";
import { IUserRegisterRequest } from "../types/index.type";

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

export default router;
