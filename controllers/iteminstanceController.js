const ItemInstance = require("../models/iteminstance");
const Item = require("../models/item");
const Category = require("../models/category");
var async = require("async");

//Display list of all ItemInstances.
exports.iteminstance_list = (req, res) => {
  ItemInstance.find({})
    .populate("item")
    .sort({ name: 1 })
    .exec(function (err, list_iteminstance) {
      if (err) {
        return next(err);
      }
      res.render("itemInstance_list", {
        title: "All Items",
        iteminstance_list: list_iteminstance,
      });
    });
};

//Display detail page for a specific ItemInstance
exports.iteminstance_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: ItemInstance detail: ${req.params.id}`);
};

//display ItemInstanace create form on GET
exports.iteminstance_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: ItemInstance create GET");
};

//handle ItemInstance create on POST
exports.iteminstance_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: ItemInstance create POST");
};

//display ItemInstance delete form on GET
exports.iteminstance_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: ItemInstance delte GET");
};

//handle itemInstance delelet on POST
exports.iteminstance_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: ItemInstance delete POST");
};

//display ItemInstance update form on GET
exports.iteminstance_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: ItemInstance update GET");
};

//handle iteminstance update on POST
exports.iteminstance_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: ItemInstance update POST");
};
