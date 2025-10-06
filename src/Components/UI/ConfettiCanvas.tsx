import { useEffect, useRef } from "react";

interface ConfettiCanvasProps {
  trigger: boolean;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const ConfettiCanvas: React.FC<ConfettiCanvasProps> = ({
  trigger,
  buttonRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const confetti = useRef<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sequins = useRef<any[]>([]);

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

  const initBurst = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const ctx = ctxRef.current;
    if (!ctx) return;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    confetti.current.forEach((c, i) => {
      c.update();
      ctx.fillStyle = c.scale.y > 0 ? c.color.front : c.color.back;
      ctx.fillRect(
        c.position.x,
        c.position.y,
        c.dimensions.x * c.scale.x,
        c.dimensions.y * c.scale.y
      );
      if (c.position.y >= window.innerHeight) confetti.current.splice(i, 1);
    });

    sequins.current.forEach((s, i) => {
      s.update();
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.position.x, s.position.y, s.radius, 0, 2 * Math.PI);
      ctx.fill();
      if (s.position.y >= window.innerHeight) sequins.current.splice(i, 1);
    });

    requestAnimationFrame(render);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctxRef.current = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (trigger) initBurst();
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default ConfettiCanvas;
