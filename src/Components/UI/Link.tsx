import React from "react";
import { Link as RouterLink } from "react-router-dom";
import type { ReactNode } from "react";

interface CustomLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children, className = "" }) => {
  return (
    <RouterLink
      to={to}
      className={`text-amber-700 font-medium hover:underline ${className}`}
    >
      {children}
    </RouterLink>
  );
};

export default CustomLink;
