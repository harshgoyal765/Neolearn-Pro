import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './route/authRoute.js';
import cors from 'cors';
import userRouter from './route/userRoute.js';
import courseRouter from './route/courseRoute.js';
import paymentRouter from './route/paymentRoute.js';

dotenv.config();

const PORT = process.env.PORT ;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL,
credentials: true,}))

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/course", courseRouter)
app.use("/api/order",paymentRouter)

app.get("/", (req, res) => {
  res.send("hello from server");
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDb()
});