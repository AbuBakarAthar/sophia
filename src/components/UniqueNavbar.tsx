import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export function UniqueNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, setIsDark } = useContext(ThemeContext);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50"
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-70 dark:bg-opacity-70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent"
          >
            SV
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ color: 'rgb(59, 130, 246)' }}
                onClick={() => scrollToSection(item.href)}
                className="relative text-gray-700 dark:text-gray-300 font-medium group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-600 to-green-600 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* Theme & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
          transition={{ duration: 0.2 }}
          className={`md:hidden mt-4 space-y-2 overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
        >
          {navItems.map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ x: 10 }}
              onClick={() => scrollToSection(item.href)}
              className="w-full text-left px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {item.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
}
