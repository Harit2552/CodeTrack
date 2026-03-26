const express = require("express");
const {
	createProblem,
	getProblems,
	updateProblem,
} = require("../controllers/problemController");

const router = express.Router();

router.get("/", getProblems);
router.post("/", createProblem);
router.put("/:id", updateProblem);

module.exports = router;
