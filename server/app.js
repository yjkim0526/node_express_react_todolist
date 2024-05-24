const express = require("express");
const app = express();
const port = 4000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

let id = 1;
const todoList = [];

app.get("/api/tododel/:id", (req, res) => {
  console.log("req.params.id :" + req.params.id);
  const delId = req.params.id;

  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id == delId) {
      todoList.splice(i, 1);
    }
  }
  return res.send("success");
});

app.get("/api/todo", (req, res) => {
  console.log(todoList);
  // 최신글부터 보기 (정렬)
  todoList.sort((a, b) => b.id - a.id);
  return res.json(todoList);
});

app.post("/api/todo", (req, res) => {
  const { text, done } = req.body;
  console.log("req.body.text: " + text);
  todoList.push({
    id: id++,
    text,
    done,
  });
  return res.send("success");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
