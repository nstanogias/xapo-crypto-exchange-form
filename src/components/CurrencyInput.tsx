"use client";

import { ChangeEvent } from "react";

interface CurrencyInputProps {
  label: string;
  value: string;
  currency: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  // active?: boolean;
  maxDecimals?: number;
  hint?: string;
}

export default function CurrencyInput({
  label,
  value,
  currency,
  onChange,
  readonly = false,
  // active = false,
  maxDecimals = 2,
  hint,
}: CurrencyInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimals
    const input = e.target.value;
    if (/^(\d*\.?\d*)$/.test(input) || input === "") {
      // Ensure we don't exceed maxDecimals
      if (input.includes(".")) {
        const [, decimal] = input.split(".");
        if (decimal && decimal.length > maxDecimals) {
          return;
        }
      }
      onChange(input);
    }
  };

  return (
    <div
      className={`w-full transition-all duration-300 
      
      }`}
    >
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          readOnly={readonly}
          aria-label={label}
          className={`
            block w-full rounded-lg border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-800 px-4 py-3 pr-20
            focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400
            ${readonly ? "bg-gray-50 dark:bg-gray-700 cursor-not-allowed" : ""}
            transition-all duration-300 ease-in-out
            focus:scale-[1.02] transform
            focus:animate-input-focus
          `}
          placeholder="0.00"
          title={hint}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            {currency}
          </span>
        </div>
      </div>
    </div>
  );
}
