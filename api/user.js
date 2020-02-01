require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const authorize = require("../middleware/authorize");
// Routes
//POST Register Users

router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // check if user already exists
  User.findOne({ email: email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({
      name: name,
      email: email,
      password: password
    });

    // Create salt first (check error) then and hash. genSalt is 10 rounds, which is default
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          // sign jwt web token
          jwt.sign(
            {
              id: user.id,
              name: user.name
            },
            process.env.jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token: token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  balance: user.balance,
                  history: user.history,
                  date: user.date
                }
              });
            }
          );
        });
      });
    });
  });
});

router.post("/data", (req, res) => {
  console.log(
    "Req.body.id on api/user/data is: " + JSON.stringify(req.body.id)
  );
  User.findById(req.body.id) //or change this to just req.body.user   if you map id to user in body
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ success: false }));
});

//DELETE User
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
