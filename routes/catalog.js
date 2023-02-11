const express = require("express");
const router = express.Router();

//require controller modules
const item_controller = require("../controllers/itemController");
const category_controller = require("../controllers/categoryController");
const item_instance_controller = require("../controllers/iteminstanceController");

// ITEM ROUTES //

//GET catalog home page
router.get("/", item_controller.index);

//GET request for creating an item. NOTE this must cocme before routes that display item (uses id)
router.get("/item/create", item_controller.item_create_post);

//POST requrest for creating item
router.post("/item/create", item_controller.item_create_post);

//GET requrest for deleting item
router.get("/item/:id/delete", item_controller.item_delete_get);

//POST requets to delete item
router.post("/item/:id/delete", item_controller_item_delete_post);

//GET requrest to update item
router.get("/item/:id/update", item_controller.item_update_get);

//POST requrest to update item
router.post("/item/:id/update", item_controller.item_update_post);

//GET request for one item
router.get("/item/:id", item_controller.item_detail);

//GET request for list of all Item items
router.get("/items", item_controller.item_list);

//CATEGORY ROUTES//

//GET reuqest for creating a Category. NOTE this must come before route that displays Category (uses id)
router.get("/category/create", category_controller.category_create_get);

//POST request for creating Category
router.post("/category/create", category_controller.category_create_post);

//GET request to delete Category
router.get("/category/:id/delete", category_controller.category_delete_get);

//POST reuqest to delete Category
router.post("/category/:id/delete", category_controller.category_delete_post);

//GET request to update Category
router.get("/category/:id/update", category_controller.category_update_get);

//POST request to update Category
router.post("/caregory/:id/update", category_controller.category_update_post);

//GET request for one Category
router.get("/category/:id", category_controller.category_detail);

//GET request for list of all categories
router.get("/categories", category_controller.category_list);

// ITEMINSTANCE ROUTES//

//Get request for creating a iteminstance. NOTE this must come before route that displayce iteminstance (uses id)
router.get(
  "/iteminstance/create",
  item_instance_controller.iteminstance_create_get
);

//POST request for creating itemInstance
router.post(
  "/iteminstance/create",
  item_instance_controller.iteminstance_create_post
);

//GET request to delete iteminstance
router.get(
  "/iteminstance/:id/delete",
  item_instance_controller.iteminstance_delete_get
);

//POST request to delete iteminstance
router.post(
  "/iteminstance/:id/delete",
  item_instance_controller.iteminstance_delete_post
);

//GET request to update iteminstance
router.get(
  "/iteminstance/:id/update",
  item_instance_controller.iteminstance_update_get
);

//POST request to update iteminstance
router.post(
  "/iteminstance/:id/update",
  item_instance_controller.iteminstance_update_post
);

//GET request for one iteminstance
router.get("/iteminstance/:id", item_instance_controller.iteminstance_detail);

//GET request for list of all iteminstance
router.get("/iteminstances", item_instance_controller.iteminstance_list);

module.exports = router;
