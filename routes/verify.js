const express = require("express");
const router = express.Router();
const verify = require("../helpers/verify");
require("dotenv").config();

router.use(verify);

router.route("/").get(async function (req, res) {
  try {
    res.status(200).json({
      verify: {
        username: res.locals.username,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "err" });
  }
});

module.exports = router;
