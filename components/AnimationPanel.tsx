"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Right panel component with animated airplane and welcome message
 */
export default function AnimationPanel() {
  const [isClient, setIsClient] = useState(false);

  // Ensure animations only run on client side to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
      {/* Blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700"></div>

      {/* Animated clouds - only animate on client */}
      {isClient ? (
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='30' viewBox='0 0 60 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 15c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z' fill='white' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 50px",
            backgroundRepeat: "repeat",
          }}
        />
      ) : (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='30' viewBox='0 0 60 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 15c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z' fill='white' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "100px 50px",
            backgroundRepeat: "repeat",
          }}
        />
      )}

      {/* Airplane illustration */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isClient ? (
          <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative"
          >
            {/* Airplane SVG */}
            <svg
              width="300"
              height="200"
              viewBox="0 0 300 200"
              className="text-white"
            >
              {/* Airplane body */}
              <path
                d="M50 100 L150 80 L250 100 L150 120 Z M150 80 L150 60 M150 120 L150 140 M100 90 L100 110 M200 90 L200 110"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Airplane cockpit */}
              <circle
                cx="150"
                cy="100"
                r="20"
                fill="currentColor"
                opacity="0.8"
              />
              {/* Airplane windows */}
              <path
                d="M130 100 L170 100 M140 90 L160 90 M140 110 L160 110"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Static airplane SVG for SSR */}
            <svg
              width="300"
              height="200"
              viewBox="0 0 300 200"
              className="text-white"
            >
              <path
                d="M50 100 L150 80 L250 100 L150 120 Z M150 80 L150 60 M150 120 L150 140 M100 90 L100 110 M200 90 L200 110"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="150"
                cy="100"
                r="20"
                fill="currentColor"
                opacity="0.8"
              />
              <path
                d="M130 100 L170 100 M140 90 L160 90 M140 110 L160 110"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Welcome text */}
      <div className="absolute bottom-20 left-0 right-0 text-center text-white px-8">
        {isClient ? (
          <>
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="text-4xl lg:text-5xl font-light mb-4"
            >
              It&apos;s lovely to feel welcome
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
              className="text-xl lg:text-2xl opacity-90"
            >
              The whole world on the platter
            </motion.p>
          </>
        ) : (
          <>
            <h1 className="text-4xl lg:text-5xl font-light mb-4">
              It&apos;s lovely to feel welcome
            </h1>
            <p className="text-xl lg:text-2xl opacity-90">
              The whole world on the platter
            </p>
          </>
        )}
      </div>

      {/* Decorative clouds */}
      <div className="absolute top-20 left-20 w-16 h-8 bg-white rounded-full opacity-30"></div>
      <div className="absolute top-40 right-32 w-20 h-10 bg-white rounded-full opacity-25"></div>
      <div className="absolute bottom-40 left-16 w-12 h-6 bg-white rounded-full opacity-35"></div>
    </div>
  );
}
