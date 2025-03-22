
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  technologies: string[];
  link: string;
  className?: string;
  style?: React.CSSProperties;
}

const ProjectCard = ({
  title,
  description,
  imageSrc,
  technologies,
  link,
  className = "",
  style,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "group rounded-xl overflow-hidden border border-gray-200 bg-white transition-all duration-300",
        className
      )}
      style={{
        ...style,
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        boxShadow: isHovered ? "0 20px 30px rgba(0, 0, 0, 0.08)" : "0 4px 10px rgba(0, 0, 0, 0.03)",
        transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-64 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
          style={{ 
            backgroundImage: `url(${imageSrc})`,
            transform: isHovered ? "scale(1.03)" : "scale(1)" 
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6 relative">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 text-sm">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span key={tech} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <a 
          href={link} 
          className="inline-flex items-center text-sm font-medium text-black transition-all"
          style={{
            transform: isHovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.3s ease"
          }}
        >
          View Project <ArrowUpRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
