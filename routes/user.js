var express = require("express");
var User = require("../models/user");
var Article = require("../models/article");
var auth = require("../modules/auth");
var router = express.Router();

// these routes are protected routes

// run the auth.validateToken middleware to protect these rotes
router.use(auth.validateToken);

// get a single user
router.get("/", (req, res) => {
  User.findById(req.user.userId, "-password")
    .populate("articlesId")
    .exec((err, user) => {
      if (err) return res.json({ err });
      res.json({ user });
    });
});

// updating a single user
router.put("/", (req, res) => {
  User.findByIdAndUpdate(
    req.user.userId,
    req.body,
    { new: true },
    (err, user) => {
      if (err) return res.json({ err });
      res.json({ user });
    }
  );
});

module.exports = router;
