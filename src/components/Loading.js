import React from "react";

/**
 * Loading component with spinner animation
 */
const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-600 text-lg font-medium">Loading characters...</p>
    </div>
  );
};

export default Loading;
