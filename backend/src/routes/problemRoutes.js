const express = require("express");
const { createProblem, getProblems } = require("../controllers/problemController");

const router = express.Router();

router.get("/", getProblems);
router.post("/", createProblem);

module.exports = router;
