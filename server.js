require("dotenv").config();
const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;
const EMAIL_TO = process.env.EMAIL_TO || "rreddykumar310@gmail.com";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

app.post("/api/send-result", async (req, res) => {
  const { yourName, yourGender, crushName, crushGender, score } = req.body || {};

  if (!yourName || !yourGender || !crushName || !crushGender || !Number.isInteger(score)) {
    return res.status(400).json({ success: false, error: "Missing or invalid form data." });
  }

  if (score < 80 || score > 100) {
    return res.status(400).json({ success: false, error: "Invalid score." });
  }

  const transporter = createTransporter();
  if (!transporter) {
    return res.status(503).json({
      success: false,
      error: "SMTP is not configured. Add SMTP_HOST, SMTP_USER and SMTP_PASS."
    });
  }

  const html = `
    <h2>New Love Calculator Submission</h2>
    <table cellpadding="8" cellspacing="0" border="1">
      <tr><td><strong>Your Name</strong></td><td>${escapeHtml(yourName)}</td></tr>
      <tr><td><strong>Your Gender</strong></td><td>${escapeHtml(yourGender)}</td></tr>
      <tr><td><strong>Crush's Name</strong></td><td>${escapeHtml(crushName)}</td></tr>
      <tr><td><strong>Crush's Gender</strong></td><td>${escapeHtml(crushGender)}</td></tr>
      <tr><td><strong>Love Compatibility</strong></td><td>${score}%</td></tr>
      <tr><td><strong>Submitted At</strong></td><td>${new Date().toISOString()}</td></tr>
    </table>
  `;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: EMAIL_TO,
      subject: `Love Calculator: ${yourName} + ${crushName} = ${score}%`,
      html
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Email send failed:", error);
    return res.status(500).json({ success: false, error: "Email sending failed." });
  }
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Love Calculator running on http://localhost:${PORT}`);
});
