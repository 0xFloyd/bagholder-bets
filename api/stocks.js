const express = require('express');
const router = express.Router();

const Stock = require('../models/stock');

// Routes
//GET Stocks
router.get('/', (req, res) => {
    Stock.find()
    .sort({ date: -1})
    .then(stock => res.json(stock))
});

// Add new stock
router.post('/', (req, res) => {
    const newStock = new Stock({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    });

    newStock.save().then(stock => res.json(stock));
});



//DELETE Stock
router.delete('/:id', (req, res) => {
    Stock.findById(req.params.id).then(stock => 
        stock.remove().then(() => res.json({ success: true}))
    ).catch(err => res.status(404).json({ success: false}));
});


module.exports = router;