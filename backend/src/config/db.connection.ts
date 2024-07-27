import mongoose from "mongoose";
import env from "./dotenv";
import logger from "./logger";

const connectDatabase = async () => {
    const data = await mongoose.connect(env.MONGO_LINK);
    logger.info(`Mongodb connected with server: ${data.connection.host}`);
};

export default connectDatabase;
