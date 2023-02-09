const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true },
});

CategorySchema.virtual("url").get(function () {
  return `/catalog/genre/${this._id}`;
});
