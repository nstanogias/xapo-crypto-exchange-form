"use client";

import { useState } from "react";
import CurrencyInput from "./CurrencyInput";
import SwapButton from "./SwapButton";
import ExchangeRate from "./ExchangeRate";
import ConfirmButton from "./ConfirmButton";
import { useRate } from "@/hooks/useRate";

export default function CryptoExchange() {
  const [isBuying, setIsBuying] = useState(true);
  const [btcAmount, setBtcAmount] = useState("");
  const [usdAmount, setUsdAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { rate, isLoading, error } = useRate();

  const errorMessage = error
    ? "Failed to fetch latest rate. Using estimated rate."
    : "";

  const handleSwap = () => {
    setIsBuying(!isBuying);
    setBtcAmount("");
    setUsdAmount("");
    setTransactionError(null);
  };

  const handleBtcAmountChange = (value: string) => {
    setBtcAmount(value);
    if (value === "") {
      setUsdAmount("");
      return;
    }

    const btc = parseFloat(value);
    if (!isNaN(btc)) {
      setUsdAmount((btc * rate).toFixed(2));
    }
  };

  const handleUsdAmountChange = (value: string) => {
    setUsdAmount(value);
    if (value === "") {
      setBtcAmount("");
      return;
    }

    const usd = parseFloat(value);
    if (!isNaN(usd)) {
      setBtcAmount((usd / rate).toFixed(8));
    }
  };

  const handleConfirm = () => {
    setSuccess(true); // here we could also fail the transaction and set an error message

    // Reset success message after 2 seconds
    setTimeout(() => {
      setSuccess(false);
      setBtcAmount("");
      setUsdAmount("");
    }, 2000);
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

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl transition-all duration-300">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {isBuying ? "Buy Bitcoin" : "Sell Bitcoin"}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          {isBuying ? "Spend USD to get BTC" : "Sell BTC to get USD"}
        </p>
      </div>

      <ExchangeRate rate={rate} isLoading={isLoading} />

      {errorMessage && (
        <div className="mb-4 p-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 text-sm rounded">
          {errorMessage}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-800 rounded-lg animate-fadeIn">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600 dark:text-green-300 mr-2 animate-bounce"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-medium text-green-600 dark:text-green-300">
              Swap successful! Your transaction has been processed.
            </p>
          </div>
        </div>
      )}

      {/* Error message */}
      {transactionError && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 rounded-lg animate-fadeIn">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-600 dark:text-red-300 mr-2 animate-swapRotate"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-medium text-red-600 dark:text-red-300">
              Transaction Failed
            </p>
          </div>
          <p className="mt-2 text-sm text-red-500 dark:text-red-400">
            {transactionError}
          </p>
          <button
            onClick={() => setTransactionError(null)}
            className="mt-3 text-xs text-red-600 dark:text-red-300 hover:underline focus:outline-none cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <div
        className={`space-y-4 transition-opacity duration-300 ${
          success || isProcessing ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="space-y-2">
          <CurrencyInput
            label={isBuying ? "You Spend" : "You Receive"}
            value={usdAmount}
            currency="USD"
            onChange={handleUsdAmountChange}
            readonly={!isBuying || success || isProcessing}
          />

          <SwapButton onSwap={handleSwap} disabled={success || isProcessing} />

          <CurrencyInput
            label={isBuying ? "You Receive" : "You Spend"}
            value={btcAmount}
            currency="BTC"
            onChange={handleBtcAmountChange}
            readonly={isBuying || success || isProcessing}
          />
        </div>

        <ConfirmButton
          onConfirm={handleConfirm}
          onProcessingChange={handleProcessingChange}
          disabled={!isFormValid() || isLoading || success}
        />
      </div>
    </div>
  );
}
