const express = require("express");
const router = express.Router();

router.post("/logout", (_, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/",
  });

  res.status(200).json({ message: "Logged out" });
});

module.exports = router;
