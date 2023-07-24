import { Router } from "express";
import { tokenGenatator } from "../functions/tokenGenarator.js";
import {
  passwordCompare,
  passwordEncrypt,
} from "../functions/passwordEncrypt.js";
import { connection } from "../config/dbConnect.js";
import { varifyToken } from "../middleware/varifytoken.js";

const user = Router();

// create a single user
/**CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  isAdmin BOOLEAN,
  createDate DATE DEFAULT CURRENT_DATE()
);

ALTER TABLE users ADD UNIQUE (email);

SELECT * FROM users WHERE name = 'John';
 */
user.post("/add", async (req, res) => {
  try {
    const data = req.body;
    // console.log(data)
    const hash = passwordEncrypt(data.password);
    const user = {
      name: data.name,
      email: data.email,
      password: hash,
      isAdmin: false,
    };
    if (user.email?.length > 0 && user.password?.length > 0) {
      const sql = `INSERT INTO users SET?`;
      connection.query(sql, user, (err, result) => {
        if (err) {
          res.status(401).json(err);
        } else {
          tokenGenatator(res, {
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          });
          res.status(200).json({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          });
        }
      });
    } else {
      res.json({
        message: "Something went wrong",
      });
    }
  } catch (error) {
    res.status(401).json(error);
  }
});

// login a single user
user.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const sql = `SELECT * from users WHERE users.email='${email}'`;
    connection.query(sql, async (err, result) => {
      if (result[0] && result[0].email) {
        if (await passwordCompare(password, result[0].password)) {
          const user = {
            name: result[0].name,
            email: result[0].email,
            createDate: result[0].createDate,
            isAdmin: result[0].isAdmin,
          };
          tokenGenatator(res, user);
          res.status(200).json(user);
        } else {
          res.status(401).json(err);
        }
      } else {
        res.status(401).json({ message: "Unathorized" });
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// get user profile

user.get("/", varifyToken, (req, res) => {
  res.json(req.user);
});

user.post("/logout", (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

export default user;
