"use client";

import { useQuery } from "@tanstack/react-query";

interface UseRateResult {
  rate: number;
  isLoading: boolean;
  error: Error | null;
}

export function useRate(): UseRateResult {
  const fallbackRate = 40000;

  const {
    data = fallbackRate,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bitcoinRate"],
    queryFn: async (): Promise<number> => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rate");
      }
      const data = await response.json();
      return data.bitcoin.usd;
    },
    refetchInterval: 60 * 1000, //refetch every min
    retry: 3,
    staleTime: 30000,
  });

  return {
    rate: data,
    isLoading,
    error: error as Error | null,
  };
}
