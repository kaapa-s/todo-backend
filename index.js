const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8888;

app.use(cors());
app.use(express.json());

const todoList = [];

function findToDoById(req, res, next) {
  const foundTodo = todoList.find(
    (todo) => todo.id === parseInt(req.params.todoId, 10)
  );

  const todoIndex = todoList.findIndex((todo) => todo === foundTodo);

  if (!foundTodo || todoIndex === undefined) {
    return res.status(404).end();
  } else {
    req.foundTodo = foundTodo;
    req.todoIndex = todoIndex;

    console.log(req.foundTodo, req.todoIndex);
  }

  next();
}

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

app.patch("/todos/:todoId", findToDoById, (req, res) => {
  Object.entries(req.body).forEach(([key, value]) => {
    todoList[req.todoIndex][key] = value;
  });

  return res.status(200).end();
});

app.delete("/todos/:todoId", findToDoById, (req, res) => {
  todoList.splice(req.todoIndex, 1);

  return res.status(200).end();
});

app.listen(PORT, () => {
  console.log(`Aplikacja wystrtowała na porcie ${PORT}.`);
});
