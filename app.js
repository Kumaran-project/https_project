const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
const app = express();
const cors = require("cors");

//middleWare
app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

let complaintInfo = {};

//route
app.post("/api/complaints", (req, res) => {
  let { name, email, subject, description } = req.body;

  complaintInfo = req.body;

  console.log(name, email, subject, description);
  res.status(201).json(complaintInfo);
});

app.get("/api/complaints", (req, res) => {
  res.status(200).json(complaintInfo);
});

const privateKey = fs.readFileSync(
  path.join(__dirname, "cert", "server.key"),
  "utf8"
);
const certificate = fs.readFileSync(
  path.join(__dirname, "cert", "server.crt"),
  "utf8"
);
const credentials = { key: privateKey, cert: certificate };

https.createServer(credentials, app).listen(3000, () => {
  console.log("Secure server running at https://localhost:3000");
});
