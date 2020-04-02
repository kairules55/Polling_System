//Imports
const express = require("express");
const db = require("./config/mongoose");

//Port
const port = 8000;

//App
const app = express();

//MiddleWare
app.use(express.urlencoded());
app.use("/", require("./routes"));

//Server
app.listen(port, function(error) {
  if (error) {
    console.log("Error while starting the app");
    return;
  }
  console.log("Server is up and runnning");
});
