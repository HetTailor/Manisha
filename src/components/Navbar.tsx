import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { ManishaLogo } from './ManishaLogo';
import { ScrollProgressBar, EASE_STUDIO } from './MotionPrimitives';
import { useTheme } from '../context/ThemeContext';
import { useNavigation, RouteId } from '../context/NavigationContext';

interface NavbarProps {
  onOpenQuoteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentRoute, navigate } = useNavigation();
  const { colorMode, toggleColorMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: RouteId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
  ];

  const isLight = colorMode === 'light';

  return (
    <motion.header
      initial={{ y: -14, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: EASE_STUDIO }}
      className={`fixed top-0 inset-x-0 z-50 transition-[padding,box-shadow,background-color] duration-300 ${
        isLight 
          ? 'bg-white/95 border-b border-neutral-200/80 text-slate-800' 
          : 'bg-[#08080c]/95 border-b border-white/10 text-white'
      } backdrop-blur-md ${
        isScrolled ? 'py-2.5 shadow-md' : 'py-3 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo with Transparent Background */}
        <motion.button
          whileHover={{ opacity: 0.9 }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.2, ease: EASE_STUDIO }}
          onClick={() => navigate('home')}
          className="inline-flex items-center shrink-0 bg-transparent focus:outline-none cursor-pointer text-left"
          aria-label="Manisha Graphix Home"
        >
          <ManishaLogo variant={isLight ? 'light' : 'dark'} size="md" showTagline={false} />
        </motion.button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.id;
            return (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`relative py-1 transition-colors duration-250 cursor-pointer ${
                  isActive
                    ? 'text-[#FF0000] font-bold'
                    : isLight 
                      ? 'text-neutral-700 hover:text-[#FF0000] link-underline-glide' 
                      : 'text-neutral-300 hover:text-[#FF0000] link-underline-glide'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-indicator"
                    transition={{ duration: 0.36, ease: EASE_STUDIO }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF0000] to-[#C99A50] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Theme Switcher + "Get a Quote →" Pill */}
        <div className="hidden sm:flex items-center gap-2.5">
          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.2, ease: EASE_STUDIO }}
            onClick={toggleColorMode}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            aria-pressed={!isLight}
            title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-250 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF0000] ${
              isLight
                ? 'bg-neutral-100/90 hover:bg-neutral-200/90 border-neutral-200 text-neutral-800 hover:text-[#FF0000]'
                : 'bg-white/10 hover:bg-white/15 border-white/15 text-[#F5D595] hover:text-white'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isLight ? (
                <motion.span
                  key="moon-icon"
                  initial={{ opacity: 0, rotate: -25, scale: 0.85 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 25, scale: 0.85 }}
                  transition={{ duration: 0.22, ease: EASE_STUDIO }}
                  className="inline-flex items-center justify-center"
                >
                  <Moon className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="sun-icon"
                  initial={{ opacity: 0, rotate: 25, scale: 0.85 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -25, scale: 0.85 }}
                  transition={{ duration: 0.22, ease: EASE_STUDIO }}
                  className="inline-flex items-center justify-center"
                >
                  <Sun className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.22, ease: EASE_STUDIO }}
            onClick={onOpenQuoteModal}
            className="group flex items-center gap-1.5 px-6 py-2 rounded-full text-xs font-semibold bg-[#FF0000] hover:bg-[#D60000] text-white shadow-md shadow-red-600/20 hover:shadow-lg hover:shadow-red-600/30 transition-[background-color,box-shadow] duration-300 cursor-pointer"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Mobile Controls: Theme Switcher + Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.16, ease: EASE_STUDIO }}
            onClick={toggleColorMode}
            aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            aria-pressed={!isLight}
            title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            className={`sm:hidden w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-200 cursor-pointer ${
              isLight
                ? 'bg-neutral-100 border-neutral-200 text-neutral-800 hover:bg-neutral-200'
                : 'bg-white/10 border-white/15 text-[#F5D595] hover:bg-white/15'
            }`}
          >
            {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.16, ease: EASE_STUDIO }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg ${isLight ? 'text-neutral-800 hover:bg-neutral-100' : 'text-neutral-200 hover:bg-white/10'} transition-colors duration-200 cursor-pointer`}
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

      </div>

      {/* Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_STUDIO }}
            className={`md:hidden overflow-hidden ${isLight ? 'bg-white border-neutral-100' : 'bg-neutral-900 border-white/10'} border-t shadow-lg`}
          >
            <div className="px-4 pt-3 pb-6 flex flex-col gap-2.5 font-semibold text-sm">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.035, duration: 0.28, ease: EASE_STUDIO }}
                  onClick={() => {
                    navigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`py-2 px-3 rounded-lg text-left transition-colors duration-200 cursor-pointer ${
                    currentRoute === link.id
                      ? isLight ? 'bg-[#C99A50]/15 text-[#FF0000] border-l-3 border-[#C99A50] font-bold' : 'bg-[#C99A50]/20 text-[#FF0000] border-l-3 border-[#C99A50] font-bold'
                      : isLight ? 'text-neutral-700 hover:bg-neutral-50' : 'text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.28, ease: EASE_STUDIO }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="group mt-3 w-full py-3 rounded-full text-center font-bold text-sm bg-[#FF0000] hover:bg-[#D60000] text-white shadow-md flex items-center justify-center gap-2 transition-colors duration-250 cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
