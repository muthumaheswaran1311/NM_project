import express from "express" 
import { getQuestion, newQuestion, question, userQuestion } from "../Controllers/questionController.js"
import middleware from "../middleware/middleauth.js"

const questionRouter = express.Router()

questionRouter.post("/create",middleware,newQuestion)
questionRouter.get("/fetch",middleware,getQuestion)
questionRouter.post("/user",userQuestion)
questionRouter.post("/paper",question)


export {questionRouter}

