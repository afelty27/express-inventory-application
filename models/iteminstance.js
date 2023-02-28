const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemInstanceSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Low Stock", "Out of Stock"],
    default: "Out of Stock",
  },
});

//virtual for url
ItemInstanceSchema.virtual("url").get(function () {
  return `/catalog/iteminstance/${this._id}`;
});

//Export module
module.exports = mongoose.model("ItemInstance", ItemInstanceSchema);
