const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
var moment = require("moment");
const Stock = require("../models/stock");
const User = require("../models/user");

// Routes
//GET Stocks
//@Access   Private

router.post("/find", (req, res) => {
  //console.log("Stock api get:" + req.body.id);
  Stock.find({ user: req.body.id }).then(stock => res.json(stock));
});

// Add new stock
//@Access   Private
router.post("/add", authorize, (req, res) => {
  const newStock = new Stock({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity
  });

  newStock.save().then(stock => res.json(stock));
});

router.post("/buy", authorize, async (req, res) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ msg: "You must be logged in as a user to buy stock" });
  }

  if (!req.body.quantity) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const findUser = await User.findById(req.body.user);
  var value = Number(req.body.value);
  var userBalance = Number(findUser.balance);

  if (value > userBalance) {
    return res.status(400).json({ msg: "Insufficient funds for transaction." });
  } else {
    var newBalance = userBalance - value;
    await User.updateOne(
      { _id: req.body.user },
      { $set: { balance: newBalance } }
    );

    var historyEntry =
      "Purchased " +
      req.body.quantity +
      " shares of " +
      req.body.ticker +
      " for $" +
      req.body.price +
      " each on " +
      moment().format("l") +
      " for" +
      value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      }) +
      ".";
    console.log(historyEntry);
    await User.updateOne(
      { _id: req.body.user },
      { $push: { history: historyEntry } }
    );
  }

  const purchasedStock = new Stock({
    stock: req.body.stock,
    ticker: req.body.ticker,
    price: req.body.price,
    quantity: req.body.quantity,
    data: req.body.data,
    value: req.body.value,
    user: findUser
  });

  purchasedStock.save().then(stock => res.json(stock));
});

//DELETE Stock
//@Access   Private
router.post("/delete", authorize, async (req, res) => {
  const findUser = await User.findById(req.body.user.id);
  var sellValue = Number(req.body.price) * Number(req.body.quantity);
  var newBalance = Number(findUser.balance) + sellValue;

  await User.updateOne(
    { _id: req.body.user.id },
    { $set: { balance: newBalance } }
  );

  var historyEntry =
    "Sold " +
    req.body.quantity +
    " shares of " +
    req.body.ticker +
    " for $" +
    req.body.price +
    " each on " +
    moment().format("l") +
    " for $" +
    sellValue +
    ".";

  console.log(historyEntry);
  await User.updateOne(
    { _id: req.body.user.id },
    { $push: { history: historyEntry } }
  );

  Stock.findById(req.body.id)
    .then(stock => stock.remove().then(stock => res.json(stock._id)))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
