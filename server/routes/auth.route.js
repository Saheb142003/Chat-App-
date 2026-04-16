import express from "exoress";
import { login, logout, signup } from "../controller/auth.controller";
const authRouter = express.Router();
authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
