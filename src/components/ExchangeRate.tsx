"use client";

import { useEffect, useState } from "react";

interface ExchangeRateProps {
  rate: number;
  isLoading?: boolean;
}

export default function ExchangeRate({
  rate,
  isLoading = false,
}: ExchangeRateProps) {
  const [highlight, setHighlight] = useState(false);

  // Highlight the rate when it changes
  useEffect(() => {
    if (!isLoading) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [rate, isLoading]);

  return (
    <div className="flex flex-col items-center my-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Current Exchange Rate
      </p>
      <div
        className={`
        flex items-center mt-1 px-4 py-2 rounded-md
        bg-gray-50 dark:bg-gray-800 
        transition-all duration-500 ease-in-out
        ${highlight ? "bg-yellow-100 dark:bg-yellow-900 animate-pulse" : ""}
      `}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
            <span>Loading rate...</span>
          </div>
        ) : (
          <span className="font-medium animate-fadeIn">
            1 BTC = $
            {rate.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            USD
          </span>
        )}
      </div>
    </div>
  );
}
