// components/ui/button.tsx
'use client';

import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  icon
}: ButtonProps) => {
  // Base styling classes
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  // Variant classes
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 focus:ring-gray-300",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    destructive: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
  };
  
  // Size classes
  const sizeClasses = {
    sm: "text-sm py-2 px-3",
    md: "text-base py-2.5 px-4",
    lg: "text-lg py-3 px-6"
  };
  
  // Combine all classes
  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled || loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  return (
    <button
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
    >
      {loading ? (
        <>
          <Loader2 className={`animate-spin ${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} mr-2`} />
          {children}
        </>
      ) : (
        <>
          {icon && <span className={`mr-2 ${size === 'sm' ? 'scale-90' : ''}`}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;