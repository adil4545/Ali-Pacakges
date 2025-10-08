import { forwardRef, type ReactNode, type MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, disabled, className = "" }, ref) => {
    return (
      <button
        ref={ref}
        type={"submit"} // ✅ use the type prop
        onClick={onClick}
        disabled={disabled}
        className={`px-8 py-2 rounded-md font-medium 
          bg-gradient-to-r from-amber-600 to-amber-900 text-white 
          hover:opacity-90 transition ${className}`}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
