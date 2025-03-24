
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import SocialLinks from "./SocialLinks";
import Button from "./Button";

interface ProfileSectionProps {
  className?: string;
}

const ProfileSection = ({ className }: ProfileSectionProps) => {
  return (
    <section className={cn("min-h-screen relative bg-gradient-to-b from-gray-50 to-white overflow-hidden", className)}>
      <div className="absolute inset-0 overflow-hidden">
        {/* Soundwave Animation - Apple AirPods Style */}
        <div className="soundwave">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="soundwave-bar"
              style={{ 
                left: `${5 + i * 5}%`,
                animationDelay: `${i * 0.1}s`,
                height: `${30 + Math.sin(i/2) * 20}%`,
                opacity: 0.6 - (Math.abs(i - 10) * 0.03)
              }}
            ></div>
          ))}
        </div>
      </div>

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
              {/* Profile image with hover effect */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:transform hover:scale-[1.03] hover:shadow-2xl">
                <Avatar className="w-full h-full rounded-2xl">
                  <AvatarImage
                    src="/lovable-uploads/5d598e74-6690-4ec7-904b-c9b9405e9ebd.png"
                    alt="Siddharth Ajith"
                    className="object-cover"
                  />
                  <AvatarFallback className="text-9xl bg-gradient-to-br from-gray-100 to-gray-50">SA</AvatarFallback>
                </Avatar>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-gray-200/50 rounded-full z-0 blur-md"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gray-300/50 rounded-xl z-0 blur-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
