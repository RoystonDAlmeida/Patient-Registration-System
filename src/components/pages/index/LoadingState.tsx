// src/components/pages/index/LoadingState - Component for initial loading from database

import { LoadingStateProps } from "./types";

export const LoadingState = ({ 
  message = "Initializing Patient Database...",
  subMessage = "This may take a few moments on first load"
}: LoadingStateProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg mb-2">{message}</p>
        <p className="text-gray-500 text-sm">{subMessage}</p>
      </div>
    </div>
  );
}; 