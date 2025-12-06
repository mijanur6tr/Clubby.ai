import express from "express";
import { authmiddleware } from "../middlewares/auth.js";
import { generateArticle, generateIdea, generateImage , removeBackground, removeObject} from "../controllers/aiController.js";
import { upload } from "../config/multer.js";

const aiRouter = express.Router();

aiRouter.post("/generate-article",authmiddleware,generateArticle);
aiRouter.post("/generate-idea",authmiddleware,generateIdea);
aiRouter.post("/generate-image",authmiddleware,generateImage);
aiRouter.post("/remove-background",upload.single("image"),authmiddleware,removeBackground);
aiRouter.post("/remove-object",upload.single("image"),authmiddleware,removeObject);
// aiRouter.post("/review-resume",upload.single("resume"),authmiddleware,reviewResume);

export default aiRouter;