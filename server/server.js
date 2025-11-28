import express from 'express';
import cors from "cors";
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());


app.get("/",((req,res)=>res.send("server is running at 3000")));

app.use(requireAuth());
app.use("/api/ai",aiRouter)

app.listen(port , ()=>(console.log(`running on port ${port}`)))


