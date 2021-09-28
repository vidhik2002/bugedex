const express = require("express");

const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    // allUsers.sort((a, b) => b.questions.length - a.questions.length);
    allUsers.sort(
      (a, b) =>
        b.noOfSubmissions - a.noOfSubmissions || b.noOfStars - a.noOfStars
    );

    const responseJSON = allUsers.map(({ username, noOfSubmissions, noOfStars }) => ({
      username,
      noOfSubmissions,
      noOfStars
    }));

    res.status(200).json(responseJSON);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      error: e,
    });
  }
});

module.exports = router;