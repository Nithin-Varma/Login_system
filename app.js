const express=require('express');
const mysql = require("mysql");
const doenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");
const cookieParser = require("cookie-parser");

const app = express();

doenv.config({
    path: "./.env",
  });
const db = mysql.createConnection({
     host: process.env.DATABASE_HOST,
     user: process.env.DATABASE_USER,
     password: process.env.DATABASE_PASS,
     database: process.env.DATABASE,
    connectTimeout: 1000000000, // Set a longer timeout
    agent: {
      keepAlive: true,
      maxSockets: Infinity,
    },
});

console.log(typeof process.env.DATABASE_HOST);
console.log(typeof process.env.DATABASE_USER);
console.log(typeof process.env.DATABASE_PASS);
console.log(typeof process.env.DATABASE);

db.connect((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("MySQL Connection Success");
    }
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));


//console.log(__dirname);
const location = path.join(__dirname, "./public");
app.use(express.static(location));
app.set("view engine", "hbs");

const partialsPath = path.join(__dirname, "./views/partials");
hbs.registerPartials(partialsPath);

app.use("/", require("./routers/pages"));
app.use("/auth", require("./routers/auth"));

app.listen("5000", () => {
    console.log("Server Started ");
})