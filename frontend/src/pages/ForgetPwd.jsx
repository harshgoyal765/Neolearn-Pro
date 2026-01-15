import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword, sendOtp, verifyOtp } from "../services/api";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const ForgetPwd = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      const { data } = await sendOtp(email);
      toast.success(data.message || "OTP sent to your email!");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Enter the OTP");
      return;
    }
    try {
      setLoading(true);
      const { data } = await verifyOtp(email, otp);
      toast.success(data.message || "OTP verified!");
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      const { data } = await resetPassword(email, newPassword);
      toast.success(data.message || "Password reset successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-indigo-300 via-purple-200">
      <div className="bg-white shadow-lg p-8 rounded-lg w-[600px] ">
        {/* Step 1 */}
        {step === 1 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-xl font-bold mb-4 text-center">Forgot Your Password?</h2>
            <p className="text-gray-600 mb-4 text-sm text-center">
              Enter your email address
            </p>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-[#030d46] text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? <ClipLoader size={25} color="white" /> : "Send OTP"}
            </button>
            <p
              onClick={() => navigate("/login")}
              className="text-center text-blue-500 cursor-pointer mt-4"
            >
              Back to Login
            </p>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-xl font-bold mb-4 text-center">Enter OTP</h2>
            <p className="text-gray-600 mb-4 text-sm text-center">
              Please enter the 4-digit code sent to your email.
            </p>
            <input
              type="text"
              placeholder="Enter your OTP here"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-[#030d46] text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? <ClipLoader size={25} color="white" /> : "Verify OTP"}
            </button>
            <p
              onClick={() => navigate("/login")}
              className="text-center text-blue-500 cursor-pointer mt-4"
            >
              Back to Login
            </p>
          </form>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <form onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-xl font-bold mb-4 text-center">Reset Your Password</h2>
            <p className="text-gray-600 mb-4 text-sm text-center">
              Enter a new password below to regain access to your account.
            </p>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              required
            />
            <button
              onClick={handleResetPassword}
              className="w-full bg-[#030d46] text-white p-2 rounded"
              disabled={loading}
            >
              {loading ? <ClipLoader size={25} color="white" /> : "Reset Password"}
            </button>
            <p
              onClick={() => navigate("/login")}
              className="text-center text-blue-500 cursor-pointer mt-4"
            >
              Back to Login
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPwd;
