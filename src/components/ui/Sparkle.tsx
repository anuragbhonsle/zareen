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
        duration: 2 + Math.random() * 2, // each spark has a different duration
        repeat: Infinity,
        delay,
      }}
    />
  );
};

export default Sparkle;
