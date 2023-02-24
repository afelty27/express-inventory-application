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
  async.parallel(
    {
      iteminstance: function (cb) {
        ItemInstance.findById(req.params.id)
          .populate({
            path: "item",
            populate: {
              path: "category",
            },
          })
          .exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.iteminstance == null) {
        var err = new Error("Item not Found");
        err.status = 404;
        return next(err);
      }
      //successful, so render
      res.render("itemInstance_detail", {
        title: "ItemInstance Detail",
        itemInstance: results.iteminstance,
      });
    }
  );
};

//display ItemInstanace create form on GET
exports.iteminstance_create_get = (req, res, next) => {
  //need to get Item

  Item.find({}, "name").exec(function (err, items) {
    if (err) {
      return next(err);
    }
    //successful, so render
    res.render("iteminstance_form", {
      title: "ItemInstance Create",
      item_list: items,
    });
  });
};

//handle ItemInstance create on POST
exports.iteminstance_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: ItemInstance create POST");
};

//display ItemInstance delete form on GET
exports.iteminstance_delete_get = (req, res, next) => {
  ItemInstance.findById(req.params.id)
    .populate("item")
    .exec(function (err, iteminstance) {
      if (err) {
        return next(err);
      }
      if (iteminstance == null) {
        //no results
        res.redirect("/catalog/iteminstances");
      }
      //successful, so render
      res.render("iteminstance_delete", {
        title: "Delete ItemInstance",
        iteminstance: iteminstance,
      });
    });
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
