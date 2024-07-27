import { Request } from "express";

export interface IUserRegisterRequest extends Request {
    body: {
        name: string;
        email: string;
        password: string;
        cpassword: string;
    };
}
