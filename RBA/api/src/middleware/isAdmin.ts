import { RequestHandler } from "express";

export const isAdmin:RequestHandler = async (req,res,next) => {
  if(req.user.role === "admin") next()
  else res.status(403).json({error:"Protected only for admin"})
}