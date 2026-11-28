/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { EASE_STUDIO } from './components/MotionPrimitives';
import { BRAND } from './data/content';

const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then((m) => ({ default: m.PortfolioPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const QuoteModal = lazy(() => import('./components/QuoteModal').then((m) => ({ default: m.QuoteModal })));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center pt-24">
      <div className="w-7 h-7 rounded-full border-2 border-[#C99A50]/30 border-t-[#FF0000] animate-spin" aria-label="Loading page" />
    </div>
  );
}

function AppContent() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const { currentRoute } = useNavigation();
  const { theme } = useTheme();

  const handleSelectServiceForQuote = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setIsQuoteModalOpen(true);
  };

  const handleOpenDefaultQuote = () => {
    setPreselectedServiceId('stationery-printing');
    setIsQuoteModalOpen(true);
  };

  return (
    <div className={`min-h-screen ${theme.bgCanvas} ${theme.textBody} font-sans antialiased relative overflow-x-clip selection:bg-[#FF0000] selection:text-white transition-colors duration-500 flex flex-col justify-between`}>
      
      {/* 1. Global Navigation Bar */}
      <Navbar onOpenQuoteModal={handleOpenDefaultQuote} />

      {/* 2. Page Router (Discrete Pages per Route with Smooth Transitions) */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentRoute}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.34, ease: EASE_STUDIO }}
          >
            <Suspense fallback={<PageLoader />}>
              {currentRoute === 'home' && (
                <HomePage
                  onOpenQuoteModal={handleOpenDefaultQuote}
                  onSelectServiceForQuote={handleSelectServiceForQuote}
                />
              )}

              {currentRoute === 'about' && (
                <AboutPage onOpenQuoteModal={handleOpenDefaultQuote} />
              )}

              {currentRoute === 'services' && (
                <ServicesPage
                  onOpenQuoteModal={handleOpenDefaultQuote}
                  onSelectServiceForQuote={handleSelectServiceForQuote}
                />
              )}

              {currentRoute === 'portfolio' && (
                <PortfolioPage
                  onOpenQuoteModal={handleOpenDefaultQuote}
                  onSelectServiceForQuote={handleSelectServiceForQuote}
                />
              )}

              {currentRoute === 'contact' && (
                <ContactPage />
              )}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <motion.aside
        aria-label="WhatsApp Chat Action"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.55, ease: EASE_STUDIO }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
      >
        <motion.a
          href={`https://wa.me/${BRAND.contact.whatsapp}?text=Hello%20Manisha%20Graphix%2C%20I%20would%20like%20to%20inquire%20about%20a%20design%20or%20printing%20project.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Manisha Graphix on WhatsApp"
          title="Chat on WhatsApp"
          whileHover={{ y: -2, scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.22, ease: EASE_STUDIO }}
          className="group w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-[#C99A50] hover:bg-[#B0833D] text-white border border-white/25 shadow-xl shadow-[#C99A50]/35 hover:shadow-2xl hover:shadow-[#C99A50]/50 transition-[background-color,box-shadow] duration-300 cursor-pointer"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 32 32"
            fill="currentColor"
            className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-300 ease-out group-hover:scale-110"
          >
            <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.255.59 4.455 1.71 6.394L3.1 28.8l6.584-1.727a12.74 12.74 0 0 0 6.32 1.67h.006c7.058 0 12.796-5.74 12.796-12.8 0-3.42-1.332-6.635-3.75-9.052A12.72 12.72 0 0 0 16.004 3.2zm0 23.38h-.005a10.59 10.59 0 0 1-5.4-1.477l-.388-.23-3.907 1.025 1.043-3.81-.252-.402a10.56 10.56 0 0 1-1.622-5.63c0-5.847 4.758-10.604 10.61-10.604 2.833 0 5.495 1.105 7.498 3.11a10.54 10.54 0 0 1 3.104 7.5c0 5.847-4.758 10.518-10.68 10.518zm5.818-7.94c-.318-.16-1.887-.93-2.18-1.037-.292-.106-.505-.16-.717.16-.213.318-.824 1.037-1.01 1.25-.186.212-.372.24-.69.08-.32-.16-1.347-.497-2.565-1.584-.948-.846-1.588-1.89-1.774-2.208-.186-.32-.02-.492.14-.65.143-.143.318-.372.478-.558.16-.186.212-.32.318-.532.106-.213.053-.398-.027-.558-.08-.16-.717-1.728-.983-2.366-.26-.622-.522-.538-.717-.548-.186-.01-.398-.012-.61-.012-.213 0-.558.08-.85.398-.292.32-1.116 1.09-1.116 2.658 0 1.568 1.142 3.084 1.302 3.296.16.213 2.248 3.432 5.446 4.812.76.328 1.354.524 1.817.67.764.244 1.46.21 2.01.127.613-.092 1.887-.772 2.153-1.516.265-.744.265-1.382.186-1.516-.08-.133-.292-.212-.61-.372z" />
          </svg>
        </motion.a>
      </motion.aside>

      {/* Instant Estimation & Quote Calculator Modal */}
      {isQuoteModalOpen && (
        <Suspense fallback={null}>
          <QuoteModal
            isOpen={isQuoteModalOpen}
            onClose={() => setIsQuoteModalOpen(false)}
            preselectedServiceId={preselectedServiceId}
          />
        </Suspense>
      )}
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
