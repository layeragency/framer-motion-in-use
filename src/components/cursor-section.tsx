"use client";

import { ReactNode, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

type Props = {
  children: ReactNode;
  cursorContent?: string;
  className?: string;
};

const CursorSection = ({ children, cursorContent = "", className }: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const springX = useSpring(0, {
    stiffness: 500,
    damping: 50,
    mass: 0.5,
  });
  const springY = useSpring(0, {
    stiffness: 500,
    damping: 50,
    mass: 0.5,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    springX.set(x);
    springY.set(y);
  };

  return (
    <div
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative ${className}`}
      style={{ cursor: isHovered ? "none" : "default" }}
    >
      <motion.div
        className="pointer-events-none absolute z-50 translate-x-[-50%] translate-y-[-50%] rounded-full mix-blend-difference bg-white"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        style={{
          translateX: springX,
          translateY: springY,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0,
        }}
        transition={{
          opacity: { delay: 0.2 },
          scale: { delay: 0.2 },
        }}
      >
        <div className="rounded-full w-[130px] h-[130px] flex mix-blend-difference">
          {cursorContent}
        </div>
      </motion.div>

      {/* Children */}
      {children}
    </div>
  );
};

export default CursorSection;
