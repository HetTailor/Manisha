import React, { createContext, useContext, useState, useEffect } from 'react';

export type RouteId = 'home' | 'about' | 'services' | 'portfolio' | 'contact';

interface NavigationContextType {
  currentRoute: RouteId;
  navigate: (route: RouteId) => void;
  isActive: (route: RouteId) => boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getRouteFromUrl = (): RouteId => {
    if (typeof window === 'undefined') return 'home';
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '');
    if (hash === 'about') return 'about';
    if (hash === 'services') return 'services';
    if (hash === 'portfolio') return 'portfolio';
    if (hash === 'contact') return 'contact';
    
    // Check pathname if no hash
    const path = window.location.pathname.toLowerCase().replace(/^\//, '');
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
