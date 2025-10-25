// BannerSlider.jsx
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

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-screen h-[80vh] sm:h-[90vh] md:h-[100vh] overflow-hidden">
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
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              {slides[current].title}
            </h2>
            <p className="mt-4 text-sm sm:text-lg md:text-2xl text-gray-200 max-w-3xl drop-shadow-md">
              {slides[current].description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
              current === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrent(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
