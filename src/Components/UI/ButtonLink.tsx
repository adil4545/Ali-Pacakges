import React from "react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface ButtonLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ to, children, className = "" }) => {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-md font-medium 
        bg-gradient-to-r from-amber-700 to-amber-400 
        text-white hover:opacity-90 transition ${className}`}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
