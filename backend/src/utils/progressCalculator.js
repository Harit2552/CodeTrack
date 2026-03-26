const getPointsForDifficulty = (difficulty) => {
  if (difficulty === "Hard") return 30;
  if (difficulty === "Medium") return 20;
  return 10;
};

module.exports = {
  getPointsForDifficulty,
};
