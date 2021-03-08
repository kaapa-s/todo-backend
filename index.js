const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const todoList = [];

app.get("/", (req, res) => {
  console.log(req);
  res.send("Serwer działa!");
});

app.post("/todos", (req, res) => {
  todoList.push(req.body);
  res.status(200).end();
});

app.get("/todos", (req, res) => {
  res.json({ todoList });
});

app.listen(8888, () => {
  console.log(`Aplikacja wystrtowała na porcie 8888`);
});
