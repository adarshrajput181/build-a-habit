const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/usersModel.js");
const generateInstances = require("../utils/generateInstances.js");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const storedUser = await User.findOne({ username }).exec();

    if (storedUser === null) {
      return res.status(401).json({ message: "Username or Password doesn't match" });
    }

    const match = bcrypt.compare(password, storedUser.passwordHash);

    if (!match) {
      return res.status(401).json({ message: "Username or Password doesn't match" });
    }

    const currentDay = new Date();
    currentDay.setHours(0, 0, 0, 0);

    // make a jwt token for this sign up
    const token = jwt.sign(
      { id: storedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000 * 8, // 8 hours
      path: "/"
    });

    const todayString = currentDay.toISOString().split('T')[0];
    const lastLoginString = storedUser.lastLogin.toISOString().split('T')[0];

    // logging in for the first time today
    if (todayString !== lastLoginString) {
      storedUser.lastLogin = currentDay;
      storedUser.todayDuration = 0;
      await storedUser.save();
      generateInstances(storedUser._id);
    }

    return res.status(201).json({ message: "Logged In", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
