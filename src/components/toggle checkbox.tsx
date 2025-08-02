"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const initialTheme = storedTheme || "light";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-28 h-16 rounded-full overflow-hidden transition-colors duration-700 p-2 flex items-center justify-between cursor-pointer ${
        theme === "light" ? "bg-blue-300" : "bg-indigo-900"
      }`}
    >
      {/* Background: Stars or Clouds */}
      <AnimatePresence mode="wait">
        {theme === "dark" ? (
          <motion.div
            key="stars"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <StarsSVG />
          </motion.div>
        ) : (
          <motion.div
            key="clouds"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <CloudsSVG />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Knob */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute z-1 top-1 left-1 ${
          theme === "dark" ? "translate-x-[calc(100%-0.5rem)]" : "translate-x-0"
        } transition-transform duration-500`}
      >
        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center relative z-10 shadow-lg backdrop-blur-md overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              whileHover={{ scale: 1.15 }}
              key={theme}
              initial={{ y: "100%", scale: 0 }}
              exit={{ y: "100%", scale: 0 }}
              animate={{ y: 1, scale: 1 }}
            >
              {theme === "light" ? <SunIcon /> : <MoonIcon />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </button>
  );
};

// ☀️ Sun SVG
const SunIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="5" fill="#facc15" />
    {[...Array(8)].map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const x1 = 12 + Math.cos(angle) * 8;
      const y1 = 12 + Math.sin(angle) * 8;
      const x2 = 12 + Math.cos(angle) * 10;
      const y2 = 12 + Math.sin(angle) * 10;
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#fde68a"
          strokeWidth="2"
          strokeLinecap="round"
        />
      );
    })}
  </svg>
);

// 🌙 Moon SVG
const MoonIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 12.79A9 9 0 0111.21 3a7 7 0 100 18A9 9 0 0021 12.79z"
      fill="#e5e7eb"
    />
    {/* Craters */}
    <circle cx="9" cy="8" r="0.8" fill="#9ca3af" />
    <circle cx="8" cy="13" r="1.2" fill="#9ca3af" />
    <circle cx="13" cy="16" r="0.7" fill="#9ca3af" />
  </svg>
);

// 🌟 Stars SVG

export const StarsSVG = () => {
  const stars = useMemo(() => {
    const cols = 6; // number of columns
    const rows = 4; // number of rows
    const spacingX = 112 / cols;
    const spacingY = 64 / rows;

    const starsArr = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const offsetX = (Math.random() - 0.5) * spacingX * 0.6; // max ±30% offset
        const offsetY = (Math.random() - 0.5) * spacingY * 0.6;

        const cx = col * spacingX + spacingX / 2 + offsetX;
        const cy = row * spacingY + spacingY / 2 + offsetY;
        const r = Math.random() * 1.2 + 0.4;

        starsArr.push({ cx, cy, r });
      }
    }

    return starsArr;
  }, []);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 112 64"
      preserveAspectRatio="xMidYMid slice"
    >
      {stars.map((star, i) => (
        <circle
          key={i}
          cx={star.cx}
          cy={star.cy}
          r={star.r}
          fill="white"
          opacity="0.7"
        />
      ))}
    </svg>
  );
};

// ☁️ Clouds SVG
const CloudsSVG = () => (
  <svg width="100%" height="100%" viewBox="0 0 112 64" fill="none">
    <g opacity="0.6">
      <ellipse cx="80" cy="30" rx="12" ry="6" fill="white" />
      <ellipse cx="90" cy="28" rx="14" ry="8" fill="white" />
      <ellipse cx="100" cy="30" rx="10" ry="6" fill="white" />
    </g>
    <g opacity="0.4">
      <ellipse cx="70" cy="35" rx="14" ry="7" fill="white" />
      <ellipse cx="80" cy="37" rx="10" ry="6" fill="white" />
      <ellipse cx="90" cy="36" rx="12" ry="7" fill="white" />
    </g>
  </svg>
);
