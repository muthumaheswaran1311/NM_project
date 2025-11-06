import middleware from "../middleware/middleauth.js";
import express from "express";
import { results, showResponse, showResults } from "../Controllers/resultController.js";

const resultRouter = express();

resultRouter.post("/results",middleware,results);
resultRouter.get("/showresult",middleware,showResults);
resultRouter.get("/showresponse",middleware,showResponse);

export {resultRouter};