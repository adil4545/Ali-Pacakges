import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useLoginMutation } from "../../api/Loginapi";

import Button from "../UI/Button";
import CustomLink from "../UI/Link";
import ConfettiCanvas from "../UI/ConfettiCanvas";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"ready" | "loading">("ready");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // --- RTK Query mutation hook ---
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      const result = await login({
        email: trimmedEmail,
        password: trimmedPassword,
      }).unwrap();

      console.log("🟩 Login response:", result);

      const access_token = result?.data;

      if (!access_token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("access_token", access_token);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let decodedToken: any = {};
      try {
        decodedToken = JSON.parse(atob(access_token.split(".")[1]));
      } catch {
        console.warn("⚠️ Token not valid JWT, skipping decode");
      }

      const userRole = decodedToken?.role || result?.user?.role || "patient";

      localStorage.setItem(
        "user",
        JSON.stringify({ email, role: userRole, access_token })
      );

      setConfettiTrigger(true);

      setTimeout(() => {
        navigate(`/${userRole}/dashboard`);
        setStatus("ready");
        setConfettiTrigger(false);
      }, 1500);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(
        err?.data?.message || err.message || "Invalid email or password"
      );
      alert(err?.data?.message || "Login failed");
      setStatus("ready");
    }
  };

  return (
    <div className="bg-[#69899F] min-h-screen flex justify-center items-center">
      <div className="flex gap-10 w-[90%] max-w-5xl">
        {/* LEFT SIDE */}
        <div className="flex-1 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center px-9 py-8 mr-20 h-[94vh]">
          <img
            src="/images/office.png"
            alt="Company Logo"
            className="h-24 w-auto mb-4"
          />
          <p className="text-sm text-gray-600 mb-6">AUTOMATE YOUR BUSINESS</p>
          <h2 className="text-2xl font-bold mb-6">Sign In Your Account</h2>

          <form className="w-full" onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                <span className="text-red-500">*</span> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@gmail.com"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">
                <span className="text-red-500">*</span> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <AiFillEye size={20} />
                  ) : (
                    <AiFillEyeInvisible size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            {/* Forgot Password */}
            <div className="text-right text-sm mb-4">
              <CustomLink to="/forget-password">Forgot Password?</CustomLink>
            </div>

            {/* Submit */}
            <div className="flex justify-center relative">
              <Button ref={buttonRef} disabled={isLoading}>
                {status === "ready" && (isLoading ? "Loading..." : "Login")}
                {status === "loading" && "Loading..."}
              </Button>
              <ConfettiCanvas trigger={confettiTrigger} buttonRef={buttonRef} />
            </div>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex justify-center items-center p-6">
          <img
            src="/images/loginLogo.png"
            alt="Login Illustration"
            className="h-[70vh] object-contain w-[120%]"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
