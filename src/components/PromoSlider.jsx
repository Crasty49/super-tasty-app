import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import prox from "../assets/prox.png";
import salsas from "../assets/salsas.png";

const slides = [prox, salsas];

export default function PromoSlider() {

  const [index, setIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="relative w-full h-[180px] md:h-[450px] rounded-xl overflow-hidden shadow-xl">

      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={slides[index]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}
