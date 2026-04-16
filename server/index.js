import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
dotenv.config({ quiet: true });
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
