import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../configuration/config";
import { object, string } from "yup";
import { Types } from 'mongoose';

export const generateJwtToken = (userId: Types.ObjectId, email: string) => {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '4h' });
}

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str}.`;
};

export const loginSchema = object({
  email: string().email().required(),
  password: string()
    .required("password is a required field")
    .matches(/[A-Z]/, getCharacterValidationError("uppercase character"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase character"))
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .min(8, "Password must contain atleast 8 characters")
    .max(20, "Password can't be greater than 15 characters"),
});