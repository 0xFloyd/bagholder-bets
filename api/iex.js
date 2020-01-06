const axios = require("axios");
const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authorize");
const config = require("config");

const Stock = require("../models/stock");

router.get("/", (req, res) => {
  const data = axios
    .get(
      `https://cloud.iexapis.com/v1/stock/AAPL/quote/2?token=${config.iexToken}`
    )
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(function(error) {
      console.log(error);
    });
  //return res.send(data.data);
});

router.post("/", (req, res) => {
  const { ticker } = req.body;

  /*
    const newStock = new Stock({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    });

    newStock.save().then(stock => res.json(stock));
    */
});

module.exports = router;
