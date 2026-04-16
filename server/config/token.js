import jwt from "jsonwebtoken";
const gentoken = async (id) => {
  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });
    return token;
  } catch (err) {
    console.log("GenToken error", err);
  }
};

export default gentoken;
