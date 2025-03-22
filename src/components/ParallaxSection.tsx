
import { useEffect, useRef, ReactNode, useState } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: "up" | "down";
  intensity?: "light" | "medium" | "strong";
  withPolygons?: boolean;
}

const ParallaxSection = ({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
  intensity = "medium",
  withPolygons = false
}: ParallaxSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const polygonsRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  
  // Transform speed based on intensity
  const getSpeedMultiplier = () => {
    switch(intensity) {
      case "light": return 0.3;
      case "strong": return 0.8;
      default: return 0.5;
    }
  };
  
  const finalSpeed = speed * getSpeedMultiplier() * (direction === "down" ? -1 : 1);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const scrollPosition = window.scrollY;
      const sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Check if section is visible
      if (scrollPosition + windowHeight >= sectionTop && 
          scrollPosition <= sectionTop + sectionHeight + windowHeight) {
        
        // Calculate relative position within the section
        const relativePosition = (scrollPosition + windowHeight - sectionTop) / (sectionHeight + windowHeight);
        const transformValue = (relativePosition - 0.5) * sectionHeight * finalSpeed;
        
        setOffset(transformValue);
        
        if (contentRef.current) {
          contentRef.current.style.transform = `translate3d(0, ${transformValue}px, 0)`;
        }
        
        // Animate polygons with different speed if enabled
        if (withPolygons && polygonsRef.current) {
          const shapes = polygonsRef.current.children;
          for (let i = 0; i < shapes.length; i++) {
            const shape = shapes[i] as HTMLElement;
            const polygonSpeed = finalSpeed * (1 + (i * 0.2)); // Different speed for each polygon
            const polygonTransform = (relativePosition - 0.5) * sectionHeight * polygonSpeed;
            shape.style.transform = `translate3d(0, ${polygonTransform}px, 0)`;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [finalSpeed, withPolygons]);

  return (
    <div ref={sectionRef} className={`overflow-hidden relative ${className}`}>
      {withPolygons && (
        <div ref={polygonsRef} className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-gray-100/40 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-gray-200/30 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-gray-300/20 rounded-full opacity-10 blur-3xl"></div>
          
          {/* Polygons for visual interest */}
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon fill="rgba(229, 231, 235, 0.05)" points="0,0 100,0 100,20 0,40" />
            <polygon fill="rgba(229, 231, 235, 0.05)" points="0,40 100,20 100,60 0,90" />
            <polygon fill="rgba(229, 231, 235, 0.08)" points="0,90 100,60 100,100 0,100" />
          </svg>
        </div>
      )}
      
      <div 
        ref={contentRef} 
        className="relative z-10 will-change-transform"
        style={{ backfaceVisibility: 'hidden' }}
      >
        {children}
      </div>
    </div>
  );
};

export default ParallaxSection;
