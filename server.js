require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");
const cors = require("cors");
var nodemailer = require("nodemailer");

const app = express();
// huh
app.use(cors());
app.use(express.json());

// get mongoDB login & connect
const db = process.env.mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("mongoDBconnected"))
  .catch(err => console.log(err));

// Middleware
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
*/
app.use("/api/user", require("./api/user"));
app.use("/api/stocks", require("./api/stocks"));
app.use("/api/authorize", require("./api/authorize"));
app.use("/api/iex", require("./api/iex"));
app.use("/api/email", require("./api/email"));

// serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder

  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
// test
app.listen(port, () => console.log(`Server started on port ${port}`));
