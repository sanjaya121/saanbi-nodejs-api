const { App } = require("./app")

const start =():void =>{

  const app = new App;

  app.listen();

}

start();







// const express = require("express");

// const app = express();
// const PORT = 5001;

// const mysql = require("mysql2");
// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "esotre",
//   password:'Nepal121!',
//   port: 3306,
//   multipleStatements: true,
// });

// app.get("/", (req, res) => {
//   pool.getConnection((error, connection) => {
//     if (error) {
//       res.status(500).send(error);
//     } else {
//       res.status(200).send("Connection Established.");
//     }
//   });
// });

// const server = app.listen(PORT, () => {
//   console.log("App is running on port", PORT);
// });



