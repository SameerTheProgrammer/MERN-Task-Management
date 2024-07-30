import { Logger } from "winston";
import {
    AuthMiddlewareRequest,
    IUserLoginRequest,
    IUserRegisterRequest,
} from "../types/index.type";
import { NextFunction, Response } from "express";
import { UserService } from "../service/User.Service";
import { setCookie } from "../utils/cookie";
import createHttpError from "http-errors";
import { comparePassword } from "../utils/bcrypt.util";

export class UserController {
    constructor(
        private logger: Logger,
        private UserService: UserService,
    ) {}

    async register(
        req: IUserRegisterRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { name, email, password, cpassword } = req.body;
            this.logger.info("New request to register a user", {
                name,
                email,
                password: "****",
            });

            const newUser = await this.UserService.create({
                name,
                email,
                password,
                cpassword,
            });

            this.logger.info("User has been registered", { id: newUser._id });

            setCookie(res, String(newUser._id));
            res.status(201).json({
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                },
            });
        } catch (error) {
            return next(error);
        }
    }

    async login(req: IUserLoginRequest, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            this.logger.info("New request to Login a user", {
                email,
                password: "****",
            });

            // check is email is registered or not
            const user = await this.UserService.findByEmailWithPassword(email);
            if (!user) {
                const error = createHttpError(400, "Invalid credentials");
                return next(error);
            }

            const isCorrectPassword = await comparePassword(
                password,
                user.password,
            );

            if (!isCorrectPassword) {
                const error = createHttpError(400, "Invalid credentials");
                return next(error);
            }

            this.logger.info("User logged in", { id: user._id });

            setCookie(res, String(user.id));
            res.status(200).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (error) {
            return next(error);
        }
    }

    async getSelfData(
        req: AuthMiddlewareRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            this.logger.info("New request to get a profile data", {
                id: req.userId,
                email: req.user?.email,
            });

            const user = await this.UserService.findById(String(req.userId));

            res.status(200).json({ user });
        } catch (error) {
            return next(error);
        }
    }

    logout(req: AuthMiddlewareRequest, res: Response, next: NextFunction) {
        try {
            this.logger.info("User has been logged out", { id: req.userId });

            res.clearCookie("task");
            res.json({});
        } catch (err) {
            next(err);
            return;
        }
    }
}
