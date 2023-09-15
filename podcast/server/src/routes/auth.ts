import { CreateUser } from './../@types/user';
import User from '../models/users'
import { Router } from "express";

const router = Router() 

router.post('/create',(req:CreateUser,res) => {
  const {email,name,password} = req.body
  const user = new User({email,name,password})
  user.save()
  res.json({user})
})

export default router