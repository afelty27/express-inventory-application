const Item = require("../models/item");
const Category = require("../models/category");
const ItemInstance = require("../models/iteminstance");

const async = require("async");
const { body, validationResult } = require("express-validator");

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
      //successful, so render
      res.render("item_list", { title: "Item List", item_list: list_items });
    });
};

//display detail page for a specific item
exports.item_detail = (req, res, next) => {
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
  //get all categories to display
  async.parallel(
    {
      categories: function (cb) {
        Category.find(cb);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("item_form", {
        title: "Item Create Form",
        category_list: results.categories,
      });
    }
  );
};

//handle item create on POST
exports.item_create_post = [
  //convert category to array
  (req, res, next) => {
    if (!(req.body.category instanceof Array)) {
      if (typeof req.body.category === "undefined") req.body.category = [];
      else req.body.category = new Array(req.body.category);
    }
    next();
  },

  //validate and sanitize fields
  body("name", "Name must not be empty").trim().isLength({ min: 1 }).escape(),
  body("description", "Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("category.*").escape(),
  body("price", "Item must have a positive price")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("stock", "Stock must have a positive value").escape(),

  //process request after validation and sanitization
  (req, res, next) => {
    //Extract validation errors from request
    const errors = validationResult(req);

    //Creat Item object with excaped and trimmed data
    var item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      //There are errors, render form again with error messages

      //get all genres for form
      async.parallel(
        {
          categories: function (cb) {
            Category.find(cb);
          },
        },
        function (err, results) {
          if (err) {
            return next(err);
          }
          //mark our selected categories as checked
          for (let i = 0; i < results.categories.length; i++) {
            if (item.category.indexOf(results.categories[i]._id) > -1) {
              results.categories[i].checked = "true";
            }
          }
          res.render("item_form", {
            title: "Create Item",
            category_list: results.categories,
            item: item,
            errors: errors.array(),
          });
        }
      );
      return;
    } else {
      //Data from form is valid. Save book
      item.save(function (err) {
        if (err) {
          return next(err);
        }
        //successful, redirect to new item record
        res.redirect(item.url);
      });
    }
  },
];

//display item delete form on get
exports.item_delete_get = (req, res, next) => {
  async.parallel(
    {
      item: function (cb) {
        Item.findById(req.params.id).populate("category").exec(cb);
      },
      //populate all iteminstances, then filter by Item id
      item_list: function (cb) {
        ItemInstance.find({ item: req.params.id }).exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      // if (results.items == null) {
      //   var err = new Error("Item Not Found");
      //   err.status = 404;
      //   return next(err);
      // }
      res.render("item_delete", {
        title: "Item Delete Form",
        item_instances: results.item_list,
        item: results.item,
      });
    }
  );
};

//handle item delete on POST
exports.item_delete_post = (req, res) => {
  //get item and all instances of item
  async.parallel(
    {
      item: function (cb) {
        Item.findById(req.params.id).exec(cb);
      },
      item_list: function (cb) {
        ItemInstance.find({ item: req.params.id }).populate("item").exec(cb);
      },
    },
    //check for errors
    function (err, results) {
      if (err) {
        return next(err);
      }
      //if no errors, check if has instances
      if (results.item_list.length > 0) {
        res.render("item_delete", {
          title: "Item Delete Form",
          item_instances: results.item_list,
          item: results.item,
        });
        return;
      } else {
        //item has no instances, delete and render item page
        Item.findByIdAndRemove(req.body.id, function deleteItem(err) {
          if (err) {
            return next(err);
          }
          res.redirect("/catalog/items");
        });
      }
    }
  );

  //no errors, check if item has any instances
  //if so, rerender
  //if
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
