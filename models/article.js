var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var URLSlug = require("mongoose-url-slugs");

var articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  { timestamps: true }
);

articleSchema.plugin(URLSlug("title", { field: "slug" }));
module.exports = mongoose.model("Article", articleSchema);
