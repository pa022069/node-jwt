const bodyparser = require("body-parser");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(bodyparser.urlencoded({ limit: "3mb", extended: true }));
app.use(bodyparser.json({ limit: "3mb" }));

app.use("/login", require("./routes/login"));

app.listen(4002, function () {
  console.log("app listening on port 4002!");
});
