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

//Schema
let userSchema = new mongoose.Schema({
  id : String,
  name : String,
  password : String
});
let User = mongoose.model("User", userSchema)

//EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Set static path
app.use(express.static(path.join(__dirname, "public")));

// Route
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req,res)=>{
  res.render("register")
})

app.post("/addUser", (req,res)=>{
  let user = new User();
  user.id = req.body.id;
  user.name = req.body.name;
  user.password = req.body.password;
  user.save();
  res.redirect("/")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on 3000 port...");
});