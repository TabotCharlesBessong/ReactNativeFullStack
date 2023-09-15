import { RequestHandler } from 'express';
// @ts-ignore 
import { User } from '../models/users';
import { CreateUser } from './../@types/user';

export const create:RequestHandler = async (req: CreateUser, res) => {
  const { email, name, password } = req.body;
  // CreateUserSchema.validate({email,name,password}).catch(err => {
  //   console.log(err)
  // })
  const user = new User({ email, name, password });
  user.save();
  res.json({ user })
};