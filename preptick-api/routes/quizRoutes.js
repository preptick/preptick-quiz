const express = require("express");
const router = express.Router();
const { getExams, getSubjects, getQuestions } = require("../controllers/quizController");

router.get("/exams", getExams);
router.get("/subjects/:exam/:category", getSubjects);
router.get("/questions/:exam/:category/:subject", getQuestions);

module.exports = router;
