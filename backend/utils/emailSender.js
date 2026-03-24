// ============================================================
// COMMIT 61 — Phase 1: Skeleton — backend/utils/emailSender.js
// ============================================================
// COMMIT 62 — Phase 2: Core Logic — backend/utils/emailSender.js
// ============================================================
// COMMIT 63 — Phase 3: Welcome email + Error handling — backend/utils/emailSender.js
// ============================================================

const nodemailer = require('nodemailer')

// ── Transporter ───────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// ── Verify on startup ────────────────────────────────────
;(async () => {
  try {
    await transporter.verify()
    console.log('[EmailSender] ✅ SMTP connection verified')
  } catch (err) {
    console.warn('[EmailSender] ⚠️  SMTP verify failed (check env vars):', err.message)
  }
})()

// ── Helper: themed HTML wrapper ─────────────────────────
function htmlWrap(title, body) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body        { margin:0; padding:0; background:#0f172a; font-family:Inter,sans-serif; color:#e2e8f0; }
    .container  { max-width:560px; margin:40px auto; background:#1e293b; border-radius:16px;
                  border:1px solid #334155; overflow:hidden; }
    .header     { background:linear-gradient(135deg,#1d4ed8,#0e7490); padding:32px 32px 24px; }
    .header h1  { margin:0; font-size:22px; color:#fff; }
    .header p   { margin:4px 0 0; color:#bfdbfe; font-size:13px; }
    .body       { padding:32px; }
    .stat-box   { display:inline-block; background:#0f172a; border:1px solid #334155;
                  border-radius:10px; padding:12px 20px; margin:6px; text-align:center; }
    .stat-val   { font-size:26px; font-weight:700; color:#60a5fa; }
    .stat-lbl   { font-size:11px; color:#94a3b8; margin-top:2px; }
    .btn        { display:inline-block; margin-top:24px; padding:12px 28px;
                  background:#2563eb; color:#fff; text-decoration:none;
                  border-radius:10px; font-weight:600; font-size:14px; }
    .footer     { text-align:center; color:#475569; font-size:11px; padding:20px;
                  border-top:1px solid #1e293b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>⚡ CodoTrack</h1>
      <p>${title}</p>
    </div>
    <div class="body">${body}</div>
    <div class="footer">You're receiving this because reminders are enabled.<br/>
      © ${new Date().getFullYear()} CodoTrack</div>
  </div>
</body>
</html>`
}

// ── sendReminderEmail ────────────────────────────────────
/**
 * @param {{ name, email, streak, solved }} options
 * @returns {{ success: boolean, messageId?: string }}
 */
async function sendReminderEmail({ name, email, streak, solved }) {
  const firstName = (name || 'Coder').split(' ')[0]
  const appUrl    = process.env.FRONTEND_URL || 'http://localhost:5173'

  const body = `
    <p>Hey <strong>${firstName}</strong> 👋,</p>
    <p>You haven't logged any problems yet today. Don't break your streak!</p>

    <div style="text-align:center;margin:24px 0;">
      <div class="stat-box">
        <div class="stat-val">${streak}🔥</div>
        <div class="stat-lbl">Current Streak</div>
      </div>
      <div class="stat-box">
        <div class="stat-val">${solved}</div>
        <div class="stat-lbl">Total Solved</div>
      </div>
    </div>

    <p>Even one problem a day keeps the streak alive. You've got this! 💪</p>
    <a href="${appUrl}/add-problem" class="btn">Log a Problem Now →</a>
  `

  try {
    const info = await transporter.sendMail({
      from:    `"CodoTrack" <${process.env.SMTP_USER}>`,
      to:      email,
      subject: `${firstName}, don't lose your ${streak}-day streak! 🔥`,
      html:    htmlWrap(`Don't lose your ${streak}-day streak!`, body),
    })
    return { success: true, messageId: info.messageId }
  } catch (err) {
    console.error(`[EmailSender] sendReminderEmail failed for ${email}:`, err.message)
    throw err
  }
}

// ── sendWelcomeEmail ─────────────────────────────────────
/**
 * @param {{ name, email }} options
 */
async function sendWelcomeEmail({ name, email }) {
  const firstName = (name || 'Coder').split(' ')[0]
  const appUrl    = process.env.FRONTEND_URL || 'http://localhost:5173'

  const body = `
    <p>Hey <strong>${firstName}</strong> 🎉,</p>
    <p>Welcome to <strong>CodoTrack</strong>! Your coding journey just got a whole lot better.</p>
    <p>Here's what you can do:</p>
    <ul style="color:#94a3b8;padding-left:20px;line-height:2;">
      <li>📝 Log problems from LeetCode, Codeforces and more</li>
      <li>📊 Track streaks and view progress charts</li>
      <li>🏆 Earn achievement badges as you improve</li>
      <li>🔔 Get daily reminders to stay consistent</li>
    </ul>
    <a href="${appUrl}/dashboard" class="btn">Go to Dashboard →</a>
  `

  try {
    const info = await transporter.sendMail({
      from:    `"CodoTrack" <${process.env.SMTP_USER}>`,
      to:      email,
      subject: `Welcome to CodoTrack, ${firstName}! 🚀`,
      html:    htmlWrap('Your coding tracker is ready!', body),
    })
    return { success: true, messageId: info.messageId }
  } catch (err) {
    console.error(`[EmailSender] sendWelcomeEmail failed for ${email}:`, err.message)
    throw err
  }
}

module.exports = { sendReminderEmail, sendWelcomeEmail }
