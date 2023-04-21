const jwt = require("jsonwebtoken");
const { createConnection } = require("./mysql");
require("dotenv").config();

const authentication = (req, res, next) => {
  let token;
  try {
    token = req.headers["authorization"].split(" ")[1];
  } catch (e) {
    token = "";
  }

  jwt.verify(token, process.env.JWT_SIGN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized!" });
    } else {
      // 儲存資料到request裡
      res.locals.username = decoded.username;
      next();
    }
  });
};
module.exports = authentication;
