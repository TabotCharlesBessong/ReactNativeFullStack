import UserModel from "../models/user.model";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      user: {
        [key: string]: any;
      };
    }
  }
}

export const isAuth:RequestHandler = async (req, res, next) => {
  const authorizationToken = req.headers.authorization;
  const token = authorizationToken?.split(" ")[1];
  console.log(token);
  if (!token) return res.status(403).json({ error: "Unauthorized access!" });
  const payload = jwt.verify(token, "secret") as { id: string };

  const user = await UserModel.findById(payload.id);
  if (!user) return res.status(403).json({ error: "Unauthorized access" });

  req.user = user;
  next();
};