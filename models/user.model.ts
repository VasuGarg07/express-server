import mongoose, { Schema } from "mongoose";
import { IUser } from "../utils/interfaces";

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 8, maxlength: 15 },
  token: { type: String },
});

export const User = mongoose.model<IUser>("User", userSchema);