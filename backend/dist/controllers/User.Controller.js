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
exports.UserController = void 0;
const cookie_1 = require("../utils/cookie");
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_util_1 = require("../utils/bcrypt.util");
class UserController {
    constructor(logger, UserService) {
        this.logger = logger;
        this.UserService = UserService;
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, cpassword } = req.body;
                this.logger.info("New request to register a user", {
                    name,
                    email,
                    password: "****",
                });
                const newUser = yield this.UserService.create({
                    name,
                    email,
                    password,
                    cpassword,
                });
                this.logger.info("User has been registered", { id: newUser._id });
                (0, cookie_1.setCookie)(res, String(newUser._id));
                res.status(201).json({
                    user: {
                        _id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                    },
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                this.logger.info("New request to Login a user", {
                    email,
                    password: "****",
                });
                // check is email is registered or not
                const user = yield this.UserService.findByEmailWithPassword(email);
                if (!user) {
                    const error = (0, http_errors_1.default)(400, "Invalid credentials");
                    return next(error);
                }
                const isCorrectPassword = yield (0, bcrypt_util_1.comparePassword)(password, user.password);
                if (!isCorrectPassword) {
                    const error = (0, http_errors_1.default)(400, "Invalid credentials");
                    return next(error);
                }
                this.logger.info("User logged in", { id: user._id });
                (0, cookie_1.setCookie)(res, String(user.id));
                res.status(200).json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                    },
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getSelfData(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                this.logger.info("New request to get a profile data", {
                    id: req.userId,
                    email: (_a = req.user) === null || _a === void 0 ? void 0 : _a.email,
                });
                const user = yield this.UserService.findById(String(req.userId));
                res.status(200).json({ user });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    logout(req, res, next) {
        try {
            this.logger.info("User has been logged out", { id: req.userId });
            res.clearCookie("task");
            res.json({});
        }
        catch (err) {
            next(err);
            return;
        }
    }
}
exports.UserController = UserController;
