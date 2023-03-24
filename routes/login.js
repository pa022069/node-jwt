const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
require("dotenv").config();

router.route("/").post(async function (req, res) {
  try {
    const { username, password } = req.body;

    //   const user = await query(
    //     `SELECT username,password FROM User WHERE username='${username}' `
    //   );
    //   if (!user.length) {
    //     res.status(404).json({ msg: "帳號輸入錯誤" });
    //     return;
    //   } else if (user[0].password !== password) {
    //     res.status(403).json({ msg: "密碼錯誤" });
    //     return;
    //   }

    const token = jwt.sign({ username, password }, process.env.JWT_SIGN_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "err" });
  }
});

module.exports = router;