const express = require("express")
const mongoose = require('mongoose');
const path = require("path");
const bcrypt = require("bcryptjs")

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

app.get("/dashboard", (req,res)=>{
  res.render("dashboard")
})

app.post("/addUser", (req,res)=>{
  let user = new User();
  user.id = req.body.id;
  user.name = req.body.name;

  bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(req.body.password, salt, (err,hash)=>{
      user.password = hash
      user.save()
    })
  })

  res.redirect("/")
})

app.post("/login",(req,res)=>{
  const { id, password } = req.body
  // let sign = null;
  let sign = User.findOne({
    id:id
  }).then(user=>{
    bcrypt.compare(password, user.password, (err, isMatch, next) => {
      if (err) throw err;
      if (isMatch) {
        return true
      }else{
        return false
      }
    })
  })

  if (sign) {
    res.redirect("/dashboard")
  }else{
    console.log("wrong password")
  }
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on 3000 port...");
});