const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use your email provider
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: '"Journal App" <journalify@gmail.com>', // Sender address
    to,
    subject,
    text,
    html, // Optionally send HTML content
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email.");
  }
};

module.exports = sendEmail;
