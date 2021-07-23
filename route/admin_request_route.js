const express = require("express");
const router = express.Router();
const admin_request = require("../models/admin_request_model");
const { check, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post(
  "/admin/request/register",
  [
    check("Fullname", "Firstname is required").not().isEmpty(),
    check("Address", "Address is required").not().isEmpty(),
    check("Contact", "Contact must be valid").isMobilePhone(),
    check("Username", "Username is required").not().isEmpty(),
    check("Email", "Email is required").not().isEmpty(), //check for empty email field
    check("Email", "Enter correct Email").isEmail(),
    check("Password", "Password is required").not().isEmpty(),
    check("Password", "Enter Strong password").isStrongPassword(),
  ],
  function (req, res) {
    const validationError = validationResult(req);

    if (validationError.isEmpty()) {
      const Fullname = req.body.Fullname;
      const Address = req.body.Address;
      const Contact = req.body.Contact;
      const Username = req.body.Username;
      const Email = req.body.Email;
      const Password = req.body.Password;
      bcryptjs.hash(Password, 10, function (err, hash) {
        const admin_request_details = new admin_request({
          Fullname: Fullname,
          Address: Address,
          Contact: Contact,
          Username: Username,
          Email: Email,
          Password: hash,
        });
        console.log("details:", admin_request_details);
        admin_request_details
          .save()
          .then(function (result) {
            res.json({
              message: "Request sent",
            });
          })
          .catch(function (err) {
            res.status(500).json(err);
          });
      });
    } else {
      const error = validationError.errors[0].msg;
      console.log("error", error);
      res.json({ message: error });
    }
  }
);

router.get("/getRequest", function (req, res) {
  admin_request
    .find()
    .exec()
    .then((data) => {
      console.log("data", data);
      res.json( data );
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
