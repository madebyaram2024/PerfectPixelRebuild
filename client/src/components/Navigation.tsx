import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Code } from 'lucide-react';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1" onClick={closeMobileMenu}>
            <span className="text-xl font-bold" style={{ color: '#09bba5' }}>{'< / >'}</span>
            <span className="text-xl font-bold ml-2">
              Perfect<span style={{ color: '#09bba5' }}>Pixel</span><span className="text-white">AI</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-300 ${
                  location === link.href 
                    ? 'font-bold' 
                    : 'text-white'
                }`}
                style={location === link.href ? { color: '#09bba5' } : { color: 'white' }}
                onMouseEnter={(e) => e.target.style.color = '#09bba5'}
                onMouseLeave={(e) => e.target.style.color = location === link.href ? '#09bba5' : 'white'}
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-white hover:text-primary transition-colors duration-300">
              <i className="fas fa-sign-in-alt mr-2"></i>Login
            </button>
            <button className="btn-primary px-4 py-2 rounded-lg font-semibold">
              Sign Up
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="text-xl" /> : <Menu className="text-xl" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-primary/20">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2 transition-colors ${
                    location === link.href 
                      ? 'font-bold' 
                      : 'text-white'
                  }`}
                  style={location === link.href ? { color: '#09bba5' } : { color: 'white' }}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex space-x-4 px-3 py-2">
                <button className="text-white hover:text-primary">Login</button>
                <button className="btn-primary px-4 py-2 rounded-lg">Sign Up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
