import { Request, Response,RequestHandler } from "express";

export const signup:RequestHandler = async (req:Request, res:Response) => {
  const {email,name,password,role} = req.body
  console.log(req.body)
};