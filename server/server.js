import express from 'express';
import cors from "cors";
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';
import cloudinaryConfig from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://clubby-seven.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(clerkMiddleware());


app.use(async (req, res, next) => {
  try {
    await cloudinaryConfig();
    next();
  } catch (err) {
    next(err);
  }
});

// Public route
app.get("/", (req, res) => res.send("Server is running"));

// Protected routes
app.use("/api/ai", requireAuth(), aiRouter);
app.use("/api/user", requireAuth(), userRouter);

// Only listen locally
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Running locally on port ${port}`));
}

export default app;
