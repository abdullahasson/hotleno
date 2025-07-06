// components/ui/datepicker.tsx
import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { CalendarDays } from 'lucide-react';
import { motion } from 'framer-motion';
import "react-datepicker/dist/react-datepicker.css";

// Define props for the DatePicker component
interface DatePickerProps {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    minDate?: Date;
    placeholderText?: string;
    className?: string;
}

// Define props for the CustomDateInput component
interface CustomDateInputProps {
    value?: string;
    onClick?: () => void;
    placeholderText?: string;
}

// Create custom input with proper typing
const CustomDateInput = forwardRef<HTMLButtonElement, CustomDateInputProps>(
    ({ value, onClick, placeholderText }, ref) => (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className="flex items-center w-full py-3 pr-4 pl-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent text-lg hover:shadow-md transition-all duration-200 bg-white "
            onClick={onClick}
            ref={ref}
            type="button"
        >
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <CalendarDays className="text-blue-500" size={20} />
            </div>
            <span className={`${value ? 'text-gray-900 ' : 'text-gray-500'}`}>
                {value || placeholderText}
            </span>
        </motion.button>
    )
);

CustomDateInput.displayName = 'CustomDateInput';

const UiDatePicker: React.FC<DatePickerProps> = ({
    selected,
    onChange,
    minDate = new Date(),
    placeholderText = 'Select date',
    className = ''
}) => {
    return (
        <div className={`relative ${className}`}>
            <DatePicker
                selected={selected}
                onChange={onChange}
                minDate={minDate}
                placeholderText={placeholderText}
                wrapperClassName='!w-full'
                customInput={<CustomDateInput placeholderText={placeholderText} />}
                popperClassName="react-datepicker-popper z-10"
                calendarClassName="!border !border-gray-200 !rounded-xl !shadow-lg overflow-hidden"
                dayClassName={(date) =>
                    `!rounded-md !transition-colors ${date.getDate() === selected?.getDate() ?
                        '!bg-blue-500 !text-white' :
                        'hover:!bg-gray-100 '}`
                }
                renderCustomHeader={({
                    monthDate,
                    decreaseMonth,
                    increaseMonth,
                    prevMonthButtonDisabled,
                    nextMonthButtonDisabled,
                }) => (
                    <div className="flex items-center justify-between px-4 py-2 bg-white ">
                        <button
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                            className={`p-1 rounded-lg ${prevMonthButtonDisabled ?
                                'text-gray-300 cursor-not-allowed' :
                                'hover:bg-gray-100 '}`}
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <span className="text-gray-700  font-medium">
                            {monthDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </span>

                        <button
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                            className={`p-1 rounded-lg ${nextMonthButtonDisabled ?
                                'text-gray-300 cursor-not-allowed' :
                                'hover:bg-gray-100 '}`}
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
            />
        </div>
    );
};

export default UiDatePicker;