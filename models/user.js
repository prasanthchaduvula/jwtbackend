var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");

var userSchema = new Schema(
  {
    username: {
      required: true,
      type: String
    },
    email: {
      required: true,
      type: String,
      unique: true,
      match: /@/
    },
    password: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      required: true
    },
    articlesId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Article"
      }
    ]
  },
  { timestamps: true }
);

//hashing password
userSchema.pre("save", function(next) {
  if (this.password && this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, password) => {
      if (err) return next(err);
      this.password = password;
      next();
    });
  }
});

userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// export user model
module.exports = mongoose.model("User", userSchema);
