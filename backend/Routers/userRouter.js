import express from "express"
import {Register,Login} from "../Controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/register",Register)
userRouter.post("/login",Login)

export {userRouter};