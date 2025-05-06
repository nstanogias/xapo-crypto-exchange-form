"use client";

import { useState } from "react";

interface ConfirmButtonProps {
  onConfirm: () => void;
  onProcessingChange?: (isProcessing: boolean) => void;
  disabled?: boolean;
}

export default function ConfirmButton({
  onConfirm,
  onProcessingChange,
  disabled = false,
}: ConfirmButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = () => {
    if (disabled || isProcessing) return;

    setIsProcessing(true);

    if (onProcessingChange) {
      onProcessingChange(true);
    }

    setTimeout(() => {
      onConfirm();
      setIsProcessing(false);

      if (onProcessingChange) {
        onProcessingChange(false);
      }
    }, 1000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isProcessing}
      className={`
        w-full py-3 px-4 rounded-lg text-white font-medium
        transition-all duration-300 ease-in-out
        transform hover:scale-[1.02] active:scale-95
        shadow-md hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${
          disabled || isProcessing
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }
      `}
    >
      <div className="flex items-center justify-center">
        {isProcessing ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          "Confirm Swap"
        )}
      </div>
    </button>
  );
}
