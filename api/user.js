const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Routes
//GET Users
router.get('/', (req, res) => {
    User.find()
    .sort({ date: -1})
    .then(user => res.json(user))
});

// Add new user
router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name
    });

    newUser.save().then(user => res.json(user));
});

//DELETE User
router.delete('/:id', (req, res) => {
    User.findById(req.params.id).then(user => 
        user.remove().then(() => res.json({ success: true}))
    ).catch(err => res.status(404).json({ success: false}));
});

module.exports = router;