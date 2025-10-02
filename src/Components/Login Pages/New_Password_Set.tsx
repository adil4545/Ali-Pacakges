import React, { useState } from "react";
import Button from "../UI/Button";
import CustomLink from "../UI/Link";
const New_Password_Set: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("OTP:", otp, "Password:", password);
    // TODO: API call for password reset
  };
  return (
    <>
      {" "}
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {" "}
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          {" "}
          <h2 className="text-center text-2xl font-semibold mb-2">
            Verification
          </h2>{" "}
          <p className="text-center text-gray-600 mb-6">
            Enter the OTP and reset your account password{" "}
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* OTP */}
            <div>
              <label className="block text-sm font-medium mb-1">
                <span className="text-red-500">*</span> OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                <span className="text-red-500">*</span> New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                <span className="text-red-500">*</span> Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <CustomLink to="/">Back To Login?</CustomLink>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center items-center">
              <Button className="">Submit</Button>
            </div>
          </form>
        </div>
      </div>
      ```
    </>
  );
};

export default New_Password_Set;
