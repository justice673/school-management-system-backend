const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user:process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ,
    },
  });

  let mailOptions = {
    from: `"Justice_MAIL" <$fongejustice918@gmail.com>`,
    to: email,
    subject: `Password Reset Code for ${email} is `,
    html: `
      <span>${otp}</span>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendEmail };