import UserModel from "../models/user.model";
import { Request, Response, RequestHandler } from "express";
import jwt from "jsonwebtoken"

export const signup: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, name, password, role } = req.body;

    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res
        .status(403)
        .json({ error: "The email address already exist!" });

    const user = await UserModel.create({ email, password, name, role });
    console.log(user);
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ error: "Could not create a user" });
  }
};

export const signin: RequestHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) return res.status(404).json({ error: "User not found!" });

  const isMatched = await user.comparePassword(password);

  if (!isMatched)
    return res.status(403).json({ error: "Email/Password doesn't match!" });

  const token = jwt.sign({id:user._id.toString()},"secret")

  res.json({ success: true, user,token });
};

export const privateResponse:RequestHandler = async (req:Request,res:Response) => {
  res.json({message:"Cool you are in the private route!"})
}

export const adminResponse:RequestHandler = async (req:Request,res:Response) => {
  res.json({message:"Cool you are in the padmin route!"})
}
