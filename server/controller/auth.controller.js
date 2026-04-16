import gentoken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
  try {
    const { username, mail, password } = req.body;
    const checkUsername = await User.findOne(username);
    if (checkUsername) {
      return res.status(400).json({ message: "UserName Already Exists." });
    }
    const checkEmail = await User.findOne(mail);
    if (checkEmail) {
      return res.status(400).json({ message: "Email Already Exists." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password Must be atleast 6 character long." });
    }
    const hashePass = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      mail,
      password: hashePass,
    });
    const token = gentoken(user._id);
    res.cookies("token", token, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });
    return res
      .status(201)
      .json({ message: "User Created Successfully.", user, token });
  } catch (err) {
    return res.status(500).json({ message: "User creation Error." });
    console.log("signup error", err);
  }
};
export const login = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne(mail);
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist." });
    }

    // check password
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass) {
      return res.status(400).json({ message: "Incorrect Password." });
    }

    const token = gentoken(user._id);
    res.cookies("token", token, {
      httpOnly: true,
      maxAge: 5 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });
    return res
      .status(201)
      .json({ message: "User Created Successfully.", user, token });
  } catch (err) {
    return res.status(500).json({ message: "User creation Error." });
    console.log("signup error", err);
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "User Logged Out Successfully." });
  } catch (err) {
    return res.status(500).json({ message: "User Logout Error." });
    console.log("logout error", err);
  }
};
