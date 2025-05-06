"use client";

import { useState } from "react";

interface SwapButtonProps {
  onSwap: () => void;
  disabled?: boolean;
}

export default function SwapButton({
  onSwap,
  disabled = false,
}: SwapButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (disabled) return;

    setIsAnimating(true);
    onSwap();

    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        text-white rounded-full p-3 mx-auto mt-6 mb-2 shadow-md
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-300
        flex items-center justify-center
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-lg transform hover:scale-110 cursor-pointer"
        }
      `}
      aria-label="Swap currencies"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 ${isAnimating ? "animate-swapRotate" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    </button>
  );
}
