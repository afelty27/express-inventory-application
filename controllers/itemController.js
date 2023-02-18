const Item = require("../models/item");
const Category = require("../models/category");
const ItemInstance = require("../models/iteminstance");

const async = require("async");

exports.index = (req, res) => {
  async.parallel(
    {
      item_count(callback) {
        Item.countDocuments({}, callback);
      },
      item_instance_count(callback) {
        ItemInstance.countDocuments({}, callback);
      },
      item_instance_available_count(callback) {
        ItemInstance.countDocuments({ status: "Available" }, callback);
      },
      category_count(callback) {
        Category.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Inventory Application Home",
        err: err,
        data: results,
      });
    }
  );
};

//display list of all items
exports.item_list = (req, res, next) => {
  Item.find({}, "name")
    .sort({ name: 1 })
    .populate("")
    .exec(function (err, list_items) {
      if (err) {
        return next(err);
      }
      console.log("here");
      //successful, so render
      res.render("item_list", { title: "Item List", item_list: list_items });
    });
};

//display detail page for a specific item
exports.item_detail = (req, res) => {
  async.parallel(
    {
      item: function (cb) {
        Item.findById(req.params.id).populate("category").exec(cb);
      },
      item_instanace: function (cb) {
        ItemInstance.find({ item: req.params.id }).exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.item === null) {
        var err = new Error("Item not found");
        err.status = 404;
        return next(err);
      }
      //Successful so render
      res.render("item_detail", {
        title: "Item Detail",
        item: results.item,
        item_instance: results.item_instace,
      });
    }
  );
};

//display item create form on GET
exports.item_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Item create GET");
};

//handle item create on POST
exports.item_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Item create POST");
};

//display item delete form on get
exports.item_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Item dlelete GET");
};

//handle item delete on POST
exports.item_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Item delete POST");
};

//display item update form on GET
exports.item_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Item update GET");
};

//handle item update on POST
exports.item_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Item update POST");
};
