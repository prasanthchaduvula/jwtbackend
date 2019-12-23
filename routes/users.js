var express = require("express");
var router = express.Router();
var User = require("../models/user");
var jwt = require("jsonwebtoken");

// user signup
router.post("/signup", (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) return res.json({ err });
    res.json({ success: true, message: "registraion successful" });
  });
});

// login of user
router.post("/login", (req, res) => {
  let { password, email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) return res.json({ err });
    if (!user) return res.json("valid email");
    console.log(user);
    if (!user.verifyPassword(password)) return res.redirect("/users/login");
    // jwt
    jwt.sign(
      { username: user.username, userId: user._id, useremail: user.email },
      "thisissecret",
      (err, token) => {
        // send the token to client
        res.json({ token, success: true });
      }
    );
  });
});

module.exports = router;
