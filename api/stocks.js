const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");

const Stock = require("../models/stock");
const User = require("../models/user");

// Routes
//GET Stocks
//@Access   Private

router.get("/", (req, res) => {
  console.log(req.user);
  Stock.find().then(stock => res.json(stock));
});

// Add new stock
//@Access   Private
router.post("/", authorize, (req, res) => {
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
router.delete("/:id", authorize, (req, res) => {
  Stock.findById(req.params.id)
    .then(stock => stock.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
