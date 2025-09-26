import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Gift } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const isMobile =
  typeof window !== "undefined" ? window.innerWidth < 768 : false;

const LandingPage = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleOpenCard = () => {
    setIsAnimating(true);

    // Trigger confetti immediately
    const duration = 1200;
    const particleCount = isMobile ? 6 : 12;
    const intervalTime = isMobile ? 200 : 100;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      confetti({
        startVelocity: 25,
        spread: 360,
        ticks: 60,
        zIndex: 9999,
        colors: ["#ff69b4", "#ffffff", "#ffd1dc"],
        particleCount,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
      });
    }, intervalTime);

    // Navigate after animation
    setTimeout(() => navigate("/birthday-wish"), duration);
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative z-10">
      <motion.div
        className="flex flex-col items-center gap-8 p-12 bg-black/30 backdrop-blur-sm rounded-3xl shadow-lg border border-pink-500/30"
        initial={{ scale: 1, opacity: 1, rotate: 0 }}
        animate={isAnimating ? { scale: 0, opacity: 0, rotate: 180 } : {}}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Gift className="h-16 w-16 text-pink-400 animate-pulse-gentle" />
        <h1 className="text-4xl font-script text-center text-white">
          Hey Zareen 🎉
        </h1>
        <p className="text-center text-gray-300/80 font-sans animate-pulse-glow">
          This one's for you - click to find out why.
        </p>

        <Button
          onClick={handleOpenCard}
          disabled={isAnimating}
          className={`${
            isAnimating ? "opacity-60 cursor-not-allowed" : ""
          } bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg rounded-3xl`}
        >
          Open Your Birthday Wish
        </Button>
      </motion.div>
    </div>
  );
};

export default LandingPage;
