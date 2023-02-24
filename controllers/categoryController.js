const Category = require("../models/category");
const Item = require("../models/item");
const async = require("async");
const ItemInstance = require("../models/iteminstance");

//Dispaly list of all categories
exports.category_list = (req, res, next) => {
  Category.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_categories) {
      if (err) {
        return next(err);
      }
      //successful, so render
      res.render("category_list", {
        title: "Category List",
        category_list: list_categories,
      });
    });
};

//dipslay detail page for a specific category
exports.category_detail = (req, res, next) => {
  async.parallel(
    {
      category: function (cb) {
        Category.findById(req.params.id).exec(cb);
      },
      category_items: function (cb) {
        Item.find({ category: req.params.id }).exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        //No results
        var err = new Error("Category not Found");
        err.status = 404;
        return next(err);
      }
      //successful, so render.
      res.render("category_detail", {
        title: "Category Detail",
        category: results.category,
        category_items: results.category_items,
      });
    }
  );
};

//dispaly category create form on GET
exports.category_create_get = (req, res, next) => {
  res.render("category_form", { title: "Category Form" });
};

//handle category create on POST
exports.category_create_post = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Category create POST");
};

//display genre delete form on GET
//FIX? need to get list of ItemInstances not just types
exports.category_delete_get = (req, res, next) => {
  //get all current categories and item associated with them
  async.parallel(
    {
      category_items: function (cb) {
        console.log("here");
        console.log(cb);
        console.log(req.params);
        //Item.find({ category: req.params.id }).exec(cb);
        ItemInstance.find()
          .populate({
            path: "item",
            populate: {
              path: "category",
            },
          })
          // .find({ "item.category._id": req.params.id })
          .exec(cb);
        // .match({ "item.category._id": req.params.id });
      },
      category: function (cb) {
        Category.findById(req.params.id).exec(cb);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.render("category_delete", {
        title: "Category Delete Form",
        category: results.category,
        category_items: results.category_items,
      });
    }
  );

  //res.send("NOT Impelemented: Category delete GET");
};

//handle category delete POST
exports.category_delete_post = (req, res) => {
  res.send("NOT IMPELEMENTED: Category delete POST");
};

//display category update form on GET
exports.category_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Category update GET");
};

//handle category update on post
exports.category_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Category update POST");
};
