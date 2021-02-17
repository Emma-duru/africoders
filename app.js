const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.set("view engine", "ejs");

mongoose.connect(
  process.env.MONGO_DBURI,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(4000, () => {
  console.log("Server is running");
});
