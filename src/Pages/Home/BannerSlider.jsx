import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import items1 from "../../assets/items/items1.jpg";
import items2 from "../../assets/items/items2.jpg";
import items3 from "../../assets/items/items3.jpg";

const slides = [
  {
    id: 1,
    title: "Lost Something? Let's Help You Find It",
    description: "Post your lost items and get connected with finders quickly.",
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
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-screen aspect-[16/9] overflow-hidden">
  <AnimatePresence mode="wait">
    <motion.div key={slides[current].id} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.8 }} className="absolute inset-0">
      <img src={slides[current].image} alt={slides[current].title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 dark:bg-gray-900/70 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl sm:text-5xl font-bold text-white drop-shadow-lg">{slides[current].title}</h2>
        <p className="mt-2 text-gray-200 dark:text-gray-300 max-w-2xl">{slides[current].description}</p>
      </div>
    </motion.div>
  </AnimatePresence>
</div>
  );
}
