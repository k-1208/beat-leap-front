import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface AlertProps {
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Automatically close the alert after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false); // Start fade-out animation
      setTimeout(() => {
        onClose(); // Actually remove from DOM after animation
      }, 300); // Match the transition duration
    }, 5000);

    // Clear the timer if the component unmounts or the alert is closed manually
    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false); // Start fade-out animation
    setTimeout(() => {
      onClose(); // Actually remove from DOM after animation
    }, 300);
  };

  const variants = {
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as const },
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: { duration: 0.3, ease: [0.4, 0, 1, 1] as const },
    },
  };

  return (
    <div className="fixed inset-0 flex items-start justify-center z-50 pointer-events-none">
      <motion.div
        className="mt-5 bg-red-600 text-white px-6 py-4 rounded-md shadow-lg flex items-center justify-between w-full max-w-md pointer-events-auto"
        role="alert"
        variants={variants}
        initial="initial"
        animate={isVisible ? "animate" : "exit"}
        exit="exit"
      >
        <svg
          className="h-6 w-6 text-white mr-2 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span className="font-semibold">{message}</span>
        <button
          className="text-white ml-5 focus:outline-none"
          onClick={handleClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </motion.div>
    </div>
  );
};

export default Alert;
