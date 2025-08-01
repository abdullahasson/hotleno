// components/ui/select.tsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export type SelectOption = {
  value: string;
  label: string;
};

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(option => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsOpen(prev => !prev);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div 
      ref={selectRef}
      className={`relative w-full ${className}`}
    >
      <motion.button
        whileTap={{ scale: 0.98 }}
        className={`
          flex items-center justify-between w-full px-4 py-2
          bg-white  rounded-xl border
          ${isOpen ? 'border-indigo-500' : 'border-gray-200'}
          hover:shadow-md transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
        `}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={`truncate ${value ? 'text-gray-900' : 'text-gray-500'}`}>
          {selectedOption?.label || placeholder}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-gray-500" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute z-10 w-full mt-2 py-2 bg-white  !text-gray-900
                      rounded-xl shadow-lg border border-gray-400 
                      max-h-60 overflow-auto focus:outline-none"
            role="listbox"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={`
                  px-4 py-3 cursor-pointer flex items-center justify-between !text-gray-900
                  hover:bg-gray-100 
                  transition-colors duration-150
                  ${value === option.value ? 'bg-indigo-50' : ''}
                `}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                aria-selected={value === option.value}
                role="option"
              >
                <span className="truncate">{option.label}</span>
                {value === option.value && (
                  <Check size={16} className="text-indigo-600" />
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;