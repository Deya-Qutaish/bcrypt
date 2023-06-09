const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

const users = [
  {
    name: "Anything",
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = {
      name: req.body.name,
      password: hashedPassword,
    };
    users.push(user);
    res.status(201).send("User Created");
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  //   const arr = [
  //     {
  //       name: "Edward",
  //       password: "hello",
  //     },
  //     {
  //       name: "Kyle",
  //       password: "goodbye",
  //     },
  //   ];
  //   console.log(arr);
  //   const find = arr.find((item) => (item.name = req.body.name));
  //   console.log(find);
  const user = users.find((user) => user.name === req.body.name);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send("Could not login");
  }
});

app.listen(3000);
