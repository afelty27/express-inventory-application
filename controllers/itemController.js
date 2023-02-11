const Item = require("../models/item");

exports.index = (req, res) => {
  res.send("NOT IMPELEMENTED: Site Home Page");
};

//display list of all items
exports.item_list = (req, res) => {
  res.send("NOT IMPLEMENTED: Item list");
};

//display detail page for a specific item
exports.item_detail = (req, res) => {
  res.send(`NOT IMPLEMENED: Item detail: ${req.params.id}`);
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
