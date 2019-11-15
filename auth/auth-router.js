const router = require("express").Router();
const bcrypt = require("bcrypt");
const users = require("../database/dbConfig");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = {
    username,
    password: bcrypt.hashSync(password, 11)
  };
  try {
    await users("users").insert(user);
    res.status(201).json({ message: "1 user successfully created" });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = await users("users")
      .where({ username })
      .first();
    const result = bcrypt.compareSync(password, user.password);
    if (result) {
      res.status(200).json({ message: "Welcome! You're logged in!" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } else {
    res.status(400).json({ message: "Please provide a username and password" });
  }
});

module.exports = router;
