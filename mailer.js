const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID =
  "1060158030640-dmjq31v6ka09pnkpdrfc96u8t3aqra1k.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04A1Hf5oOPcWeCgYIARAAGAQSNwF-L9IrFYRkN_T4fTssO53fkQn47VgJtuaQD0uEvoTCkfNAVB160ylGaX_7g3Zq1MJXhd89anI";

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
      to: "sanskrutisharma2002@gmail.com",
      subject: subject,
      text: text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Test sending an email
sendMail(
  "receiver-email@example.com",
  "Test Email",
  "Hello, this is a test email!"
);
