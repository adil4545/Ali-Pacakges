import { useState } from "react";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import CustomLink from "../UI/Link";
import { useForgetPasswordMutation } from "../../api/Loginapi";

function ForgetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      // 🔹 Save email in localStorage
      localStorage.setItem("resetEmail", email);

      const res = await forgetPassword({ email }).unwrap();

      setMessage(res.message || "OTP sent to your email!");
      // Redirect to new password page
      navigate("/new-password-set");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.data?.message || "Failed to send reset link!");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl text-black mb-3 font-bold">Forgot Password</h2>
        <h4 className="text-lg font-semibold mb-4 text-gray-800">
          Let us help you
        </h4>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <span className="text-red-500">*</span> Enter your registered
              email address.
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button disabled={isLoading}>
            {isLoading ? "Sending..." : "Reset My Password"}
          </Button>
        </form>

        {message && (
          <p className="text-green-600 mt-4 font-medium">{message}</p>
        )}
        {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}

        <div className="text-center mt-6">
          <CustomLink to="/">Back To Login?</CustomLink>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
