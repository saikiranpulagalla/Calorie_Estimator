import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Menu, X, Apple } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="nutrify-container">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <span className="text-nutrify-accent">
              <Apple size={28} />
            </span>
            <span className={`font-bold text-xl ${isScrolled ? 'text-nutrify-accent' : 'text-nutrify-accent'}`}>
              Nutrify
            </span>
          </Link>

          {/* Language Switcher Dropdown */}
          <div className="relative mr-2">
            <button className="px-3 py-1 rounded bg-white border border-nutrify-accent text-nutrify-accent font-medium flex items-center" tabIndex={0}>
              {t('Select Language')}
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow z-50">
              <button onClick={() => i18n.changeLanguage('en')} className={`block w-full text-left px-4 py-2 hover:bg-nutrify-light ${i18n.language === 'en' ? 'font-bold text-nutrify-accent' : ''}`}>English</button>
              <button onClick={() => i18n.changeLanguage('hi')} className={`block w-full text-left px-4 py-2 hover:bg-nutrify-light ${i18n.language === 'hi' ? 'font-bold text-nutrify-accent' : ''}`}>हिंदी</button>
              <button onClick={() => i18n.changeLanguage('te')} className={`block w-full text-left px-4 py-2 hover:bg-nutrify-light ${i18n.language === 'te' ? 'font-bold text-nutrify-accent' : ''}`}>తెలుగు</button>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" label="Home" isScrolled={isScrolled} />
            <NavLink to="/about" label="About" isScrolled={isScrolled} />

            {isAuthenticated ? (
              <Link 
                to="/dashboard" 
                className="nutrify-btn-primary"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="nutrify-btn-outline"
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="nutrify-btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className={isScrolled ? 'text-gray-800' : 'text-nutrify-accent'} />
            ) : (
              <Menu size={24} className={isScrolled ? 'text-gray-800' : 'text-nutrify-accent'} />
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 transition-all duration-300 ease-in-out">
            <div className="flex flex-col space-y-4">
              <MobileNavLink to="/" label="Home" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/about" label="About" onClick={() => setIsOpen(false)} />
              
              {isAuthenticated ? (
                <Link 
                  to="/dashboard" 
                  className="nutrify-btn-primary text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="nutrify-btn-outline text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link 
                    to="/register" 
                    className="nutrify-btn-primary text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  isScrolled: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, isScrolled }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const { t } = useTranslation();
  
  return (
    <Link 
      to={to}
      className={`
        font-medium hover:text-nutrify-accent transition-colors
        ${isActive 
          ? 'text-nutrify-accent' 
          : isScrolled 
            ? 'text-gray-800'
            : 'text-gray-800'
        }
      `}
    >
      {t(label)}
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  label: string;
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const { t } = useTranslation();
  
  return (
    <Link 
      to={to}
      className={`
        py-2 font-medium text-center
        ${isActive ? 'text-nutrify-accent' : 'text-gray-800'}
      `}
      onClick={onClick}
    >
      {t(label)}
    </Link>
  );
};

export default Navbar;