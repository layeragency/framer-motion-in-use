"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import ArrowLeft from "@/assets/arrow-left.svg";
import ArrowRight from "@/assets/arrow-right.svg";

export type Slide = {
  image: string;
  title: string;
  description: string;
};

type Props = {
  slides: Slide[];
  className?: string;
};

const Slider = ({ slides, className = "" }: Props) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + slides.length) % slides.length);
  };

  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${className}`}>
      <div className="aspect-[16/9] w-full relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={index}
            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
            initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction < 0 ? 50 : -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.offset.x > 100) {
                paginate(-1); // swipe right
              } else if (info.offset.x < -100) {
                paginate(1); // swipe left
              }
            }}
          >
            <Image
              src={slides[index].image}
              alt={slides[index].title}
              fill
              className="object-cover rounded-xl pointer-events-none"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-6 rounded-b-xl">
              <h2 className="text-xl font-bold mb-1">{slides[index].title}</h2>
              <p className="text-sm">{slides[index].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md hover:bg-white/70 text-background rounded-full p-4 z-10 cursor-pointer transition-all"
        aria-label="Previous"
      >
        <ArrowLeft width={24} />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md hover:bg-white/70 text-background rounded-full p-4 z-10 cursor-pointer transition-all"
        aria-label="Next"
      >
        <ArrowRight width={24} />
      </button>
    </div>
  );
};

export default Slider;
