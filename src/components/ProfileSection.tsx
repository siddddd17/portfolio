
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import SocialLinks from "./SocialLinks";
import Button from "./Button";
import { useEffect, useRef } from "react";

interface ProfileSectionProps {
  className?: string;
}

const ProfileSection = ({ className }: ProfileSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let width = canvas.width = containerRef.current.clientWidth;
    let height = canvas.height = containerRef.current.clientHeight;
    
    // Particle network settings
    const particleCount = 120;
    const particles: {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      color: string;
      connections: number[];
    }[] = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        vx: Math.random() * 0.2 - 0.1,
        vy: Math.random() * 0.2 - 0.1,
        color: `rgba(0, 0, 0, ${Math.random() * 0.3 + 0.1})`,
        connections: []
      });
    }
    
    // Create connections between particles
    particles.forEach((particle, i) => {
      // Connect to 2-3 other particles
      const connectionCount = Math.floor(Math.random() * 2) + 2;
      
      for (let j = 0; j < connectionCount; j++) {
        let targetIndex = Math.floor(Math.random() * particleCount);
        // Avoid connecting to self or duplicate connections
        while (targetIndex === i || particle.connections.includes(targetIndex)) {
          targetIndex = Math.floor(Math.random() * particleCount);
        }
        particle.connections.push(targetIndex);
      }
    });
    
    // Track mouse position for interactive effect
    let mouseX = width / 2;
    let mouseY = height / 2;
    let mouseRadius = 150;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        // Calculate distance from mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Apply subtle force away from mouse cursor (Apple-like effect)
        if (distance < mouseRadius) {
          const force = (1 - distance / mouseRadius) * 0.03;
          p.vx -= dx * force / distance;
          p.vy -= dy * force / distance;
        }
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Apply friction
        p.vx *= 0.99;
        p.vy *= 0.99;
        
        // Wrap around screen edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        
        // Draw connections
        p.connections.forEach(connectionIndex => {
          const target = particles[connectionIndex];
          
          // Calculate distance to connected particle
          const dx2 = p.x - target.x;
          const dy2 = p.y - target.y;
          const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          
          // Only draw connections if they're not too far apart
          if (distance2 < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(target.x, target.y);
            
            // Add subtle glow effect for connections near mouse
            const mouseDistance = Math.min(
              Math.sqrt(Math.pow(mouseX - p.x, 2) + Math.pow(mouseY - p.y, 2)),
              Math.sqrt(Math.pow(mouseX - target.x, 2) + Math.pow(mouseY - target.y, 2))
            );
            
            const opacity = mouseDistance < 100 
              ? 0.2 * (1 - mouseDistance / 100) 
              : 0.03 * (1 - distance2 / 150);
            
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.lineWidth = mouseDistance < 100 ? 1.5 : 1;
            ctx.stroke();
          }
        });
        
        // Draw particle
        ctx.beginPath();
        
        // Make particles closer to mouse slightly larger and more opaque
        const sizeMultiplier = distance < 100 ? 1 + (1 - distance / 100) * 1.5 : 1;
        const finalSize = p.size * sizeMultiplier;
        
        ctx.arc(p.x, p.y, finalSize, 0, Math.PI * 2);
        
        // Particles closer to mouse are more intense
        const intensity = distance < 100 ? 0.6 * (1 - distance / 100) + 0.2 : 0.2;
        ctx.fillStyle = `rgba(0, 0, 0, ${intensity})`;
        
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      if (!containerRef.current) return;
      width = canvas.width = containerRef.current.clientWidth;
      height = canvas.height = containerRef.current.clientHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={containerRef} className={cn("min-h-screen relative bg-gradient-to-b from-gray-50 to-white overflow-hidden", className)}>
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      <div className="container mx-auto px-6 relative z-10 pt-40 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3">
            <span className="inline-block mb-4 px-3 py-1 text-xs font-medium bg-gray-100 rounded-full">
              Backend Developer & DevOps Engineer
            </span>
            <h1 className="text-5xl md:text-6xl font-medium mb-6 tracking-tight">
              Siddharth Ajith
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              I architect and build robust backend systems and cloud infrastructure, 
              specializing in Java, Spring Boot, AWS, and exploring the frontiers of AI.
            </p>
            <div className="mb-8">
              <SocialLinks iconSize={24} className="flex space-x-6" />
            </div>
            <Button href="#contact">Get in Touch</Button>
          </div>
          
          <div className="lg:col-span-2 relative">
            <div className="flex flex-col space-y-6">
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:transform hover:scale-[1.03] hover:shadow-lg">
                <Avatar className="w-full h-full rounded-2xl">
                  <AvatarImage
                    src="/lovable-uploads/5d598e74-6690-4ec7-904b-c9b9405e9ebd.png"
                    alt="Siddharth Ajith"
                    className="object-cover"
                  />
                  <AvatarFallback className="text-9xl bg-gray-100">SA</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
