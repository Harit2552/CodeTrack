
/**
 * Determines whether a user is considered "inactive" today.
 *
 * Rules:
 *  - No lastActive at all   â†’ inactive (never logged a problem)
 *  - Invalid date           â†’ inactive (treat as never logged)
 *  - lastActive is today    â†’ active   (already solved today)
 *  - lastActive < today     â†’ inactive (needs a nudge)
 *
 * @param {{ lastActive?: Date|string|null }} user
 * @returns {boolean} true = send a reminder
 */
function isUserInactive(user) {
  if (!user || !user.lastActive) return true

  const last = new Date(user.lastActive)

  if (isNaN(last.getTime())) return true

  const now   = new Date()

  const todayStr = toDateStr(now)
  const lastStr  = toDateStr(last)

  if (lastStr === todayStr) return false

  return true
}

/**
 * Returns 'YYYY-MM-DD' in local time for a given Date object.
 * @param {Date} date
 * @returns {string}
 */
function toDateStr(date) {
  return `${date.getFullYear()}-${
    String(date.getMonth() + 1).padStart(2, '0')}-${
    String(date.getDate()).padStart(2, '0')}`
}

module.exports = { isUserInactive, toDateStr }
