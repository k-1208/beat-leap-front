"use client";

import { useEffect } from "react";
import { motion, useCycle } from "framer-motion";

export default function LoadingDots() {
  const [dots, cycleDots] = useCycle("", ".", "..", "...");

  useEffect(() => {
    const interval = setInterval(() => {
      cycleDots();
    }, 500);
    return () => clearInterval(interval);
  }, [cycleDots]);

  return (
    <motion.span
      key={dots}
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {dots}
    </motion.span>
  );
}
