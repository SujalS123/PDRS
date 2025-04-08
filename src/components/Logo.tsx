import React, { useState } from 'react';
import logoImage from '../assets/logo.png';

interface LogoProps {
  type?: 'image' | 'svg';
  imagePath?: string;
  width?: number;
  height?: number;
  showText?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  type = 'image', 
  imagePath = logoImage,
  width = 180,
  height = 180,
  showText = false,
  className = ''
}) => {
  const [imageError, setImageError] = useState(false);

  if (type === 'image' && !imageError) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]">
          <img
            src={imagePath}
            alt="Dietrium Logo"
            className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
          />
        </div>
        {showText && (
          <span className="mt-4 text-3xl font-bold text-primary tracking-tight">
            Dietrium
          </span>
        )}
      </div>
    );
  }

  // Fallback SVG logo if image fails to load or type is 'svg'
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px]">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-primary transition-transform duration-300 hover:scale-105"
        >
          <path
            d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm0 36c-8.837 0-16-7.163-16-16S15.163 8 24 8s16 7.163 16 16-7.163 16-16 16z"
            fill="currentColor"
          />
          <path
            d="M24 12c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"
            fill="currentColor"
          />
          <path
            d="M24 20c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"
            fill="currentColor"
          />
        </svg>
      </div>
      {showText && (
        <span className="mt-4 text-3xl font-bold text-primary tracking-tight">
          Dietrium
        </span>
      )}
    </div>
  );
};

export default Logo; 