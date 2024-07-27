import { config } from "dotenv";
import { cleanEnv, num, port, str } from "envalid";
import path from "path";

if (process.env.NODE_ENV !== "prod") {
    config({
        path: path.join(
            __dirname,
            `../../.env.${process.env.NODE_ENV || "dev"}`,
        ),
    });
}

export const env = cleanEnv(process.env, {
    PORT: port(),
    NODE_ENV: str({ default: "dev", choices: ["test", "prod", "dev"] }),
    MONGO_LINK: str(),
    JWT_SECRET: str(),
    JWT_TOKEN_EXPIRY_DAYS: str(),
    COOKIE_MAXAGE_DAYS: num(),
    COOKIE_DOMAIN: str(),
});

export default env;
