/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Button from "../UI/Button";
import CustomLink from "../UI/Link";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"ready" | "loading">("ready");
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const confetti = useRef<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sequins = useRef<any[]>([]);
  let ctx: CanvasRenderingContext2D | null;

  // 🎉 Confetti constants
  const confettiCount = 20;
  const sequinCount = 10;
  const gravityConfetti = 0.3;
  const gravitySequins = 0.55;
  const dragConfetti = 0.075;
  const dragSequins = 0.02;
  const terminalVelocity = 3;
  const colors = [
    { front: "#7b5cff", back: "#6245e0" },
    { front: "#b3c7ff", back: "#8fa5e5" },
    { front: "#5c86ff", back: "#345dd1" },
  ];

  const randomRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  // 🎉 Confetti Burst Function
  const initBurst = () => {
    const button = document.querySelector("button[type='submit']");
    if (!button) return;
    const rect = button.getBoundingClientRect();

    class Confetto {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      color: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dimensions: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      position: any;
      rotation: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scale: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      velocity: any;
      randomModifier: number;
      constructor() {
        this.color = colors[Math.floor(randomRange(0, colors.length))];
        this.dimensions = { x: randomRange(5, 9), y: randomRange(8, 15) };
        this.position = {
          x: rect.left + randomRange(0, rect.width),
          y: rect.top + randomRange(0, rect.height),
        };
        this.rotation = randomRange(0, 2 * Math.PI);
        this.scale = { x: 1, y: 1 };
        this.velocity = { x: randomRange(-12, 12), y: randomRange(-12, -8) };
        this.randomModifier = randomRange(0, 99);
      }
      update() {
        this.velocity.x -= this.velocity.x * dragConfetti;
        this.velocity.y = Math.min(
          this.velocity.y + gravityConfetti,
          terminalVelocity
        );
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.scale.y = Math.cos((this.position.y + this.randomModifier) * 0.09);
      }
    }

    class Sequin {
      color: string;
      radius: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      position: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      velocity: any;
      constructor() {
        this.color = colors[Math.floor(randomRange(0, colors.length))].back;
        this.radius = randomRange(1, 2);
        this.position = {
          x: rect.left + randomRange(0, rect.width),
          y: rect.top + randomRange(0, rect.height),
        };
        this.velocity = { x: randomRange(-8, 8), y: randomRange(-10, -14) };
      }
      update() {
        this.velocity.x -= this.velocity.x * dragSequins;
        this.velocity.y += gravitySequins;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
      }
    }

    for (let i = 0; i < confettiCount; i++)
      confetti.current.push(new Confetto());
    for (let i = 0; i < sequinCount; i++) sequins.current.push(new Sequin());
  };

  const render = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    confetti.current.forEach((c, i) => {
      c.update();
      ctx!.fillStyle = c.scale.y > 0 ? c.color.front : c.color.back;
      ctx!.fillRect(
        c.position.x,
        c.position.y,
        c.dimensions.x * c.scale.x,
        c.dimensions.y * c.scale.y
      );
      if (c.position.y >= window.innerHeight) confetti.current.splice(i, 1);
    });

    sequins.current.forEach((s, i) => {
      s.update();
      ctx!.fillStyle = s.color;
      ctx!.beginPath();
      ctx!.arc(s.position.x, s.position.y, s.radius, 0, 2 * Math.PI);
      ctx!.fill();
      if (s.position.y >= window.innerHeight) sequins.current.splice(i, 1);
    });

    requestAnimationFrame(render);
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }, []);

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
        initBurst();

        setTimeout(() => {
          if (foundUser.role === "admin") {
            navigate("/admin/dashboard", {
              state: { loginSuccess: true },
            });
          } else if (foundUser.role === "superadmin") {
            navigate("/super-admin/dashboard", {
              state: { loginSuccess: true },
            });
          }
          setStatus("ready");
          setDisabled(false);
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
            {/* Email Input */}
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

            {/* Password Input */}
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

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            {/* Forgot Password */}
            <div className="text-right text-sm mb-4">
              <CustomLink to="/forget-password">Forgot Password?</CustomLink>
            </div>

            {/* Login Button */}
            <div className="flex justify-center relative">
              <Button>
                {status === "ready" && "Login"}
                {status === "loading" && "Loading..."}
              </Button>
              <canvas
                ref={canvasRef}
                className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
              />
            </div>
          </form>
        </div>

        {/* Right Side Illustration */}
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
