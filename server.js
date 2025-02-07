const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const cors = require("cors"); // Allow frontend to access the backend
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// OAuth2 Credentials
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(to, subject, text) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "testingacc.yogesh0106@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: '"Yogesh Gupta" <testingacc.yogesh0106@gmail.com>',
      to: to, // Use dynamic recipient email
      subject: subject,
      text: text,
    };

    const result = await transporter.sendMail(mailOptions);
    return result.response;
  } catch (error) {
    throw error;
  }
}

// 📌 API Endpoint to Send Email
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const response = await sendMail(to, subject, text);
    res.status(200).json({ message: "Email sent successfully!", response });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error sending email", details: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
