"use client";

import { useState } from "react";
import CurrencyInput from "./CurrencyInput";
import SwapButton from "./SwapButton";
import ExchangeRate from "./ExchangeRate";
import ConfirmButton from "./ConfirmButton";
import { useRate } from "@/hooks/useRate";
import BitcoinIcon from "./BitcoinIcon";

export default function CryptoExchange() {
  const [btcAmount, setBtcAmount] = useState("");
  const [usdAmount, setUsdAmount] = useState("");
  const [activeField, setActiveField] = useState<"btc" | "usd" | null>("btc");
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSwapped, setIsSwapped] = useState(false);

  const { rate, isLoading, error } = useRate();

  const errorMessage = error
    ? "Failed to fetch latest rate. Using estimated rate."
    : "";

  const handleSwap = () => {
    const tempBtc = btcAmount;
    const tempUsd = usdAmount;

    setBtcAmount(tempUsd);
    setUsdAmount(tempBtc);
    setActiveField(activeField === "btc" ? "usd" : "btc");
    setIsSwapped(!isSwapped);
  };

  const formatUsdValue = (value: number): string => {
    if (isNaN(value)) return "";
    // Prevent scientific notation for large numbers
    if (value > 1e9) return "999,999,999.99";
    return value
      .toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(/,/g, "");
  };

  const formatBtcValue = (value: number): string => {
    if (isNaN(value)) return "";
    // Prevent scientific notation for small numbers
    if (value < 1e-8) return "0.00000000";
    if (value > 999999999.99 / rate) return (999999999.99 / rate).toFixed(8);
    return value
      .toLocaleString("en-US", {
        minimumFractionDigits: 8,
        maximumFractionDigits: 8,
      })
      .replace(/,/g, "");
  };

  const handleBtcAmountChange = (value: string) => {
    setBtcAmount(value);

    if (!value) {
      setUsdAmount("");
      return;
    }

    const amount = parseFloat(value);
    if (!isNaN(amount)) {
      if (isSwapped) {
        const btcValue = amount / rate;
        setUsdAmount(formatBtcValue(btcValue));
      } else {
        const usdValue = amount * rate;
        setUsdAmount(formatUsdValue(usdValue));
      }
    }
  };

  const handleUsdAmountChange = (value: string) => {
    setUsdAmount(value);

    if (!value) {
      setBtcAmount("");
      return;
    }

    const amount = parseFloat(value);
    if (!isNaN(amount)) {
      if (isSwapped) {
        const usdValue = amount * rate;
        setBtcAmount(formatUsdValue(usdValue));
      } else {
        const btcValue = amount / rate;
        setBtcAmount(formatBtcValue(btcValue));
      }
    }
  };

  const handleConfirm = () => {
    // Simulate API call
    setSuccess(true);
    setIsProcessing(false);

    // Reset form after success display
    setTimeout(() => {
      setSuccess(false);
      setBtcAmount("");
      setUsdAmount("");
      setActiveField(null);
    }, 3000);
  };

  const handleProcessingChange = (processing: boolean) => {
    setIsProcessing(processing);
  };

  const isFormValid = () => {
    if (!btcAmount || !usdAmount) return false;
    const btc = parseFloat(btcAmount);
    const usd = parseFloat(usdAmount);
    return !isNaN(btc) && btc > 0 && !isNaN(usd) && usd > 0;
  };

  const isBuying =
    activeField === "usd" || (!activeField && !btcAmount && !usdAmount);

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300 card-hover animate-slideIn animate-rotate-border">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center justify-center animate-pulse">
          <BitcoinIcon className="inline-block mr-2 text-btc-orange" />
          <span>{isBuying ? "Buy Bitcoin" : "Sell Bitcoin"}</span>
        </h1>
      </div>

      <ExchangeRate rate={rate} isLoading={isLoading} />

      {errorMessage && (
        <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-sm rounded animate-slideIn">
          {errorMessage}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-800 rounded-lg animate-slideIn">
          <div className="flex items-center">
            <div className="rounded-full bg-green-500 p-1 mr-2 animate-checkmark">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="font-medium text-green-600 dark:text-green-300">
              Swap successful! Your transaction has been processed.
            </p>
          </div>
          <div className="mt-2 text-sm text-green-600 dark:text-green-300">
            <p>
              <span className="font-medium">Amount:</span>{" "}
              {isBuying ? `${btcAmount} BTC` : `${usdAmount} USD`}
            </p>
            <p>
              <span className="font-medium">Rate:</span> $
              {rate.toLocaleString()} per BTC
            </p>
          </div>
        </div>
      )}

      <div
        className={`space-y-4 transition-opacity duration-300 ${
          success || isProcessing ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="space-y-2">
          <CurrencyInput
            label="You Send"
            value={btcAmount}
            currency={isSwapped ? "USD" : "BTC"}
            onChange={handleBtcAmountChange}
            readonly={success || isProcessing}
            maxDecimals={isSwapped ? 2 : 8}
            hint="Enter the amount of BTC to exchange"
          />

          <div className="relative z-10">
            <div className="absolute left-1/2 transform -translate-x-1/2 -mt-4">
              <SwapButton
                onSwap={handleSwap}
                disabled={success || isProcessing}
              />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
          </div>

          <CurrencyInput
            label="You Receive"
            value={usdAmount}
            currency={isSwapped ? "BTC" : "USD"}
            onChange={handleUsdAmountChange}
            readonly={success || isProcessing}
            maxDecimals={isSwapped ? 8 : 2}
            hint="Enter the amount of USD to exchange"
          />
        </div>

        <div className="mt-6">
          <ConfirmButton
            onConfirm={handleConfirm}
            onProcessingChange={handleProcessingChange}
            disabled={!isFormValid() || isLoading || success}
            actionText={isBuying ? "Buy Bitcoin" : "Sell Bitcoin"}
          />
        </div>
      </div>
    </div>
  );
}
