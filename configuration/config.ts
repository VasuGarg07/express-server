import dotenv from "dotenv";
dotenv.config();

export const MONGO_URI = process.env.MONGODB_URI!;
export const JWT_SECRET = process.env.JWT_SECRET!;
export const SERVER_PORT = process.env.SERVER_PORT!;