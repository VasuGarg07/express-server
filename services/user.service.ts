import { User } from "../models/user.model";
import { userCreationFailure, userExist, userNotExist } from "../utils/constants";
import { IUser } from "../utils/interfaces";
import { generateJwtToken } from "../utils/utilities";

export const createUser = async (userCreds: IUser) => {
  const user = await User.findOne({ email: userCreds.email });

  if (user) throw userExist;

  try {
    const user = await User.create(userCreds);
    user.token = generateJwtToken(user._id, user.email);
    return user.token;
  } catch (err) {
    throw userCreationFailure;
  }

}

export const getUser = async (userCreds: IUser) => {
  const user = await User.findOne(userCreds);

  if (user) {
    user.token = generateJwtToken(user._id, user.email);
    return user.token;
  }
  throw userNotExist;
}