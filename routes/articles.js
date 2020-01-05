var express = require("express");
var User = require("../models/user");
var Article = require("../models/article");
var auth = require("../modules/auth");
var router = express.Router();

// get all articles
router.get("/", (req, res) => {
  Article.find({})
    .populate("userId")
    .exec((err, articles) => {
      if (err) return res.json({ err });
      res.json({ articles });
    });
});

// these routes are protected routes

// run the auth.validateToken middleware to protect these rotes
router.use(auth.validateToken);

// create article
router.post("/", (req, res) => {
  let { userId } = req.user;
  req.body.userId = userId;
  Article.create(req.body, (err, createdArticle) => {
    if (err) return res.json({ err });
    User.findOneAndUpdate(
      { _id: createdArticle.userId },
      { $push: { articlesId: createdArticle.id } },
      { new: true },
      (err, updatedUser) => {
        if (err) return res.json({ err });
        return res.json(createdArticle);
      }
    );
  });
});

// delete article
router.delete("/:id", (req, res) => {
  Article.findByIdAndDelete({ _id: req.params.id }, (err, deletedArticle) => {
    if (err) return res.json({ err });
    res.json({
      success: true,
      message: "deleted Successfully",
      deletedArticle
    });
  });
});

module.exports = router;
