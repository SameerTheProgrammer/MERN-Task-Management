import express, { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import morgan from "morgan";
// import csrf from "csurf";
import sanitize from "express-mongo-sanitize";
import logger from "./config/logger";
import userRouter from "./routes/user.route";
import todoRouter from "./routes/todo.route";

// Initialize Express app
const app = express();

app.use(express.json());

// All security related middlewares

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(cookieParser());
// app.use(csrf({ cookie: true }));
app.use(hpp());
app.use(morgan("combined"));
app.use(sanitize());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Task Management site");
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        logger.error(err.message);
        const statusCode = err.statusCode || err.status || 500;

        res.status(statusCode).json({
            error: [
                {
                    type: err.name,
                    msg: err.message,
                    path: "",
                    location: "",
                },
            ],
        });
    }
});

export default app;
