import mysql from "mysql";
export const connection = mysql.createConnection({
  host: "localhost",
  user: "bappy",
  password: "123",
  database: "ecommerce",
});
