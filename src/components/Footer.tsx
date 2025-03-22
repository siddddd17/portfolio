
import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
          <div>
            <Link to="/" className="text-xl font-medium tracking-tight">
              Siddharth Ajith
            </Link>
            <p className="mt-4 text-gray-600 text-sm max-w-md">
              Building digital experiences that combine elegant design with 
              powerful functionality.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-black text-sm transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-black text-sm transition-colors">About</Link></li>
              <li><Link to="/projects" className="text-gray-600 hover:text-black text-sm transition-colors">Projects</Link></li>
              <li><Link to="/experimental" className="text-gray-600 hover:text-black text-sm transition-colors">Experimental</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-black text-sm transition-colors">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">Connect</h3>
            <SocialLinks className="flex space-x-4 mb-4" />
            <p className="text-gray-600 text-sm">
              Feel free to reach out if you'd like to collaborate or just say hello!
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {currentYear} Siddharth Ajith. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm mt-2 md:mt-0">
            Designed & Developed with precision
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
