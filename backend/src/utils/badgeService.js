const Badge = require("../models/Badge");
const { BADGE_CONDITIONS } = require("./badgeConditions");

const ensureBadgesSeeded = async () => {
  for (const condition of BADGE_CONDITIONS) {
    await Badge.updateOne({ key: condition.key }, { $set: condition }, { upsert: true });
  }
};

const getEarnedBadgeKeys = ({ totalSolved, streak, totalPoints }) => {
  return BADGE_CONDITIONS.filter((badge) => {
    if (badge.requirementType === "totalSolved") return totalSolved >= badge.threshold;
    if (badge.requirementType === "streak") return streak >= badge.threshold;
    if (badge.requirementType === "totalPoints") return totalPoints >= badge.threshold;
    return false;
  }).map((badge) => badge.key);
};

module.exports = {
  ensureBadgesSeeded,
  getEarnedBadgeKeys,
};
