import React from "react";

/**
 * Error message component
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display
 * @param {Function} props.onRetry - Optional retry callback
 */
const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 max-w-md">
        <div className="flex items-center space-x-3 mb-3">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-semibold text-red-700">
            Oops! Something went wrong
          </h3>
        </div>
        <p className="text-red-600 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
