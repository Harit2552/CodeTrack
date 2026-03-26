const Problem = require("../models/Problem");
const User = require("../models/User");
const { getPointsForDifficulty } = require("../utils/progressCalculator");

const createProblem = async (req, res, next) => {
  try {
    const { title, platform, difficulty, status, tags, notes, solutionLink } = req.body;

    const problem = await Problem.create({
      user: req.user._id,
      title,
      platform,
      difficulty,
      status,
      tags,
      notes,
      solutionLink,
    });

    return res.status(201).json(problem);
  } catch (error) {
    next(error);
  }
};

const getProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ problems });
  } catch (error) {
    next(error);
  }
};

const updateProblem = async (req, res, next) => {
  try {
    const existingProblem = await Problem.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!existingProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    const wasSolved = existingProblem.status === "Solved";

    Object.assign(existingProblem, req.body);
    const problem = await existingProblem.save();

    const isSolved = problem.status === "Solved";
    if (!wasSolved && isSolved) {
      const points = getPointsForDifficulty(problem.difficulty);
      await User.findByIdAndUpdate(req.user._id, { $inc: { totalPoints: points } });
    }

    return res.status(200).json(problem);
  } catch (error) {
    next(error);
  }
};

const deleteProblem = async (req, res, next) => {
  try {
    const problem = await Problem.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    return res.status(200).json({ message: "Problem deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProblem,
  getProblems,
  updateProblem,
  deleteProblem,
};
