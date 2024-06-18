const express = require("express");
const bodyParser = require("body-parser");
const api = require("./routes/todo.route");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.use("/api",api)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Todo app" });
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
