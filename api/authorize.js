const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config');

const authorize = require('../middleware/authorize');


const User = require('../models/user');

// Routes
//POST Authenticate user
//@access PUBLIC 
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
        return res.status(400).json({ msg:'Please enter all fields'});
    }

    // If no user exists
    User.findOne({ email: email })
    .then(user => {
        if(!user) {
            return res.status(400).json({ msg:'User does not exist'})
        }

        // Compare password thats sent with hashed password
        // Validate password 
        bcrypt.compare(password, user.password)
        .then(passwordsMatch => {
            if(!passwordsMatch) {
                return res.status(400).json({ msg:'Invalid credentials'}); 
            }

            //passwords match
            jwt.sign({
                id: user.id,
                name: user.name
            },config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;
                res.json({
                    token: token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                })
            }
            )
        })
    })
});

//DELETE User
router.delete('/:id', (req, res) => {
    User.findById(req.params.id).then(user => 
        user.remove().then(() => res.json({ success: true}))
    ).catch(err => res.status(404).json({ success: false}));
});


// @route   GET api/auth/user
//@desc     Get authorized user 
//@access   Private
router.get('/user', authorize, (req, res) => {
    User.findById(req.user.id)
    .select('-password')    //ignores password and doesnt return it
    .then(user => res.json(user));
})

module.exports = router;