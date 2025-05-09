interface BitcoinIconProps {
  className?: string;
}

const BitcoinIcon = ({ className = "" }: BitcoinIconProps) => {
  return (
    <span className={`inline-block align-middle mr-2 ${className}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        className="text-btc-orange animate-bounce-subtle"
      >
        <path d="M11.5 11.5V8.5H14.5C15.05 8.5 15.5 8.95 15.5 9.5C15.5 10.05 15.05 10.5 14.5 10.5H12.5V12.5H14.5C15.05 12.5 15.5 12.95 15.5 13.5C15.5 14.05 15.05 14.5 14.5 14.5H12.5V16.5H15.5C16.05 16.5 16.5 16.95 16.5 17.5C16.5 18.05 16.05 18.5 15.5 18.5H10.5V20.5C10.5 21.05 10.05 21.5 9.5 21.5C8.95 21.5 8.5 21.05 8.5 20.5V18.5H7.5C6.95 18.5 6.5 18.05 6.5 17.5C6.5 16.95 6.95 16.5 7.5 16.5H8.5V14.5H7.5C6.95 14.5 6.5 14.05 6.5 13.5C6.5 12.95 6.95 12.5 7.5 12.5H8.5V10.5H7.5C6.95 10.5 6.5 10.05 6.5 9.5C6.5 8.95 6.95 8.5 7.5 8.5H8.5V6.5C8.5 5.95 8.95 5.5 9.5 5.5C10.05 5.5 10.5 5.95 10.5 6.5V8.5H11.5" />
      </svg>
    </span>
  );
};

export default BitcoinIcon;
