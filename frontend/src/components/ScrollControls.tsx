import React from 'react';

interface ScrollControlsProps {
  onScrollUp: () => void;
  onScrollDown: () => void;
  isDownEnabled: boolean;
}

const ScrollControls: React.FC<ScrollControlsProps> = ({
  onScrollUp,
  onScrollDown,
  isDownEnabled,
}) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
      <button
        onClick={onScrollUp}
        className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Scroll up"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>

      <button
        onClick={onScrollDown}
        disabled={!isDownEnabled}
        className={`p-3 rounded-full shadow-lg transition-all ${
          isDownEnabled
            ? 'bg-blue-500 hover:bg-blue-600 hover:shadow-xl'
            : 'bg-gray-200 cursor-not-allowed'
        }`}
        aria-label="Scroll down"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${isDownEnabled ? 'text-white' : 'text-gray-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollControls; 