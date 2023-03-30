const { body, validationResult, checkSchema } = require("express-validator");
const schema = require("../schema/login");
const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
require("dotenv").config();

router.route("/").post(
  schema,
  // body("username").notEmpty(),
  // body("password").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

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

      const token = jwt.sign(
        { username, password },
        process.env.JWT_SIGN_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
          // expiresIn: "60s"
          // expiresIn: '365d'
        }
      );

      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "err" });
    }
  }
);

module.exports = router;
