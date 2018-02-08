const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const addApiRoutes = require("./src/addApiRoutes");
// import mongodbConnection from "./src/database/mongodb";

const app = express();

app.use(express.static(__dirname + "./public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

addApiRoutes(app);

app.get("/", function(req, res) {
  console.log(req);
  res.send("Hello World!");
});

// mongodbConnection.once("open", () => {
//   console.log("Mongodb server connected.");

  app.listen(3000, "0.0.0.0", err => {
    if (err) return console.log(err);
    console.log("HTTP server started");
  });
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
