import express from 'express';
import { activateUser, loginUser, registrationUser } from '../controllers/user.controller';
const userRouter = express.Router()

userRouter.post("/registration", registrationUser);
userRouter.post("/activate", activateUser);
userRouter.post("/login", loginUser);

export default userRouter