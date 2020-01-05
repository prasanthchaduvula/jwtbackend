var express = require("express");
var User = require("../models/user");
var Article = require("../models/article");
var auth = require("../modules/auth");
var router = express.Router();

router.get("/:username", (req, res) => {
  User.findOne({ username: req.params.username }, "-password")
    .populate("articlesId")
    .exec((err, user) => {
      if (err) return res.json({ err });
      res.json({ user });
    });
});

module.exports = router;
