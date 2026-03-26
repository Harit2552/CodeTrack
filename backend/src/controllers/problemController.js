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

module.exports = {
  createProblem,
};
