import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

const isMobile =
  typeof window !== "undefined" ? window.innerWidth < 768 : false;

const BirthdayWish = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(0);

  const friendlyMessages = [
    `I wish your birthday sparkles with fun, laughter, and all the little joys that make life magical. May every moment today turn into a cherished memory! 🥳✨🎂`,

    `I wish this year brings you exciting adventures, beautiful surprises, and endless smiles. Keep being the amazing person you are and let your light shine everywhere! 🌟🎉💖`,

    `I wish your heart overflows with happiness today and always. May your dreams grow bigger, your laughter louder, and your days brighter than ever! 🎂🎈🌸`,

    `I wish today is as incredible as you are! Celebrate every moment, embrace the surprises, and enjoy a year full of love, fun, and unforgettable memories! 🎉💫🎁`,

    `I wish your journey ahead is filled with happiness, courage, and little moments that make life truly wonderful. Happy birthday and keep shining! 🥳🌷🎂`,
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const triggerConfetti = () => {
    const duration = 1000;
    const particleCount = isMobile ? 8 : 12;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(
      () => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 9999,
          colors: ["#ff69b4", "#ffffff", "#ffd1dc"],
          particleCount,
          origin: { x: Math.random(), y: Math.random() * 0.5 },
        });
      },
      isMobile ? 200 : 100
    );
  };

  const handleChangeMessage = () => {
    setSelectedMessage((prev) => (prev + 1) % friendlyMessages.length);
    triggerConfetti();
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 p-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: isMobile ? 0.9 : 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: isMobile ? 0.9 : 0.8, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card className="relative w-full max-w-2xl bg-black/30 backdrop-blur-sm shadow-xl border-2 border-pink-500/40 rounded-3xl">
              <CardContent className="pt-6 pb-8">
                <div className="absolute top-4 right-4 left-4 flex justify-between items-center">
                  <Gift className="h-5 w-5 text-pink-400 animate-pulse-gentle" />
                  <Button
                    onClick={handleChangeMessage}
                    variant="ghost"
                    className="text-sm text-pink-400 hover:text-pink-300 hover:bg-transparent"
                  >
                    Again!
                  </Button>
                </div>

                <div className="mt-8 mb-4 text-center">
                  <h1
                    style={{
                      fontFamily: "'Pacifico', cursive",
                      fontSize: "2.5rem",
                      color: "#f1eaeaff",
                      textAlign: "center",
                    }}
                  >
                    Happy Birthday, Zareen
                  </h1>
                </div>

                <div className="my-8 px-4 md:px-8 text-white leading-relaxed md:leading-loose min-h-[150px]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={selectedMessage}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      style={{
                        fontFamily: "'Pacifico', cursive",
                        fontSize: "1.2rem",
                        color: "#f1eaeaff",
                        lineHeight: 1.6,
                        textAlign: "center",
                      }}
                    >
                      {friendlyMessages[selectedMessage]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BirthdayWish;
