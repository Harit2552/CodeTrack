
const cron              = require('node-cron')
const { isUserInactive } = require('../utils/inactivityChecker')
const { sendReminderEmail } = require('../utils/emailSender')
// Import User model (handle case-sensitive file systems)
let User
try {
  User = require('../models/User')
} catch {
  User = require('../models/user')
}

/**
 * Runs every day at 08:00 AM (server local time).
 * Finds all users with reminders enabled who haven't been
 * active in the last 24 hours and sends them a nudge email.
 */
function startReminderJob() {
  // Schedule cron job (runs at 08:00 AM every day)
  cron.schedule('0 8 * * *', async () => {
    console.log('[ReminderJob] â° Running at', new Date().toISOString())

    let users = []
    try {
      users = await User.find({ reminderEnabled: true })
        .select('name email lastActive currentStreak totalSolved')
        .lean()
    } catch (err) {
      console.error('[ReminderJob] âŒ DB query failed:', err.message)
      return
    }

    if (users.length === 0) {
      console.log('[ReminderJob] ðŸ“­ No users with reminders enabled.')
      return
    }

    let sent = 0, skipped = 0, failed = 0

    for (const user of users) {
      if (!isUserInactive(user)) {
        skipped++
        continue
      }

      try {
        await sendReminderEmail({
          name:   user.name,
          email:  user.email,
          streak: user.currentStreak  || 0,
          solved: user.totalSolved    || 0,
        })
        sent++
        console.log(`[ReminderJob] âœ… Email sent â†’ ${user.email}`)
      } catch (err) {
        failed++
        console.error(`[ReminderJob] âŒ Failed for ${user.email}:`, err.message)
      }
    }

    console.log(
      `[ReminderJob] Done â€” sent: ${sent}, skipped (active): ${skipped}, failed: ${failed}`
    )
  }, {
    timezone: 'Asia/Kolkata', // change to your timezone
  })

  console.log('[ReminderJob] ðŸŸ¢ Scheduled â€” runs daily at 08:00 AM IST')
}

module.exports = { startReminderJob }
