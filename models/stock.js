var mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    data: {
      type: Object
    },
    name: {
      type: String,
      trim: true
    },
    ticker: {
      type: String,
      trim: true
    },
    quantity: {
      type: Number
    },
    price: {
      type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
  }); 
  

const Stock = mongoose.model("Stock", StockSchema);

module.exports = Stock;