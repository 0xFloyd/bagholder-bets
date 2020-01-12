var mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Stock = mongoose.model("Stock", StockSchema);

module.exports = Stock;
