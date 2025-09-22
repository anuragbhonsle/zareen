import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Gift } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const Sparkle = ({ delay, size, x, y }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-yellow-300 blur-sm"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 2 + Math.random() * 2,
        repeat: Infinity,
        delay,
      }}
    />
  );
};

const Index = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleOpenCard = () => {
    setIsAnimating(true);

    const duration = 1200;
    const animationEnd = Date.now() + duration;

    const defaults = {
      startVelocity: 25,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
      colors: ["#ff69b4", "#ffffff", "#ffd1dc"],
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        ...defaults,
        particleCount: 15,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5, // top half
        },
      });
    }, 100);

    // Navigate to birthday card after animation
    setTimeout(() => {
      navigate("/birthday-wish");
    }, duration);
  };

  const sparkles = Array.from({ length: 30 });

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black p-4">
      {/* Sparkle background */}
      {sparkles.map((_, i) => (
        <Sparkle
          key={i}
          size={`${Math.random() * 6 + 2}px`} // 2–8px
          x={`${Math.random() * 100}%`}
          y={`${Math.random() * 100}%`}
          delay={Math.random() * 5}
        />
      ))}

      {/* Semi-transparent overlay for readability */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Card */}
      <div
        className={`transition-all duration-1000 transform relative z-10 ${
          isAnimating ? "scale-0 rotate-180 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="flex flex-col items-center gap-8 p-12 bg-black/70 rounded-xl shadow-lg border border-pink-500/20">
          <Gift className="h-16 w-16 text-pink-400 animate-pulse-gentle" />
          <h1 className="text-3xl font-bold text-center text-white">
            A Special Surprise
          </h1>
          <p className="text-center text-gray-300/80 animate-pulse-glow">
            This one's for you - click to find out why.
          </p>

          <Button
            onClick={handleOpenCard}
            disabled={isAnimating}
            className={`${
              isAnimating ? "opacity-60 cursor-not-allowed" : ""
            } bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg`}
          >
            Open Your Card
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
