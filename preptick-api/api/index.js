const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Get list of exams (Govt Exams, Private Exams)
app.get("/api/exams", (req, res) => {
  const examsPath = path.join(__dirname, "../data");
  const exams = fs.readdirSync(examsPath).filter(f => fs.statSync(path.join(examsPath, f)).isDirectory());
  res.json(exams);
});

// Get categories/subjects under each exam
app.get("/api/subjects/:exam/:category", (req, res) => {
  const { exam, category } = req.params;
  const subjectsPath = path.join(__dirname, `../data/${exam}/${category}`);
  if (!fs.existsSync(subjectsPath)) {
    return res.status(404).json({ error: "Category not found" });
  }
  const subjects = fs.readdirSync(subjectsPath).map(file => file.replace(".json", ""));
  res.json(subjects);
});

// Get questions under a subject
app.get("/api/questions/:exam/:category/:subject", (req, res) => {
  const { exam, category, subject } = req.params;
  const filePath = path.join(__dirname, `../data/${exam}/${category}/${subject}.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Subject not found" });
  }
  const questions = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(questions);
});

module.exports = app;
