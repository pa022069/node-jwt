const { validationResult } = require("express-validator");
const express = require("express");
const schema = require("../schema/setting");
const router = express.Router();
const verify = require("../helpers/verify");
const { createConnection } = require("../helpers/mysql");

router.use(verify);

router.route("/list").get(async (req, res) => {
  try {
    const connection = createConnection();
    connection.connect();
    connection.query(
      `SELECT username, stagename FROM employeeData`,
      (err, rows) => {
        if (err) throw err;
        const resultData = Object.values(JSON.parse(JSON.stringify(rows)));
        res.status(200).json({
          data: resultData,
        });

        connection.end();
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "err" });
  }
});
router.route("/addNewUser").post(schema.add, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const bodyValue = [
      [req.body.username, req.body.password, req.body.stagename],
    ];
    const connection = createConnection();
    connection.connect();
    connection.query(
      `INSERT INTO employeeData (username, password, stagename) VALUES ?`,
      [bodyValue],
      (err) => {
        if (err) throw err;

        res.status(200).json({
          data: "success",
        });

        connection.end();
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "err" });
  }
});

router.route("/deleteUser").post(schema.delete, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const connection = createConnection();
    connection.connect();
    connection.query(
      `DELETE FROM employeeData WHERE username = '${req.body.username}'`,
      (err) => {
        if (err) throw err;

        res.status(200).json({
          data: "success",
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
