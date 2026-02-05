import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Personal', href: '/#personal' },
  { name: 'Professional', href: '/#professional' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
  { name: 'Resume', href: '/Fahim_Kamal_Resume.pdf', external: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-text-primary text-sm tracking-wider uppercase hover:text-accent transition-colors"
          >
            Fahim Kamal
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary text-sm tracking-wide uppercase hover:text-text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <a
                    href={link.href}
                    className="text-text-secondary text-sm tracking-wide uppercase hover:text-text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-primary hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-64 mt-4' : 'max-h-0'
          }`}
        >
          <ul className="flex flex-col gap-1 pb-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.external ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-4 text-text-secondary text-sm tracking-wide uppercase hover:text-text-primary hover:bg-surface/50 rounded transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 px-4 text-text-secondary text-sm tracking-wide uppercase hover:text-text-primary hover:bg-surface/50 rounded transition-colors"
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
