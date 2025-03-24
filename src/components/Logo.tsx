
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  animated?: boolean;
}

const Logo = ({ className, size = 'md', withText = true, animated = false }: LogoProps) => {
  return (
    <Link to="/" className={cn("flex items-center", className)}>
      {withText && (
        <span className={cn(
          "text-xl font-medium tracking-tighter font-sf-pro relative",
          animated && "text-name-animated"
        )}>
          Siddharth Ajith
          {animated && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform duration-700 origin-left name-underline"></span>
          )}
        </span>
      )}
      
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/sf-pro-display');
        
        .text-name-animated:hover .name-underline {
          transform: scaleX(1);
        }
        
        .text-name-animated {
          position: relative;
          display: inline-block;
          transition: all 0.3s ease;
        }
        
        .text-name-animated:hover {
          letter-spacing: 0.02em;
        }
        
        .font-sf-pro {
          font-family: 'SF Pro Display', system-ui, sans-serif;
          letter-spacing: -0.02em;
        }
      `}</style>
    </Link>
  );
};

export default Logo;
