import CryptoExchange from "@/components/CryptoExchange";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col relative">
      <header className="py-6 px-4 bg-white dark:bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            BTC <span className="text-gray-500 dark:text-gray-400">⟷</span> USD
            Exchange
          </h1>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md relative">
          <CryptoExchange />
        </div>
      </main>

      <footer className="py-4 px-4 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            Exchange rates are provided by CoinGecko&apos;s Bitcoin Price API.
            Rates are updated every minute.
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} BTC/USD Exchange Demo. Not for actual
            trading.
          </p>
        </div>
      </footer>
    </div>
  );
}
