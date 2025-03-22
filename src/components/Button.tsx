import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  externalLink?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  href,
  externalLink = false,
  className = "",
  onClick,
  disabled = false,
}: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none";
  
  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-800 border border-transparent",
    secondary: "bg-gray-100 text-black hover:bg-gray-200 border border-transparent",
    outline: "bg-transparent text-black border border-gray-300 hover:bg-gray-50",
    ghost: "bg-transparent text-black hover:bg-gray-100 border border-transparent",
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 rounded-lg",
    md: "text-sm px-4 py-2 rounded-lg",
    lg: "text-base px-6 py-3 rounded-lg",
  };
  
  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "cursor-pointer";

  const buttonStyles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabledStyles,
    className
  );

  // If href is provided, render Link or anchor depending on whether it's an external link
  if (href) {
    if (externalLink) {
      return (
        <a
          href={href}
          className={buttonStyles}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link to={href} className={buttonStyles}>
        {children}
      </Link>
    );
  }

  // Otherwise render a button
  return (
    <button
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
