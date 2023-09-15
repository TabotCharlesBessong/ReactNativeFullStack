import { validate } from "./../middleware/validator";
import { CreateUserSchema } from "./../utils/validationSchema";
import { CreateUser } from "./../@types/user";
import User from "../models/users";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserSchema), async(req: CreateUser, res) => {
  const { email, name, password } = req.body;
  // CreateUserSchema.validate({email,name,password}).catch(err => {
  //   console.log(err)
  // })
  const user = new User({ email, name, password });
  user.save();
  res.json({ user });
});

export default router;
