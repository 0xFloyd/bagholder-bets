var mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  data: {
    type: Object
  },
  stock: {
    type: String,
    trim: true
  },
  ticker: {
    type: String,
    trim: true
  },
  quantity: {
    type: String
  },
  price: {
    type: String
  },
  value: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Stock = mongoose.model("Stock", StockSchema);

module.exports = Stock;
