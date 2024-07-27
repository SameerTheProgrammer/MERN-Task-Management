import { Request } from "express";
import { IUser } from "../models/user.model";

export interface IUserData {
    name: string;
    email: string;
    password: string;
    cpassword: string;
}

export interface IUserRegisterRequest extends Request {
    body: IUserData;
}

export interface IUserLoginData {
    email: string;
    password: string;
}

export interface IUserLoginRequest extends Request {
    body: IUserLoginData;
}

export interface AuthMiddlewareProps extends Request {
    userId?: string;
    user?: IUser;
}

export interface AuthMiddlewareRequest extends AuthMiddlewareProps {
    cookies: {
        task?: string;
    };
}
