const BADGE_CONDITIONS = [
  {
    key: "first_solve",
    name: "First Solve",
    description: "Solve your first coding problem",
    icon: "✅",
    requirementType: "totalSolved",
    threshold: 1,
  },
  {
    key: "ten_solved",
    name: "10 Problems Solved",
    description: "Solve 10 coding problems",
    icon: "🏅",
    requirementType: "totalSolved",
    threshold: 10,
  },
  {
    key: "streak_3",
    name: "3-Day Streak",
    description: "Maintain a 3-day solving streak",
    icon: "🔥",
    requirementType: "streak",
    threshold: 3,
  },
  {
    key: "points_100",
    name: "100 Points",
    description: "Earn 100 points in total",
    icon: "⭐",
    requirementType: "totalPoints",
    threshold: 100,
  },
];

module.exports = { BADGE_CONDITIONS };
