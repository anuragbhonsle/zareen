import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BirthdayWish from "./pages/BirthdayWish";
import NotFound from "./pages/NotFound";
import { CircleGlow, Sparkle } from "./components/ui/Background";
import React, { useState, useEffect } from "react";

const isMobile =
  typeof window !== "undefined" ? window.innerWidth < 768 : false;

const App = () => {
  const glowCount = isMobile ? 6 : 12;
  const sparkleCount = isMobile ? 10 : 30;

  const [glows] = React.useState(() =>
    Array.from({ length: glowCount }).map(() => ({
      size: `${Math.random() * 250 + 120}px`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      color: ["#ff69b4", "#ffffff", "#ffd1dc"][Math.floor(Math.random() * 3)],
      delay: Math.random() * 5,
    }))
  );

  const [sparkles] = React.useState(() =>
    Array.from({ length: sparkleCount }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }))
  );

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Persistent background */}
      {glows.map((glow, i) => (
        <CircleGlow key={i} {...glow} />
      ))}
      {sparkles.map((spark, i) => (
        <Sparkle key={i} {...spark} />
      ))}

      {/* Pages */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/birthday-wish" element={<BirthdayWish />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
