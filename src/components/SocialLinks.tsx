
import { Github, Twitter, Linkedin, Mail, Instagram } from "lucide-react";

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

const SocialLinks = ({ className = "", iconSize = 20 }: SocialLinksProps) => {
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/username",
      icon: <Github size={iconSize} />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/username",
      icon: <Twitter size={iconSize} />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/username",
      icon: <Linkedin size={iconSize} />,
    },
    {
      name: "Instagram",
      url: "https://instagram.com/username",
      icon: <Instagram size={iconSize} />,
    },
    {
      name: "Email",
      url: "mailto:email@example.com",
      icon: <Mail size={iconSize} />,
    },
  ];

  return (
    <div className={className}>
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
