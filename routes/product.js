import { Router } from "express";
import { connection } from "../config/dbConnect.js";
import { formatDate } from "../functions/formatDate.js";

const product = Router();

product.get("/", (req, res) => {
  //get product
  try {
    const sql = "select * from products";
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    res.send(error.message);
  }
});

product.post("/add", (req, res) => {
  try {
    const product = req.body;
    product.create_time = formatDate(Date.now());
    product.update_time = formatDate(Date.now());
    // console.log(product);
    const sql = "INSERT INTO products SET?";
    connection.query(sql, product, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    res.send(error.message);
    console.log(error.message);
  }
});

export default product;
