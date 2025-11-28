import express from "express";
import { authmiddleware } from "../middlewares/auth.js";
import { generateArticle, } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/generate-article",authmiddleware,generateArticle);
// aiRouter.post("/generate-idea",authmiddleware,generateIdea);

export default aiRouter;