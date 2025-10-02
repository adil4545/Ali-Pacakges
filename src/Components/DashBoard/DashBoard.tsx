/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBoxOpen,
  FaUsers,
  FaFileInvoice,
  FaRegCreditCard,
  FaUser,
  FaUsers as FaUsersGroup,
  FaBox,
} from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";

function Dashboard() {
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(false);

  // 🎉 Confetti system
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const confetti = useRef<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sequins = useRef<any[]>([]);
  let ctx: CanvasRenderingContext2D | null;

  const confettiCount = 25;
  const sequinCount = 12;
  const gravityConfetti = 0.3;
  const gravitySequins = 0.55;
  const dragConfetti = 0.075;
  const dragSequins = 0.02;
  const terminalVelocity = 3;
  const colors = [
    { front: "#7b5cff", back: "#6245e0" },
    { front: "#b3c7ff", back: "#8fa5e5" },
    { front: "#5c86ff", back: "#345dd1" },
    { front: "#00c851", back: "#007e33" },
  ];

  const randomRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

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
    constructor(x: number, y: number) {
      this.color = colors[Math.floor(randomRange(0, colors.length))];
      this.dimensions = { x: randomRange(5, 9), y: randomRange(8, 15) };
      this.position = { x, y };
      this.rotation = randomRange(0, 2 * Math.PI);
      this.scale = { x: 1, y: 1 };
      this.velocity = { x: randomRange(-9, 9), y: -randomRange(6, 11) };
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
    constructor(x: number, y: number) {
      this.color = colors[Math.floor(randomRange(0, colors.length))].back;
      this.radius = randomRange(1, 2);
      this.position = { x, y };
      this.velocity = { x: randomRange(-6, 6), y: randomRange(-8, -12) };
    }
    update() {
      this.velocity.x -= this.velocity.x * dragSequins;
      this.velocity.y += gravitySequins;
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  const initBurst = () => {
    const x = window.innerWidth / 2;
    const y = 100; // 🎯 Alert ke niche se
    for (let i = 0; i < confettiCount; i++)
      confetti.current.push(new Confetto(x, y));
    for (let i = 0; i < sequinCount; i++)
      sequins.current.push(new Sequin(x, y));
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

  useEffect(() => {
    if (location.state?.loginSuccess) {
      setShowAlert(true);
      initBurst(); // 🎉 Confetti jab login success
      window.history.replaceState({}, document.title);
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const items = [
    {
      name: "Products",
      icon: <FaBoxOpen size={55} />,
      color: "from-blue-400 to-blue-600 text-white",
      link: "/admin/products",
    },
    {
      name: "Parties",
      icon: <FaUsers size={55} />,
      color: "from-green-400 to-green-600 text-white",
      link: "/admin/parties",
    },
    {
      name: "Sales Tax Invoice",
      icon: <FaFileInvoice size={55} />,
      color: "from-purple-400 to-purple-600 text-white",
      link: "/admin/sales-tax-invoice",
    },
    {
      name: "Credit Note",
      icon: <FaRegCreditCard size={55} />,
      color: "from-red-400 to-red-600 text-white",
      link: "/admin/credit-note",
    },
    {
      name: "Single Party Report",
      icon: <FaUser size={55} />,
      color: "from-orange-400 to-orange-600 text-white",
      link: "/admin/single-party",
    },
    {
      name: "All Party Report",
      icon: <FaUsersGroup size={55} />,
      color: "from-teal-400 to-teal-600 text-white",
      link: "/admin/all-party",
    },
    {
      name: "Product Report",
      icon: <FaBox size={55} />,
      color: "from-pink-400 to-pink-600 text-white",
      link: "/admin/product-report",
    },
    {
      name: "Support",
      icon: <MdSupportAgent size={55} />,
      color: "from-yellow-400 to-yellow-600 text-white",
      link: "https://deazitech.com/contact-us-deazitech/",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center bg-gray-50 py-6 min-h-screen relative">
      {/* Success Alert + Confetti */}
      {showAlert && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 
               bg-white text-gray-800 
               flex items-center gap-2 
               px-4 py-2 shadow-md z-50
               rounded-full text-sm"
        >
          <div className="w-4 h-4 flex items-center justify-center rounded-full bg-green-500">
            <span className="text-white text-xs">✔</span>
          </div>
          <span>Login successful!</span>
        </motion.div>
      )}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
      />

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="text-4xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent mb-20"
      >
        Welcome Ali Package
      </motion.h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-[95%] mb-6">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: index * 0.12,
              type: "spring",
              stiffness: 80,
              damping: 15,
            }}
          >
            <Link
              to={item.link}
              className="group flex flex-col h-44 rounded-2xl overflow-hidden shadow-lg 
                         bg-white relative transition-all duration-500
                         hover:shadow-2xl hover:shadow-blue-200"
            >
              {/* Icon Section */}
              <div
                className={`flex-1 flex justify-center items-center bg-gradient-to-r ${item.color}`}
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 3, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  whileTap={{ scale: 0.95 }}
                  className="drop-shadow-xl"
                >
                  {item.icon}
                </motion.div>
              </div>

              {/* Name Section */}
              <div className="h-[25%] flex justify-center items-center bg-white text-gray-800 font-semibold text-lg tracking-wide">
                {item.name}
              </div>

              {/* Shimmer effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition duration-500 
                              bg-gradient-to-r from-transparent via-white to-transparent animate-[shimmer_2s_infinite]"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
