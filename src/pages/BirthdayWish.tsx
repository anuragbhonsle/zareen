import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Cake, Gift } from "lucide-react";
import confetti from "canvas-confetti"; // Import the confetti library

const BirthdayWish = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(0);

  const heartfeltMessages = [
    `There you are — another trip around the sun, and I just wanna say how lucky I feel to have crossed paths with you. Even from miles (or screens) away, your laugh somehow finds a way to brighten my darkest days, and the way your passion lights up when you talk about what you love? It's contagious in the best way. Today isn’t just a marker of time — it’s a celebration of all the ways you make life better just by being your amazing self. Happy birthday to one of my favorite humans. Sending all the love — Anurag.`,
    `You know what's truly magical? Not birthday candles or wishes, but the way you've stayed so brilliantly, unapologetically yourself for another year. I’ve had the privilege of watching you grow, stumble, and triumph — and through it all, your heart has been this steady, beautiful constant in my life. Today, I celebrate not just the day you were born, but the countless moments you’ve made brighter just by being you and sharing them with me. Happy birthday, my friend. From Anurag, with all my love.`,
    `Well, here we are — another year closer to that promise. Each birthday I get to celebrate with you feels like unwrapping a gift I get to keep forever. Your kindness, your inside jokes that only we share, the way you remember the smallest things... You’re one of the best parts of my life, even if we’re miles (or screens) apart. Your presence, even virtual, brings comfort, warmth, and genuine joy. Today is all about you, but getting to know you is my gift. Happy birthday, my friend. Always here for you, Anurag.`,
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(true);
    }, 500);
  }, []);

  const handleChangeMessage = () => {
    setSelectedMessage((prev) => (prev + 1) % heartfeltMessages.length);

    // Trigger confetti animation for 2 seconds when the button is clicked
    triggerConfetti();
  };

  const triggerConfetti = () => {
    const duration = 500; // 0.5 seconds duration
    const animationEnd = Date.now() + duration;

    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 50,
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
        particleCount: 10,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5, // top half of the screen
        },
      });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <Card
        className={`relative w-full max-w-2xl bg-black shadow-xl border-2 border-pink-500/30 ${
          isOpen ? "animate-card-open" : "opacity-0"
        }`}
      >
        <CardContent className="pt-6 pb-8">
          <div className="absolute top-4 right-4 left-4 flex justify-between items-center">
            <div className="flex space-x-1">
              <Heart className="h-5 w-5 text-pink-400 animate-float" />
              <Gift className="h-5 w-5 text-pink-400 animate-pulse-gentle" />
            </div>
            <Button
              onClick={handleChangeMessage}
              variant="ghost"
              className="text-sm text-pink-400 hover:text-pink-300 hover:bg-transparent"
            >
              New
            </Button>
          </div>

          <div className="mt-8 mb-4 text-center">
            <h1 className="text-3xl font-bold text-pink-500">
              Happy Birthday!
            </h1>
            <div className="mt-1 text-gray-300/70 text-sm">
              A special message for a special person
            </div>
          </div>

          <div className="my-8 px-4 md:px-8 text-white leading-relaxed">
            <p className="first-letter:text-2xl first-letter:font-bold first-letter:text-pink-400">
              {heartfeltMessages[selectedMessage]}
            </p>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center text-gray-300">
              <Heart className="h-4 w-4 mr-2 text-pink-400" />
              With all my love
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BirthdayWish;
