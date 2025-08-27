import User from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import sendMail from "../config/sendmail.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" }); 
    }
    if (!validator.isEmail(email)){
      return res.status(400).json({ message: "enter valid email" });
    }
      if (password.length<8){
      return res.status(400).json({ message: "enter valid strong password" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password:hashPassword,
      role
    });
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days convert in miliseconds
    });
    return res.status(201).json(user)
  } catch (err) {
    return res.status(500).json({message:`signup error ${err}`})
  }
}


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" })
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days convert in miliseconds
    });
    return res.status(200).json(user)
  } catch (err) {
     return res.status(500).json({message:`login error ${err}`})
  }
}


export const logOut = async (req, res) => {
  try {
    await res.clearCookie("token")
    return res.status(200).json({ message: "Logout successful" })
  }
  catch (err) {
    return res.status(500).json({ message: `logout error ${err}` })
  } 
}


export const sendOtp = async (req, res)=>{
  try {
    const { email } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000
    user.isOtpVerified = false;

    await user.save();
    await sendMail(email, otp);
    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    return res.status(500).json({ message: `Error sending OTP: ${error.message}` });
  }
} 


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
     const user = await User.findOne({ email })
    if (!user || user.resetOtp !== otp || user.otpExpires < Date.now() ){
      return res.status(404).json({ message: "Invalid otp" });
    }
    user.isOtpVerified = true
    user.resetOtp = undefined
    user.otpExpires = undefined
    
    await user.save();
     return res.status(200).json({ message: "OTP verified sucessfully" });
  }
  catch (error) {
     return res.status(500).json({ message: `Verify OTP Error : ${error.message}` });
  }
}


export const resetPassword = async (req, res) => {
  try {
    const { email,newPassword } = req.body;
    const user = await User.findOne({ email })
    if (!user ||  !user.isOtpVerified ){
      return res.status(404).json({ message: "OTP Verification is required" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashPassword
    user.isOtpVerified = false
    user.resetOtp = undefined
    user.otpExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "Reset Password Successfully" });
  }
  catch (error) {
     return res.status(500).json({ message: `reset pasword error: ${error.message}` });
  }
}


export const googleAuth = async (req, res) => {
  try {
    const { name, email, role } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      user = await User.create({
        name,
        email,
        role
      })
    }
      let token = await genToken(user._id);
      res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days convert in miliseconds
    });
    return res.status(200).json(user)
  }
  catch (error) {
      return res.status(500).json({ message: `google auth error: ${error.message}` });
  }
}