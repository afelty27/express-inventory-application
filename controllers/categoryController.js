const Category = require("../models/category");
const Item = require("../models/item");
const async = require("async");
const ItemInstance = require("../models/iteminstance");

const { body, validationResult } = require("express-validator");

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
exports.category_create_post = [
  //validate and sanitize the name field
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  //Process request after validation and sanitization
  (req, res, next) => {
    //extract the validation errors from a request
    const errors = validationResult(req);

    //create a category object with excaped and trimmed data
    var category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      //there are errors. render the form again with sanitized values/error messages
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      //data from form is valid
      //check if same name already exists
      Category.findOne({ name: req.body.name }).exec(function (
        err,
        found_category
      ) {
        if (err) {
          return next(err);
        }

        if (found_category) {
          //category exists, redirect to detail page
          res.redirect(found_category.url);
        } else {
          category.save(function (err) {
            if (err) {
              return next(err);
            }
            //category saved. redirect to category detail age
            res.redirect(category.url);
          });
        }
      });
    }
  },
];

//display category delete form on GET
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
};

//handle category delete POST
//TOFIX - gets all iteminstances, not just ones filtered by category
exports.category_delete_post = (req, res, next) => {
  //get category and category item list
  async.parallel(
    {
      category: function (cb) {
        Category.findById(req.params.id).exec(cb);
      },
      category_items: function (cb) {
        ItemInstance.find()
          .popoulate({
            path: "item",
            populate: {
              path: "category",
              match: { _id: req.params.id },
            },
          })
          .exec(cb);
      },
    },
    //check for errors
    function (err, results) {
      if (err) {
        return next(err);
      }
      //no errors, but check if category has any items, if does, rerender form
      if (results.category_items.length > 0) {
        //Category has items, rerender
        res.render("category_delete", {
          title: "Category Delete Form",
          category: results.category,
          category_items: results.category_items,
        });
        return;
      } else {
        //category has no items, delete and redirect to category list page
        Category.findByIdAndRemove(req.body.id, function deleteCategory(err) {
          if (err) {
            return next(err);
          }
          res.redirect("/catalog/categories");
        });
      }
    }
  );
};

//display category update form on GET
exports.category_update_get = (req, res) => {
  Category.findById(req.params.id, function (err, category) {
    if (err) {
      return next(err);
    }
    if (category == null) {
      //No results
      var err = new Error("Category  not found");
      err.status = 404;
      return next(err);
    }
    //success
    res.render("category_form", {
      title: "Create Category",
      category: category,
    });
  });
};

//handle category update on post
exports.category_update_post = [
  //validate and sanitize
  body("name", "Category name must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),

  //process request
  (req, res, next) => {
    const errors = validationResult(req);

    //create a category object
    var category = new Category({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      //there are erros. Render again
      res.render("category_form", {
        title: "Create Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      //data from form is valid. Update record
      Category.findByIdAndUpdate(
        req.params.id,
        category,
        {},
        function (err, thecategory) {
          //successful - redirect to detail page
          res.redirect(thecategory.url);
        }
      );
    }
  },
];
