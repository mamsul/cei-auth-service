const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const users = require("./lib/users.json");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;
const EXPIRED = process.env.EXPIRED;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Auth Service");
});

app.post("/auth", (req, res) => {
  const { email } = req.body;
  const user = users.find((user) => user.email == email);

  try {
    if (!email || !user) {
      res.status(401).json({
        error: "Invalid credentials.",
      });
    }

    res.json({
      email: user.email,
      token: TOKEN,
      expired: EXPIRED,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Auth Service started at http://localhost:${PORT}`);
});

module.exports = app;