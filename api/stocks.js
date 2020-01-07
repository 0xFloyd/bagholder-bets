const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");

const Stock = require("../models/stock");
const User = require("../models/user");

// Routes
//GET Stocks
//@Access   Private

router.get("/", authorize, (req, res) => {
  Stock.find()
    .sort({ date: -1 })
    .then(stock => res.json(stock));
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

//DELETE Stock
//@Access   Private
router.delete("/:id", authorize, (req, res) => {
  Stock.findById(req.params.id)
    .then(stock => stock.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
