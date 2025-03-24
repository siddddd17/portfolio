
import { Github, Twitter, Linkedin, Mail, Instagram } from "lucide-react";

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

const SocialLinks = ({ className = "", iconSize = 20 }: SocialLinksProps) => {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/siddddd17",
      icon: <Github size={iconSize} />,
    },
    {
      name: "Twitter",
      url: "https://x.com/mv5ive",
      icon: <Twitter size={iconSize} />,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/siddharthajith/",
      icon: <Linkedin size={iconSize} />,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/siddddd17/#",
      icon: <Instagram size={iconSize} />,
    },
    {
      name: "Email",
      url: "mailto:siddharthajith1717@gmail.com",
      icon: <Mail size={iconSize} />,
    },
  ];

  return (
    <div className={`flex items-center space-x-5 ${className}`}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black transition-colors duration-300"
          aria-label={link.name}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
