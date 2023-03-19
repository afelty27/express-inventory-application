const ItemInstance = require("../models/iteminstance");
const Item = require("../models/item");
const Category = require("../models/category");
var async = require("async");

const { body, validationResult } = require("express-validator");

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
exports.iteminstance_create_post = [
  //need to validate and sanitize data from the inputs
  body("item", "Item name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body("status", "Please choose a status").trim().isLength({ min: 1 }).escape(),

  //process request for errors
  (req, res, next) => {
    const errors = validationResult(req);

    //create a new item instance object with the info
    var itemInstance = new ItemInstance({
      item: req.body.item,
      status: req.body.status,
    });

    //check for errors
    if (!errors.isEmpty()) {
      //There are errors, render form again
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
    } else {
      //save and redirect
      itemInstance.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful, so redirect to new itemInstance page
        res.redirect(itemInstance.url);
      });
    }
  },
];

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

//handle itemInstance delete on POST
exports.iteminstance_delete_post = (req, res) => {
  //don't need to check to find anything, assume instance is valid

  ItemInstance.findByIdAndRemove(req.body.id, function deleteItemInstance(err) {
    if (err) {
      return next(err);
    }
    //success, redirecet to list of all item instances
    res.redirect("/catalog/iteminstances");
  });
};

//display ItemInstance update form on GET
exports.iteminstance_update_get = (req, res) => {
  //get item and categories
  async.parallel(
    {
      iteminstance: function (cb) {
        ItemInstance.findById(req.params.id).populate("item").exec(cb);
      },
      items: function (cb) {
        Item.find(cb);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.iteminstance == null) {
        //no results
        var err = new Error("Copy of item not found");
        err.status = 404;
        return next(err);
      }
      //success
      res.render("iteminstance_form", {
        title: "Update ItemInstance",
        item_list: results.items,
        selected_item: results.iteminstance.item._id,
        iteminstance: results.iteminstance,
      });
    }
  );
};

//handle iteminstance update on POST
exports.iteminstance_update_post = [
  //validate and sanitize
  body("item", "Item name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  body("status", "Please choose a status").trim().isLength({ min: 1 }).escape(),

  //process request
  (req, res, next) => {
    const errors = validationResult(req);

    //create an ItemInstance object
    var iteminstance = new ItemInstance({
      item: req.body.item,
      status: req.body.status,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      //there are errors, rerender
      Item.find({}, "title").exec(function (err, items) {
        if (err) {
          return next(err);
        }
        //successful, render
        res.render("iteminstance_form", {
          title: "Update ItemInstance",
          item_list: items,
          selected_item: iteminstance.item._id,
          errors: errors.array(),
          iteminstance: iteminstance,
        });
      });
      return;
    } else {
      //data is valid
      ItemInstance.findByIdAndUpdate(
        req.params.id,
        iteminstance,
        {},
        function (err, theiteminstance) {
          if (err) {
            return next(err);
          }
          //success so redirect to detial page
          res.redirect(theiteminstance.url);
        }
      );
    }
  },
];
