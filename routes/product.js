import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
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
    res.status(404).send(error.message);
  }
});

product.post("/add", (req, res) => {
  try {
    const product = req.body;
    product.create_time = formatDate(Date.now());
    product.update_time = formatDate(Date.now());
    product._id = uuidv4();
    // console.log(product);
    const sql = "INSERT INTO products SET?";
    connection.query(sql, product, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  } catch (error) {
    res.status(401).send(error.message);
    console.log(error.message);
  }
});

// get single product
product.get("/:id", (req, res) => {
  try {
    const sql = `select * from products where _id=${req.params?.id}`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result[0]);
    });
  } catch (error) {
    res.status(501).send(error.message);
  }
});

export default product;
