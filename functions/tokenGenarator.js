import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const tokenGenatator = (res, data) => {
  var token = jwt.sign(data, process.env.TOKEN_KEY, {
    expiresIn: "3d",
  });
  // res.cookie("myCookie", "cookieValue", { maxAge: 3600000, path: "/" });
  res.cookie("jwt", token, {
    // httpOnly: true,
    path: "/",
    // secure: false, //process.env.NODE_ENV !== "development", // Use secure cookies in production
    // sameSite: "none", // Prevent CSRF attacks
    maxAge: 3 * 24 * 60 * 60 * 1000, // 30 days
  });
  return token;
};
