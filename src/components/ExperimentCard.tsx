
import { useState } from "react";
import { Beaker, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperimentCardProps {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  className?: string;
  style?: React.CSSProperties;
}

const ExperimentCard = ({
  title,
  description,
  technologies,
  link,
  className = "",
  style,
}: ExperimentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "group relative p-6 rounded-xl overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-md",
        className
      )}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-3">
            <Beaker className="h-4 w-4 text-gray-500" />
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Experiment</span>
          </div>
          
          <h3 className="text-xl font-medium mb-2">{title}</h3>
          <p className="text-gray-600 mb-4 text-sm">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {technologies.map((tech) => (
              <span key={tech} className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center text-sm font-medium text-black hover:text-gray-700 transition-colors"
      >
        View Experiment <ArrowUpRight className="ml-1 h-4 w-4" />
      </a>
      
      {/* Animated gradient border */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mask-gradient-border rounded-xl transition-opacity duration-300 pointer-events-none ${
          isHovered ? "opacity-10" : "opacity-0"
        }`}
      ></div>
    </div>
  );
};

export default ExperimentCard;
