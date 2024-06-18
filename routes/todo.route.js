const express = require("express");
const route = express.Router();
const todos = require("../controllers/todo.controller.js");

// Create a new todo
route.post("/todos", todos.create);

// Retrieve all todos
route.get("/todos", todos.findAll);

// Retrieve a single todo by id
route.get("/todos/:id", todos.findOne);

// Update a Todo with id
route.patch("/todos/:id", todos.update);

// Delete a Todo by id
route.delete("/todos/:id", todos.deleteOne);

module.exports = route;
