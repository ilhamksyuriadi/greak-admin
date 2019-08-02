const express = require("express")
const mongoose = require('mongoose');
let path = require("path");

app = express()

//DB
const db = require('./config/keys').mongoURI;

//Connect DB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Set static path
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on 3000 port...");
});