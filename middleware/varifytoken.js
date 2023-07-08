import { connection } from "../config/dbConnect.js";
import jwt from "jsonwebtoken";

export const varifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  // console.log(token);
  if (token) {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const sql = `SELECT * from users WHERE users.email='${decoded.email}'`;
    connection.query(sql, (err, result) => {
      if (result[0].email) {
        req.user = {
          name: result[0].name,
          email: result[0].email,
          createDate: result[0].createDate,
          isAdmin: result[0].isAdmin,
        };
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    });
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};
