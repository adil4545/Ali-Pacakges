import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Button from "../UI/Button";
import CustomLink from "../UI/Link";
import ConfettiCanvas from "../UI/ConfettiCanvas";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"ready" | "loading">("ready");
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement | null>(null); // 🎯 button ref

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    setDisabled(true);
    setStatus("loading");
    setError("");

    const users = [
      { email: "admin@gmail.com", password: "admin123", role: "admin" },
      {
        email: "superadmin@gmail.com",
        password: "super123",
        role: "superadmin",
      },
    ];

    setTimeout(() => {
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        localStorage.setItem("userEmail", foundUser.email);
        localStorage.setItem("userPassword", foundUser.password);
        setConfettiTrigger(true);

        setTimeout(() => {
          if (foundUser.role === "admin") {
            navigate("/admin/dashboard", { state: { loginSuccess: true } });
          } else if (foundUser.role === "superadmin") {
            navigate("/super-admin/dashboard", {
              state: { loginSuccess: true },
            });
          }
          setStatus("ready");
          setDisabled(false);
          setConfettiTrigger(false);
        }, 1500);
      } else {
        setError("Invalid email or password");
        setStatus("ready");
        setDisabled(false);
      }
    }, 1500);
  };

  return (
    <div className="bg-[#69899F] min-h-screen flex justify-center items-center">
      <div className="flex gap-10 w-[90%] max-w-5xl">
        {/* Left Side Form */}
        <div className="flex-1 bg-white rounded-lg shadow-lg flex flex-col justify-center items-center px-9 py-8 mr-20 h-[94vh]">
          <img
            src="/public/images/office.png"
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

            {/* Button + Confetti */}
            <div className="flex justify-center relative">
              <Button ref={buttonRef}>
                {status === "ready" && "Login"}
                {status === "loading" && "Loading..."}
              </Button>
              <ConfettiCanvas trigger={confettiTrigger} buttonRef={buttonRef} />
            </div>
          </form>
        </div>

        {/* Right Side */}
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
