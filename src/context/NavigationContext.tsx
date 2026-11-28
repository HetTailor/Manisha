import React, { createContext, useContext, useState, useEffect } from 'react';

export type RouteId = 'home' | 'about' | 'services' | 'portfolio' | 'contact';

interface NavigationContextType {
  currentRoute: RouteId;
  navigate: (route: RouteId) => void;
  isActive: (route: RouteId) => boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const SITE_BASE_URL = 'https://manisha-sigma.vercel.app';

const ROUTE_SEO: Record<RouteId, { title: string; description: string; path: string }> = {
  home: {
    title: 'MANISHA GRAPHIX — Graphic Design & Professional Printing',
    description:
      'Creative graphic design and professional printing solutions for stationery, wedding cards, pharmaceutical packaging, and book work in Vadodara.',
    path: '/',
  },
  about: {
    title: 'About Us — MANISHA GRAPHIX | Harshil Mistry',
    description:
      'Learn about MANISHA GRAPHIX and founder Harshil Mistry — over 12 years of expertise in graphic design, pharmaceutical packaging, and offset printing.',
    path: '/about',
  },
  services: {
    title: 'Services — MANISHA GRAPHIX | Stationery, Wedding, Pharma & Books',
    description:
      'Explore our commercial graphic design and printing services: corporate stationery, luxury wedding invitations, pharmaceutical packaging, and book work.',
    path: '/services',
  },
  portfolio: {
    title: 'Portfolio — MANISHA GRAPHIX | 18 Featured Design Projects',
    description:
      'Browse 18 design projects by MANISHA GRAPHIX across stationery, wedding cards, pharmaceutical packaging, and devotional book covers.',
    path: '/portfolio',
  },
  contact: {
    title: 'Contact Us — MANISHA GRAPHIX | Vadodara Printing Studio',
    description:
      'Contact MANISHA GRAPHIX in Vadodara for custom print quotations, design consultations, or WhatsApp inquiries directly with Harshil Mistry.',
    path: '/contact',
  },
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getRouteFromUrl = (): RouteId => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
    if (hash === 'about') return 'about';
    if (hash === 'services') return 'services';
    if (hash === 'portfolio') return 'portfolio';
    if (hash === 'contact') return 'contact';
    
    // Check pathname if no hash
    const path = window.location.pathname.toLowerCase().replace(/^\//, '').replace(/\/$/, '');
    if (path === 'about') return 'about';
    if (path === 'services') return 'services';
    if (path === 'portfolio') return 'portfolio';
    if (path === 'contact') return 'contact';

    return 'home';
  };

  const [currentRoute, setCurrentRoute] = useState<RouteId>(getRouteFromUrl);

  const navigate = (route: RouteId) => {
    setCurrentRoute(route);
    const targetHash = route === 'home' ? '' : `#/${route}`;
    if (window.location.hash !== targetHash) {
      if (route === 'home') {
        history.pushState(null, '', window.location.pathname);
      } else {
        window.location.hash = targetHash;
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getRouteFromUrl());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const seo = ROUTE_SEO[currentRoute];
    document.title = seo.title;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector);
      if (el) el.setAttribute('content', content);
    };

    const canonicalUrl = `${SITE_BASE_URL}${seo.path}`;
    setMeta('meta[name="description"]', seo.description);
    setMeta('meta[property="og:title"]', seo.title);
    setMeta('meta[property="og:description"]', seo.description);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[name="twitter:title"]', seo.title);
    setMeta('meta[name="twitter:description"]', seo.description);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }
  }, [currentRoute]);

  const isActive = (route: RouteId) => currentRoute === route;

  return (
    <NavigationContext.Provider value={{ currentRoute, navigate, isActive }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
