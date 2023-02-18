const Category = require("../models/category");

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
exports.category_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: Category detail: ${req.params.id}`);
};

//dispaly category create form on GET
exports.category_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Category create GET");
};

//handle category create on POST
exports.category_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Category create POST");
};

//display genre delete form on GET
exports.category_delete_get = (req, res) => {
  res.send("NOT Impelemented: Category delete GET");
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
