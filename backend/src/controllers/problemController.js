const Problem = require("../models/Problem");

const createProblem = async (req, res, next) => {
  try {
    const { title, platform, status, notes, solutionLink } = req.body;

    const problem = await Problem.create({
      title,
      platform,
      status,
      notes,
      solutionLink,
    });

    return res.status(201).json(problem);
  } catch (error) {
    next(error);
  }
};

const getProblems = async (_req, res, next) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 });
    return res.status(200).json({ problems });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProblem,
  getProblems,
};
