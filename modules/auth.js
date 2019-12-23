var jwt = require("jsonwebtoken");

exports.validateToken = (req, res, next) => {
  var token = req.headers.authorization;
  if (token) {
    // use same secret used while generating token
    jwt.verify(token, "thisissecret", (err, payload) => {
      // error if token has been tempered
      if (err) return res.status(400).json({ err });
      // put payload info into request and allow request to proceed by calling next
      req.user = payload;
      next();
    });
  } else {
    res.status(401).json({ error: "token is required" });
  }
};
