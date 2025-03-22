
import { useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  date: string;
  readTime: string;
  className?: string;
  style?: React.CSSProperties;
}

const BlogCard = ({
  id,
  title,
  excerpt,
  imageSrc,
  date,
  readTime,
  className = "",
  style,
}: BlogCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article 
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
      <div className="h-48 relative overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title}
          className="w-full h-full object-cover"
          style={{ 
            transition: "transform 0.7s ease-out",
            transform: isHovered ? "scale(1.03)" : "scale(1)" 
          }}
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-xs text-gray-500 mb-3 space-x-4">
          <span className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" /> {date}
          </span>
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" /> {readTime}
          </span>
        </div>
        
        <h3 className="text-xl font-medium mb-2 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
          {excerpt}
        </p>
        
        <Link 
          to={`/blog/${id}`} 
          className="inline-flex items-center text-sm font-medium text-black transition-all"
          style={{
            transform: isHovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.3s ease"
          }}
        >
          Read More <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
