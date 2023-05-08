const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./Connection/connection");
const model = require("./Model/model");
const router = require("./Router/router");

dotenv.config();

const app = express();
const PORT = 8000 || process.env.port;

connectDB;
model;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

// app.get('/', (req, res) => {
//     res.send('Hello, world!');
//   });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
