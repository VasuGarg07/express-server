import { Request, Response } from "express";
import { createUser, getUser } from "../services/user.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const token = await createUser(req.body);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const token = await getUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
}