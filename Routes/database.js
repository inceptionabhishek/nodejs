const express = require("express");
const router = express.Router();
const user = require("../Models/database");

// Register A new User :-
router.post("/register", async (req, res) => {
  const finduser = await user.findOne({ email: req.body.email });
  if (finduser) {
    res.send("User Already Exist");
  } else {
    const newUser = new user({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
    });
    await newUser.save();
    res.send("User Registered Successfully");
  }
});

module.exports = router;
