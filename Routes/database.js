const express = require("express");
const router = express.Router();
const user = require("../Models/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register A new User :-
router.post("/register", async (req, res) => {
  const finduser = await user.findOne({ email: req.body.email });
  if (finduser) {
    res.send("User Already Exist");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newuser = new user({
      name: req.body.name,
      email: req.body.email,
      password: hash,
      contact: req.body.contact,
    });
    newuser
      .save()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

// Login a User :-
router.post("/login", async (req, res) => {
  const finduser = await user.findOne({ email: req.body.email });
  if (finduser) {
    const result = await bcrypt.compare(req.body.password, finduser.password);
    if (result) {
      const token = jwt.sign(
        {
          email: finduser.email,
          userId: finduser._id,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );
      res.send({
        message: "Login Successfull",
        token: token,
      });
    } else {
      res.send("Password is Incorrect");
    }
  } else {
    res.send("User Not Found");
  }
});

// Get All Users :-

module.exports = router;
