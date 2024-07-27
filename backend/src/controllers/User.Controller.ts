import { Logger } from "winston";
import { IUserRegisterRequest } from "../types/index.type";
import { NextFunction, Response } from "express";
import { UserService } from "../service/User.Service";
import { setCookie } from "../utils/cookie";

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
            res.status(201).json({ id: newUser._id });
        } catch (error) {
            return next(error);
        }
    }
}
