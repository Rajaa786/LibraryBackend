const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
require("dotenv").config();
const app = express();
// app.use(cors());

const port = process.env.PORT;

const knex = require("./database/db.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.post("/addNewStudent", (req, res) => {
  knex("students")
    .insert({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    })
    .then(() => {
      res.send("Student Added!");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/addNewBook", (req, res) => {
  knex("books")
    .insert({
      book_name: req.body.book_name,
      author_name: req.body.author,
      borrowed_by: req.body.borrowed_by,
      borrowed_date: req.body.borrowed_date,
      expected_return_date: req.body.return_date,
    })
    .then(() => {
      res.send("Book Added!");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put("/updateStudent/:id", (req, res) => {
  knex("students")
    .where("id", req.params.id)
    .update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    })
    .then(() => {
      res.send("Updated Successfully!");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.put("/updateBook/:id", (req, res) => {
  knex("books")
    .where("id", req.params.id)
    .update({
      book_name: req.body.first_name,
      author_name: req.body.author,
      borrowed_by: req.body.borrowed_by,
      borrowed_date: req.body.borrowed_date,
      expected_return_date: req.body.return_date,
    })
    .then(() => {
      res.send("Updated Successfully!");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/getStudents", (req, res) => {
  knex
    .select()
    .from("students")
    .then((result) => res.send(result));
});

app.get("/getBooks", (req, res) => {
  knex
    .select()
    .from("books")
    .then((result) => res.send(result));
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}/`);
});
