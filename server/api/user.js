const express = require("express");
const User = require("../models/usersModel.js");
const router = express.Router();
const verifyToken = require("../utils/verifyToken.js");

router.get("/user", verifyToken, async (req, res) => {
  try {
    const userId = req.id;
    const storedUser = await User.findById(userId).exec();

    const lastAccess = new Date(storedUser.lastLogin);
    const currentDay = new Date();

    const todayString = currentDay.toISOString().split('T')[0];
    const lastLoginString = lastAccess.toISOString().split('T')[0];

    // reset today work duration if it's a new day
    if (todayString !== lastLoginString) {
      storedUser.lastLogin = new Date();
      storedUser.todayDuration = 0;
      await storedUser.save();
    }

    res.status(200).json({ user: storedUser.username });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/user/todayDuration", verifyToken, async (req, res) => {
  try {
    const userId = req.id;
    const storedUser = await User.findById(userId).exec();
    const lastAccess = new Date(storedUser.lastLogin);
    lastAccess.setHours(0, 0, 0, 0);
    const currentDay = new Date();
    currentDay.setHours(0, 0, 0, 0);

    const todayString = currentDay.toISOString().split('T')[0];
    const lastLoginString = lastAccess.toISOString().split('T')[0];
    if (todayString !== lastLoginString ||
      storedUser.todayDuration === undefined
    ) {
      storedUser.todayDuration = 0;
      await storedUser.save();
    }

    res.status(200).json({ duration: storedUser.todayDuration });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
