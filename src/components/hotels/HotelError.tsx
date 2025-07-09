// components/HotelError.tsx
import { AlertTriangle } from 'lucide-react';

type HotelErrorProps = {
  message: string;
  onRetry?: () => void;
};

export default function HotelError({ message, onRetry }: HotelErrorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-red-50">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
          Hotel Search Error
        </h2>
      </div>

      <div className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle className="h-12 w-12 text-red-600" />
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 mb-2">
          We encountered an issue
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message || 'Failed to load hotel data. Please try your search again.'}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
          >
            Retry Search
          </button>
        )}
      </div>
    </div>
  );
}