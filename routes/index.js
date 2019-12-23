var express = require("express");
var router = express.Router();
var auth = require("../modules/auth");

// run the auth.validateToken middleware to protect these rotes
router.use(auth.validateToken);

/* GET home page. */
router.get("/me", function(req, res, next) {
  res.json({ success: true });
});

module.exports = router;
