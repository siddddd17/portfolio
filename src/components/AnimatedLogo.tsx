
import { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
  size?: number;
  color?: string;
  animated?: boolean;
}

const AnimatedLogo = ({ 
  className, 
  size = 300, 
  color = '#000',
  animated = true 
}: AnimatedLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!animated || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = size;
    canvas.height = size;
    
    // Animation variables
    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pathIndex: number;
    }[] = [];
    
    // Logo path points - S and A with Apple-inspired minimalism
    const paths = [
      // S curve - Apple-inspired
      [
        { x: size * 0.25, y: size * 0.3 },
        { x: size * 0.35, y: size * 0.25 },
        { x: size * 0.45, y: size * 0.25 },
        { x: size * 0.45, y: size * 0.4 },
        { x: size * 0.45, y: size * 0.55 },
        { x: size * 0.25, y: size * 0.5 },
        { x: size * 0.25, y: size * 0.65 },
        { x: size * 0.25, y: size * 0.8 },
        { x: size * 0.35, y: size * 0.75 },
        { x: size * 0.45, y: size * 0.75 },
      ],
      // A - left line (minimalist)
      [
        { x: size * 0.55, y: size * 0.75 },
        { x: size * 0.625, y: size * 0.5 },
        { x: size * 0.7, y: size * 0.25 },
      ],
      // A - right line (minimalist)
      [
        { x: size * 0.7, y: size * 0.25 },
        { x: size * 0.775, y: size * 0.5 },
        { x: size * 0.85, y: size * 0.75 },
      ],
      // A - middle line (minimalist)
      [
        { x: size * 0.6, y: size * 0.55 },
        { x: size * 0.7, y: size * 0.55 },
        { x: size * 0.8, y: size * 0.55 },
      ]
    ];
    
    // Create particles along each path
    paths.forEach((path, pathIndex) => {
      for (let i = 0; i < path.length - 1; i++) {
        const start = path[i];
        const end = path[i + 1];
        
        // Add particles along each line segment
        const steps = 10;
        for (let j = 0; j < steps; j++) {
          const x = start.x + (end.x - start.x) * (j / steps);
          const y = start.y + (end.y - start.y) * (j / steps);
          
          particles.push({
            x,
            y,
            size: Math.random() * 1.8 + 0.8, // Smaller particles for cleaner look
            speedX: (Math.random() - 0.5) * 0.25, // Reduced movement for more elegance
            speedY: (Math.random() - 0.5) * 0.25,
            opacity: 0.7 + Math.random() * 0.3,
            pathIndex
          });
        }
      }
    });
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw logo lines with Apple-inspired styling
      ctx.strokeStyle = color;
      ctx.lineWidth = size * 0.005; // Thinner, more elegant lines
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Draw 'S' curve - Apple-inspired minimalist
      ctx.beginPath();
      ctx.moveTo(size * 0.25, size * 0.3);
      ctx.bezierCurveTo(
        size * 0.25, size * 0.3, 
        size * 0.45, size * 0.25, 
        size * 0.45, size * 0.4
      );
      ctx.bezierCurveTo(
        size * 0.45, size * 0.55, 
        size * 0.25, size * 0.5, 
        size * 0.25, size * 0.65
      );
      ctx.bezierCurveTo(
        size * 0.25, size * 0.8, 
        size * 0.45, size * 0.75, 
        size * 0.45, size * 0.75
      );
      ctx.stroke();
      
      // Draw 'A' shape - clean, minimal lines
      ctx.beginPath();
      ctx.moveTo(size * 0.55, size * 0.75);
      ctx.lineTo(size * 0.7, size * 0.25);
      ctx.lineTo(size * 0.85, size * 0.75);
      ctx.stroke();
      
      // Draw horizontal line in 'A' - clean, minimal
      ctx.beginPath();
      ctx.moveTo(size * 0.6, size * 0.55);
      ctx.lineTo(size * 0.8, size * 0.55);
      ctx.stroke();
      
      // Calculate color values
      const r = parseInt(color.slice(1, 3), 16) || 0;
      const g = parseInt(color.slice(3, 5), 16) || 0;
      const b = parseInt(color.slice(5, 7), 16) || 0;
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position with a slight movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Different colors based on the path - subtle variations for professional look
        let particleColor;
        if (particle.pathIndex === 0) {
          // S path - slightly darker
          particleColor = `rgba(${r * 0.9}, ${g * 0.9}, ${b * 0.9}, ${particle.opacity * 0.7})`;
        } else if (particle.pathIndex === 3) {
          // A middle line - slightly brighter
          particleColor = `rgba(${Math.min(255, r * 1.1)}, ${Math.min(255, g * 1.1)}, ${Math.min(255, b * 1.1)}, ${particle.opacity * 0.7})`;
        } else {
          // A main lines - balanced
          particleColor = `rgba(${r}, ${g}, ${b}, ${particle.opacity * 0.7})`;
        }
        
        // Draw particle - smaller for more refined look
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
        
        // Check if particle is too far from its path
        const path = paths[particle.pathIndex];
        let minDist = Infinity;
        let nearestPoint = path[0];
          
        for (let i = 0; i < path.length; i++) {
          const dist = Math.sqrt(
            Math.pow(path[i].x - particle.x, 2) + 
            Math.pow(path[i].y - particle.y, 2)
          );
            
          if (dist < minDist) {
            minDist = dist;
            nearestPoint = path[i];
          }
        }
        
        // Reset if too far - tighter constraints for more controlled animation
        if (minDist > size * 0.035) {
          particle.x = nearestPoint.x + (Math.random() - 0.5) * 2;
          particle.y = nearestPoint.y + (Math.random() - 0.5) * 2;
          particle.speedX = (Math.random() - 0.5) * 0.15;
          particle.speedY = (Math.random() - 0.5) * 0.15;
        }
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      particles = [];
    };
  }, [animated, size, color]);
  
  if (!animated) {
    return (
      <svg 
        ref={logoRef}
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        className={className}
      >
        {/* S shape - Apple-inspired minimalist curve */}
        <path 
          d="M25 30C25 30 45 25 45 40C45 55 25 50 25 65C25 80 45 75 45 75" 
          stroke={color} 
          strokeWidth="5" 
          strokeLinecap="round" 
          fill="none"
          strokeLinejoin="round"
        />
        
        {/* A shape - Clean, minimal lines */}
        <path 
          d="M55 75L70 25L85 75" 
          stroke={color} 
          strokeWidth="5" 
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path 
          d="M60 55L80 55" 
          stroke={color} 
          strokeWidth="5" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  
  return (
    <canvas 
      ref={canvasRef} 
      width={size} 
      height={size} 
      className={cn("rounded-xl", className)}
    />
  );
};

export default AnimatedLogo;
