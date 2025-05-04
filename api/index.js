const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// list all exams
app.get("/api/exams", (req, res) => {
  const examsPath = path.join(__dirname, "../data");
  const exams = fs.readdirSync(examsPath)
                  .filter(f => fs.statSync(path.join(examsPath, f)).isDirectory());
  res.json(exams);
});

// list categories under an exam
app.get("/api/subjects/:exam/:category", (req, res) => {
  const { exam, category } = req.params;
  const dir = path.join(__dirname, `../data/${exam}/${category}`);
  if (!fs.existsSync(dir)) return res.status(404).json({ error: "Category not found" });
  const subjects = fs.readdirSync(dir).map(f => f.replace(".json", ""));
  res.json(subjects);
});

// list questions under a subject
app.get("/api/questions/:exam/:category/:subject", (req, res) => {
  const { exam, category, subject } = req.params;
  const file = path.join(__dirname, `../data/${exam}/${category}/${subject}.json`);
  if (!fs.existsSync(file)) return res.status(404).json({ error: "Subject not found" });
  const data = JSON.parse(fs.readFileSync(file, "utf-8"));
  res.json(data);
});

module.exports = app;
