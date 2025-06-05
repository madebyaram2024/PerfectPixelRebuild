
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="py-16 bg-muted border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-1 mb-6">
              <span className="text-xl font-bold" style={{ color: '#09bba5' }}>{'< / >'}</span>
              <span className="text-xl font-bold ml-2">
                Perfect<span style={{ color: '#09bba5' }}>Pixel</span><span className="text-foreground">AI</span>
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Professional web development with AI-boosted workflow. Custom websites delivered fast, built right.
            </p>
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="X (Twitter)"
              >
                <i className="fab fa-x-twitter text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-white transition-colors">
                  Website Design
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-white transition-colors">
                  Website Redesign
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-white transition-colors">
                  Web Hosting
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-white transition-colors">
                  SEO Services
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-muted-foreground hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-primary/20 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 PerfectPixel AI. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Built with Human and Artificial Collaborative Intelligence
          </p>
        </div>
      </div>
    </footer>
  );
}
