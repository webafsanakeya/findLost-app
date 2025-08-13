import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import items1 from "../../assets/items/items1.jpg";
import items2 from "../../assets/items/items2.jpg";
import items3 from "../../assets/items/items3.jpg";

const slides = [
  {
    id: 1,
    title: "Lost Something? Let's Help You Find It",
    description:
      "Post your lost items and get connected with finders quickly.",
    image: items1,
  },
  {
    id: 2,
    title: "Found Something Valuable?",
    description: "Report found items and make someone’s day.",
    image: items2,
  },
  {
    id: 3,
    title: "We Reunite People with Their Belongings",
    description: "Track recoveries and celebrate successful returns.",
    image: items3,
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full aspect-[16/9] max-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-lg sm:text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
              {slides[current].title}
            </h2>
            <p className="mt-2 text-xs sm:text-lg md:text-xl text-gray-200 max-w-2xl">
              {slides[current].description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
