#! /usr/bin/env node

console.log(
  "This script populates some test items, categories, and iteminstances to the database. Specified database as argument - eg.: popoulatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

var async = require("async");
var Item = require("./models/item");
var Category = require("./models/category");
var ItemInstance = require("./models/iteminstance");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var categories = [];
var items = [];
var iteminstances = [];

function categoryCreate(name, cb) {
  var category = new Category({ name: name });

  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function itemCreate(name, description, category, price, number_in_stock, cb) {
  itemdetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    number_in_stock: number_in_stock,
  };
  if (category != false) itemdetail.category = category;

  var item = new Item(itemdetail);
  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item: " + item);
    items.push(item);
    cb(null, item);
  });
}

function itemInstanceCreate(item, status, cb) {
  iteminstancedetail = {
    item: item,
    status: status,
  };

  var iteminstance = new ItemInstance(iteminstancedetail);
  iteminstance.save(function (err) {
    if (err) {
      console.log("ERROR CREATINT ItemInstance " + iteminstance);
      cb(err, null);
      return;
    }
    console.log("New ItemInstance: " + iteminstance);
    iteminstances.push(iteminstance);
    cb(null, item);
  });
}

function createCategories(cb) {
  async.series(
    [
      function (callback) {
        categoryCreate("Water Sports", callback);
      },
      function (callback) {
        categoryCreate("Racquet Sports", callback);
      },
      function (callback) {
        categoryCreate("Wilderness Sports", callback);
      },
      function (callback) {
        categoryCreate("Running/Field Sports", callback);
      },
    ],
    //optional callback
    cb
  );
}

function createItems(cb) {
  async.parallel(
    [
      function (callback) {
        itemCreate(
          "Test Item 1",
          "DESCRIPTION TEST 1",
          [categories[0]],
          123,
          4,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Test Item 2",
          "DESCRIPTION TEST 2",
          [categories[1]],
          44,
          2,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Test Item 3",
          "DESCRIPTION TEST 3",
          [categories[0], categories[2]],
          35,
          4,
          callback
        );
      },
      function (callback) {
        itemCreate(
          "Test Item 4",
          "DESCRIPTION TEST 4",
          [categories[4]],
          55,
          2,
          callback
        );
      },
    ],
    cb
  );
}

function createItemInstances(cb) {
  async.parallel([
    function (callback) {
      itemInstanceCreate(items[0], "Available", callback);
    },
    function (callback) {
      itemInstanceCreate(items[1], "Low Stock", callback);
    },
    function (callback) {
      itemInstanceCreate(items[2], "Available", callback);
    },
    function (callback) {
      itemInstanceCreate(items[2], "Available", callback);
    },
    function (callback) {
      itemInstanceCreate(items[3], "Available", callback);
    },
    function (callback) {
      itemInstanceCreate(items[3], "Available", callback);
    },
    function (callback) {
      itemInstanceCreate(items[0], "Available", callback);
    },
    function (callback) {
      itemInstanceCreate(items[1], "Low Stock", callback);
    },
    function (callback) {
      itemInstanceCreate(items[2], "Available", callback);
    },
    function (callback) {
      itemInstanceCreate(items[2], "Available", callback);
    },
    function (callback) {
      itemInstanceCreate(items[0], "Available", callback);
    },
    function (callback) {
      itemInstanceCreate(items[0], "Available", callback);
    },
  ]);
}

async.series(
  [createCategories, createItems, createItemInstances],
  //optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("ITEMInstance: " + iteminstances);
    }
    //ALL done, disconnect from database
    mongoose.connection.close();
  }
);
