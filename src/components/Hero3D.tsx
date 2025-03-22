
import { useEffect, useRef } from "react";
import Button from "./Button";

const Hero3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D animation setup
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Simple particle system simulation
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    // Handle mouse movement for parallax effect
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / width - 0.5;
      mouseY = e.clientY / height - 0.5;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Apply slight movement based on mouse position (parallax effect)
        p.x += p.speedX + mouseX * 2;
        p.y += p.speedY + mouseY * 2;
        
        // Wrap around screen edges
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
        if (p.y > height) p.y = 0;
        if (p.y < 0) p.y = height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${p.opacity})`;
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const heroElement = containerRef.current;
      
      // Parallax effect on scroll
      const titleElement = heroElement.querySelector('.hero-title');
      const descriptionElement = heroElement.querySelector('.hero-description');
      
      if (titleElement) {
        (titleElement as HTMLElement).style.transform = `translateY(${scrollY * 0.2}px)`;
      }
      
      if (descriptionElement) {
        (descriptionElement as HTMLElement).style.transform = `translateY(${scrollY * 0.1}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas for 3D animation */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <h1 className="hero-title text-5xl md:text-7xl font-medium leading-tight mb-6 max-w-4xl">
          Creating Digital Experiences with Precision
        </h1>
        <p className="hero-description text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl">
          Hi, I'm Siddharth Ajith. I craft elegant, functional digital experiences
          that merge innovative design with cutting-edge technology.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button href="/projects" size="lg">
            View My Work
          </Button>
          <Button href="/about" variant="outline" size="lg">
            Learn About Me
          </Button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center animate-bounce">
          <div className="w-1 h-4 bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero3D;
