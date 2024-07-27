import createHttpError from "http-errors";
import UserModel, { IUser } from "../models/user.model";

export class UserService {
    async create({ name, email, password, cpassword }: IUser) {
        if (cpassword !== password) {
            const error = createHttpError(
                400,
                "Confirm password should match with Password",
            );
            throw error;
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            const error = createHttpError(
                400,
                "Email is already registered. Try with different email",
            );
            throw error;
        }

        try {
            const newUser = new UserModel({ name, email, password });
            return newUser.save();
        } catch (error) {
            const err = createHttpError(400, "Error saving new user");
            throw err;
        }
    }
}
