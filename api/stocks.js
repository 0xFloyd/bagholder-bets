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

router.post("/buy", authorize, (req, res) => {
  console.log(req.user);

  if (!req.body.quantity) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const purchasedStock = new Stock({
    stock: req.body.stock,
    ticker: req.body.ticker,
    price: req.body.price,
    quantity: req.body.quantity,
    data: req.body.data,
    value: req.body.value
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
