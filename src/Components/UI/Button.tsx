import React from "react";
import type { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-2 rounded-md font-medium 
     bg-gradient-to-r from-amber-600 to-amber-900 text-white hover:opacity-90 transition${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
