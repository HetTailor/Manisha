import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useReducedMotion,
} from 'motion/react';

/**
 * MANISHA GRAPHIX — Luxury Print Atelier Motion System
 * Weighted architectural curves inspired by offset plate registration,
 * hot-foil stamping sweeps, and bespoke editorial stationery.
 */
export const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const CRISP_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 0.12 as const,
};

/**
 * Hairline Crimson-to-Gold Scroll Progress Ribbon pinned along Navbar bottom
 */
export const ScrollProgressRibbon: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF0000] via-[#C99A50] to-[#FF0000] pointer-events-none z-50"
    />
  );
};

/**
 * Smooth Scroll-Triggered Elevation & Opacity Reveal
 */
interface LuxuryRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  className?: string;
  immediate?: boolean;
}

export const LuxuryReveal: React.FC<LuxuryRevealProps> = ({
  children,
  delay = 0,
  duration = 0.72,
  y = 26,
  x = 0,
  className = '',
  immediate = false,
}) => {
  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, y, x }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration, delay, ease: LUXURY_EASE }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration, delay, ease: LUXURY_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Editorial Masked Typography Reveal (glides cleanly up from baseline)
 */
interface TextMaskRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  immediate?: boolean;
}

export const TextMaskReveal: React.FC<TextMaskRevealProps> = ({
  children,
  delay = 0,
  duration = 0.78,
  className = '',
  immediate = false,
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      {immediate ? (
        <motion.div
          initial={{ y: '105%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration, delay, ease: LUXURY_EASE }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          initial={{ y: '105%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={VIEWPORT_CONFIG}
          transition={{ duration, delay, ease: LUXURY_EASE }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

/**
 * Foil-Stamped Horizontal Accent Line Draw
 */
interface AtelierLineDrawProps {
  className?: string;
  delay?: number;
  origin?: 'left' | 'center';
  immediate?: boolean;
}

export const AtelierLineDraw: React.FC<AtelierLineDrawProps> = ({
  className = 'w-20 h-0.5 bg-gradient-to-r from-[#FF0000] to-[#C99A50] rounded-full',
  delay = 0.15,
  origin = 'left',
  immediate = false,
}) => {
  const originStyle = origin === 'center' ? '50% 50%' : '0% 50%';
  if (immediate) {
    return (
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        style={{ transformOrigin: originStyle }}
        transition={{ duration: 0.75, delay, ease: LUXURY_EASE }}
        className={className}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={VIEWPORT_CONFIG}
      style={{ transformOrigin: originStyle }}
      transition={{ duration: 0.75, delay, ease: LUXURY_EASE }}
      className={className}
    />
  );
};

/**
 * Pointer-Reactive Metallic Gold Foil Sheen Card Wrapper
 * Subtle warm golden specular reflection tracks pointer on hover,
 * evoking embossed foil-stamped luxury print stock.
 */
interface FoilShineCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  delay?: number;
  hoverLift?: number;
  enableLayout?: boolean;
}

export const FoilShineCard: React.FC<FoilShineCardProps> = ({
  children,
  className = '',
  onClick,
  delay = 0,
  hoverLift = -5,
  enableLayout = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, visible: false });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, visible: true });
  };

  const handleMouseLeave = () => {
    setSpotlight(prev => ({ ...prev, visible: false }));
  };

  return (
    <motion.div
      ref={cardRef}
      layout={enableLayout}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      whileHover={prefersReduced ? undefined : { y: hoverLift }}
      transition={{
        opacity: { duration: 0.65, delay, ease: LUXURY_EASE },
        y: { duration: 0.45, delay: 0, ease: CRISP_EASE },
        layout: { duration: 0.45, ease: LUXURY_EASE },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative ${className}`}
    >
      {/* Pointer-Tracked Metallic Gold Foil Glint */}
      {!prefersReduced && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-20"
          style={{
            opacity: spotlight.visible ? 1 : 0,
            background: `radial-gradient(380px circle at ${spotlight.x}% ${spotlight.y}%, rgba(201, 154, 80, 0.16), rgba(255, 0, 0, 0.04) 40%, transparent 72%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};

/**
 * Scroll-Triggered Luxury Numeric Counter (e.g., 25+, 2500+, 95%)
 */
interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = '',
  duration = 1600,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState<number>(prefersReduced ? target : 0);

  useEffect(() => {
    if (prefersReduced) {
      setCount(target);
      return;
    }
    if (!isInView) return;

    let animationFrameId: number;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Luxury easeOutExpo curve
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration, prefersReduced]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {count}
      {suffix}
    </span>
  );
};
