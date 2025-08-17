import { Minus, Plus, XCircle } from 'lucide-react';
import { PassengerCounts } from '@/types/hotel';

type PassengerSelectorProps = {
  passengers: PassengerCounts;
  onChange: (newPassengers: PassengerCounts) => void;
  onClose: () => void;
};

export const PassengerSelector = ({
  passengers,
  onChange,
  onClose
}: PassengerSelectorProps) => {
  const handleChange = (type: keyof PassengerCounts, delta: number) => {
    const newValue = Math.max(0, passengers[type] + delta);
    onChange({ ...passengers, [type]: newValue });
  };

  return (
    <div className="absolute z-20 bg-white border border-gray-400 rounded-xl shadow-lg p-5 w-full mt-2 animate-fadeIn">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800">Guests</h3>
        <button
          onClick={onClose}
          className="p-1 cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close guest selector"
        >
          <XCircle size={18} className="text-gray-500" />
        </button>
      </div>

      <div className="space-y-4">
        {(['adults', 'children'] as const).map((type) => (
          <div key={type} className="flex justify-between items-center">
            <div>
              <div className="font-medium text-gray-800">
                {type === 'adults' ? 'Adults' : 'Children'}
              </div>
              <div className="text-sm text-gray-500">
                {type === 'adults' ? 'Age 13+ years' : 'Ages 2-12 years'}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                className="w-9 h-9 cursor-pointer rounded-full border border-gray-400 flex items-center justify-center disabled:opacity-30 hover:bg-blue-50 transition-colors"
                disabled={passengers[type] <= 0}
                onClick={() => handleChange(type, -1)}
                aria-label={`Decrease ${type}`}
              >
                <Minus size={16} className="text-blue-500" />
              </button>
              <span className="font-medium w-6 text-center">{passengers[type]}</span>
              <button
                className="w-9 h-9 cursor-pointer rounded-full border border-gray-400 flex items-center justify-center hover:bg-blue-50 transition-colors"
                onClick={() => handleChange(type, 1)}
                aria-label={`Increase ${type}`}
              >
                <Plus size={16} className="text-blue-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};