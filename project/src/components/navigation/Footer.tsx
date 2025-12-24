import React from 'react';
import { Link } from 'react-router-dom';
import { Apple, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="nutrify-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Apple className="h-6 w-6 text-nutrify-accent" />
              <span className="text-xl font-bold text-gray-900">Nutrify</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-xs">
              Your AI-powered nutrition companion for healthier living through accurate food analysis.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={Instagram} label="Instagram" href="#" />
              <SocialLink icon={Twitter} label="Twitter" href="#" />
              <SocialLink icon={Facebook} label="Facebook" href="#" />
            </div>
          </div>
          
          {/* Navigation */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/login">Log In</FooterLink>
              <FooterLink href="/register">Sign Up</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink href="#">Blog</FooterLink>
              <FooterLink href="#">Nutrition Guide</FooterLink>
              <FooterLink href="#">Recipe Database</FooterLink>
              <FooterLink href="#">Research</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Nutrify. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-500 hover:text-gray-700 text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  icon: React.FC<{ size?: number }>;
  label: string;
  href: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, label, href }) => {
  return (
    <a 
      href={href} 
      aria-label={label}
      className="text-gray-500 hover:text-nutrify-accent transition-colors"
    >
      <Icon size={20} />
    </a>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li>
      <Link 
        to={href} 
        className="text-gray-600 hover:text-nutrify-accent transition-colors"
      >
        {children}
      </Link>
    </li>
  );
};

export default Footer;