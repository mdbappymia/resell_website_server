import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const tokenGenatator = (res, data) => {
  var token = jwt.sign(data, process.env.TOKEN_KEY, {
    expiresIn: "3d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 3 * 24 * 60 * 60 * 1000, // 30 days
  });
  return token;
};
