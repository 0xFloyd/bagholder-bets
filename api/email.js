require("dotenv").config({ path: "../.env" });
const express = require("express");

const router = express.Router();
var nodemailer = require("nodemailer");
const config = require("config");

/*
var transport = {
  host: "smtp.gmail.com",
  auth: {
    user: process.env.email,
    pass: process.env.emailPassword
  }
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});
*/
router.post("/", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var content = `name: ${name} \n email: ${email} \n message: ${message} `;

  var mail = {
    from: name,
    to: "arfloyd7@gmail.com", //Change to email address that you want to receive messages on
    subject: "New Message from WSB Contact Form",
    text: content
  };

  return res.status(404);

  /*transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: "fail"
      });
    } else {
      res.json({
        msg: "success"
      });
    }
  });*/
});

module.exports = router;
