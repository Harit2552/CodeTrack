const mongoose = require("mongoose");

const userProblemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userProblemSchema.index({ user: 1, problem: 1 }, { unique: true });

module.exports = mongoose.model("UserProblem", userProblemSchema);
