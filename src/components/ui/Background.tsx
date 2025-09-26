import { motion } from "framer-motion";

const isMobile =
  typeof window !== "undefined" ? window.innerWidth < 768 : false;

export const CircleGlow = ({
  delay,
  size,
  x,
  y,
  color,
}: {
  delay: number;
  size: string;
  x: string;
  y: string;
  color: string;
}) => (
  <motion.div
    className={`absolute rounded-full ${isMobile ? "blur-xl" : "blur-3xl"}`}
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      backgroundColor: color,
      opacity: 0.35,
    }}
    animate={{
      opacity: isMobile ? [0, 0.6, 0] : [0, 0.8, 0],
      scale: isMobile ? [1] : [0.8, 1.2, 0.8],
    }}
    transition={{
      duration: 4 + Math.random() * 2,
      repeat: isMobile ? 1 : Infinity,
      delay,
    }}
  />
);

export const Sparkle = ({
  x,
  y,
  delay,
}: {
  x: number;
  y: number;
  delay: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-yellow-300 blur-sm"
    style={{
      width: `${Math.random() * 6 + 2}px`,
      height: `${Math.random() * 6 + 2}px`,
      top: `${y}%`,
      left: `${x}%`,
    }}
    animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
    transition={{
      duration: 2 + Math.random() * 2,
      repeat: isMobile ? 1 : Infinity,
      delay,
    }}
  />
);
