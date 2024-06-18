const todoService = require("../services/todo.service");
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "demo",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("You are now connected with mysql database...");
});

const create = (req, res) => {
  if (!req.body.description) {
    return res.status(400).send({
      message: "Todo description can not be empty",
    });
  }
  var params = req.body;
  console.log(params);

  connection.query(
    "INSERT INTO todos SET ? ",
    params,
    function (error, results, fields) {
      if (error) throw error;
      return res.send({
        data: results,
        message: "New todo has been created successfully.",
      });
    }
  );
};

const findAll = (req, res) => {
  connection.query("select * from todos", (error, results, fields) => {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
};

const findOne = (req, res) => {
  const id = req.params.id;
  connection.query(
    `select * from todos where id = ${id}`,
    (error, results, fields) => {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
};

const update = (req, res) => {
  // Validate Request

  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  if (!description || !name) {
    return res.status(400).send({
      message: "name or description cannot be empty",
    });
  }
  console.log(id);
  console.log(name);
  console.log(description);
  connection.query(
    "UPDATE `todos` SET `name`=?,`description`=? where `id`=?",
    [name, description, id],
    function (error, results, fields) {
      if (error) throw error;
      res.end(JSON.stringify(results));
    }
  );
};

const deleteOne = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  connection.query(
    "DELETE FROM `todos` WHERE `Id`=?",
    [id],
    function (error, results, fields) {
      if (error) throw error;
      res.end("Record has been deleted!");
    }
  );
};

module.exports = { create, findAll, findOne, update, deleteOne };
ter