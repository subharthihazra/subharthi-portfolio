require("dotenv").config();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: String(process.env.EMAIL_PROVIDER),
  auth: {
    user: String(process.env.EMAIL_ID), // replace with your Gmail email address
    pass: String(process.env.EMAIL_PASSWORD), // replace with your Gmail password or an App Password
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendEmail(name, message) {
  const mailOptions = {
    from: `<${String(process.env.EMAIL_ID)}>`, // replace with your Gmail email address
    to: "subharthi76@gmail.com",
    subject: "New DM Portfolio!",
    text: `Name: ${name}\nMessage: \n${message}`,
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      //   console.log("Email sent:", info.response);
    }
  });
}

module.exports = { sendEmail };
