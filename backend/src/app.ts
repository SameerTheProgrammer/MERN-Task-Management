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
import env from "./config/dotenv";

// Initialize Express app
const app = express();

app.use(express.json());

// All security related middlewares
app.set("trust proxy", true);
const allowedOrigins =
    env.NODE_ENV === "production"
        ? ["https://taskman-hazel.vercel.app,"]
        : ["http://localhost:5173"];

app.use(
    cors({
        origin: (origin, callback) => {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // Allow cookies and other credentials to be sent
        methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
        allowedHeaders: [
            "X-CSRF-Token",
            "X-Requested-With",
            "Accept",
            "Accept-Version",
            "Content-Length",
            "Content-MD5",
            "Content-Type",
            "Date",
            "X-Api-Version",
        ],
    }),
);
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
