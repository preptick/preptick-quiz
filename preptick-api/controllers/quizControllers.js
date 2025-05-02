const fs = require("fs");
const path = require("path");

exports.getExams = (req, res) => {
  const examsPath = path.join(__dirname, "../data");
  const exams = fs.readdirSync(examsPath).filter(f => fs.statSync(path.join(examsPath, f)).isDirectory());
  res.json(exams);
};

exports.getSubjects = (req, res) => {
  const { exam, category } = req.params;
  const subjectsPath = path.join(__dirname, `../data/${exam}/${category}`);
  if (!fs.existsSync(subjectsPath)) {
    return res.status(404).json({ error: "Category not found" });
  }
  const subjects = fs.readdirSync(subjectsPath).map(file => file.replace(".json", ""));
  res.json(subjects);
};

exports.getQuestions = (req, res) => {
  const { exam, category, subject } = req.params;
  const filePath = path.join(__dirname, `../data/${exam}/${category}/${subject}.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Subject not found" });
  }
  const questions = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(questions);
};
