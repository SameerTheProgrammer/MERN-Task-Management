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
exports.UserService = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const user_model_1 = __importDefault(require("../models/user.model"));
class UserService {
    create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password, cpassword }) {
            if (cpassword !== password) {
                const error = (0, http_errors_1.default)(400, "Confirm password should match with Password");
                throw error;
            }
            const existingUser = yield user_model_1.default.findOne({ email });
            if (existingUser) {
                const error = (0, http_errors_1.default)(400, "Email is already registered. Try with different email");
                throw error;
            }
            try {
                const newUser = new user_model_1.default({ name, email, password });
                return newUser.save();
            }
            catch (error) {
                const err = (0, http_errors_1.default)(400, "Error saving new user");
                throw err;
            }
        });
    }
    findByEmailWithPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOne({ email }, [
                "name",
                "email",
                "password",
            ]);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOne({ email });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findById(id);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=User.Service.js.map