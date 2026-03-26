const express = require("express");
const { createProblem } = require("../controllers/problemController");

const router = express.Router();

router.post("/", createProblem);

module.exports = router;
