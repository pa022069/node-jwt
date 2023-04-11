const express = require("express");
const router = express.Router();
const { createConnection } = require("../helpers/mysql");
const verify = require("../helpers/verify");
require("dotenv").config();

router.use(verify);

router.route("/").get(async function (req, res) {
  try {
    const connection = createConnection();
    connection.connect();
    connection.query(
      `SELECT username, stagename FROM employeeData WHERE username = ?`,
      res.locals.username,
      (err, rows) => {
        if (err) throw err;
        const resultData = Object.values(JSON.parse(JSON.stringify(rows)));

        res.status(200).json({
          verify: {
            username: res.locals.username,
            stagename: resultData[0].stagename,
          },
        });

        connection.end();
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "err" });
  }
});

module.exports = router;
