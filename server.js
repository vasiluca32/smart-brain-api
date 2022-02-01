const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "database",
    database: "smart-brain",
  },
});

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/", (req, res) => {
//   db.select("*")
//     .from("users")
//     .then((data) => {
//       res.send(data);
//     });
// });

app.post("/signin", signin.handleSignin(db, bcrypt)); // functioneaza la fel ca si celelalte functii de mai jos

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
