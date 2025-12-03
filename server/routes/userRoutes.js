import express from "express";
import { getPublicCreations, getUserCreations, toggleLike } from "../controllers/userControllers.js";
import { authmiddleware } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.get("/all-creations",authmiddleware,getUserCreations);
userRouter.get("/public-creations",getPublicCreations);
userRouter.post("/update-likes",toggleLike);


export default userRouter;