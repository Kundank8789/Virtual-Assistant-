import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)



app.listen(PORT, () => {
    connectDB();
    console.log("Server is running ");
});
