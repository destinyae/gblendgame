import React from 'react';

interface ButtonProps {
  onClick: () => void;
  color: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, color, disabled = false }) => {
  const baseClasses = "w-full h-full rounded-lg shadow-lg transition-all duration-150 transform";
  const activeClasses = "active:scale-95 hover:brightness-110";
  const disabledClasses = "opacity-50 cursor-not-allowed";
  
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabled ? disabledClasses : activeClasses}`}
      style={{ backgroundColor: color }}
      aria-label="Tap button"
    />
  );
};

export default Button;