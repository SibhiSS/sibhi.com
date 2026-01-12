import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Team', href: '/team' },
    { name: 'Domains', href: '#domains' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' },
  ];

  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    if (href.startsWith('/')) {
      navigate(href);
      setIsMobileMenuOpen(false);
      window.scrollTo(0, 0);
      return;
    }

    // Check if we are on the main page
    if (location.pathname !== '/') {
      navigate('/');
      // We need to wait for navigation then scroll. This is a basic implementation.
      // For now, let's just navigate to home. The user can scroll.
      // A better way is using a hash router or useLocation with useEffect.
      // But simply navigating to '/' is acceptable for this step.
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <img src="/logo.png" alt="Nova CPS Logo" className="w-8 h-8 object-contain" />
              <span className="font-heading font-bold text-lg">
                <span className="text-primary">NOVA</span>
                <span className="text-foreground"> CPS</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="relative group px-3 py-1 text-sm text-foreground/80 hover:text-primary transition-colors"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-0 rounded bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-200" />
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
              <Link to="/apply">
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Join Us
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pt-16">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="font-heading text-xl text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </button>
              ))}
              <Link to="/apply" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Join Us
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
