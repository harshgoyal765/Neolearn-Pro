import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // using Gmail
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: to,
      subject: "Reset Your Password",
      html: `<p>Your OTP for resetting your password is <b>${otp}</b>. It expires in 5 minutes.</p>`,
    });
    console.log("Mail sent successfully to", to);
  } catch (error) {
    console.error("Error sending mail:", error);
    throw error;
  }
};

export default sendMail;
