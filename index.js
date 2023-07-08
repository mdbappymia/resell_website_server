import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./config/dbConnect.js";
import dotenv from "dotenv";
import product from "./routes/product.js";
import user from "./routes/user.js";
import { errorHandler, notFound } from "./functions/errorHandle.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
connection.connect((e) => {
  if (e) {
    throw e;
  } else {
    console.log("Database Connected");
  }
});

app.use("/products", product);
app.use("/user", user);

app.get("/", (req, res) => {
  res.send("Server is connected");
});

// create a table using hit the api
app.get("/createProductTable", (req, res) => {
  const sql = `CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    product_type VARCHAR(50) NOT NULL,
    details TEXT,
    short_desc VARCHAR(255),
    create_time DATE,
    update_time DATE,
    rating INT,
    price DECIMAL(10, 2),
    discount DECIMAL(10, 2),
    product_link VARCHAR(255)
  );
    `;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("table created");
  });
});

// add new product
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server is connected");
});
