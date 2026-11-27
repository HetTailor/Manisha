import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from 'motion/react';

/**
 * Silky international agency cubic-bezier curves — smooth deceleration with zero overshoot.
 */
export const EASE_STUDIO: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_INTERACTION: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.14 as const,
  margin: '0px 0px -36px 0px',
};

/**
 * Thin red-to-gold scroll progress indicator anchored to the top navbar edge.
 */
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 32,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF0000] via-[#C99A50] to-[#FF0000] origin-left pointer-events-none"
    />
  );
};

interface RevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  delay?: number;
  duration?: number;
  immediate?: boolean;
}

/**
 * Scroll-triggered (or immediate mount) smooth reveal using GPU-composited properties only.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  direction = 'up',
  distance = 22,
  delay = 0,
  duration = 0.68,
  immediate = false,
  className,
  ...rest
}) => {
  const prefersReduced = useReducedMotion();

  const offset = prefersReduced
    ? { x: 0, y: 0 }
    : {
        x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
        y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      };

  const initialState = { opacity: 0, x: offset.x, y: offset.y };
  const targetState = { opacity: 1, x: 0, y: 0 };

  if (immediate) {
    return (
      <motion.div
        initial={initialState}
        animate={targetState}
        transition={{ duration: prefersReduced ? 0.01 : duration, delay, ease: EASE_STUDIO }}
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={initialState}
      whileInView={targetState}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: prefersReduced ? 0.01 : duration, delay, ease: EASE_STUDIO }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface MaskedTextRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  immediate?: boolean;
  className?: string;
}

/**
 * Editorial masked upward glide for display headlines and titles.
 */
export const MaskedTextReveal: React.FC<MaskedTextRevealProps> = ({
  children,
  delay = 0,
  duration = 0.72,
  immediate = false,
  className,
}) => {
  const prefersReduced = useReducedMotion();

  const innerProps = immediate
    ? {
        initial: { opacity: 0, y: prefersReduced ? 0 : '38%' },
        animate: { opacity: 1, y: '0%' },
      }
    : {
        initial: { opacity: 0, y: prefersReduced ? 0 : '38%' },
        whileInView: { opacity: 1, y: '0%' },
        viewport: VIEWPORT_ONCE,
      };

  return (
    <div className={`overflow-hidden ${className || ''}`}>
      <motion.div
        {...innerProps}
        transition={{
          duration: prefersReduced ? 0.01 : duration,
          delay,
          ease: EASE_STUDIO,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

interface ImageRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  immediate?: boolean;
  className?: string;
}

/**
 * Subtle agency image reveal — gentle opacity fade and micro-scale settle without distorting proportions.
 */
export const ImageReveal: React.FC<ImageRevealProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  immediate = false,
  className,
}) => {
  const prefersReduced = useReducedMotion();

  const motionProps = immediate
    ? {
        initial: { opacity: 0, scale: prefersReduced ? 1 : 1.04 },
        animate: { opacity: 1, scale: 1 },
      }
    : {
        initial: { opacity: 0, scale: prefersReduced ? 1 : 1.04 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: VIEWPORT_ONCE,
      };

  return (
    <motion.div
      {...motionProps}
      transition={{
        duration: prefersReduced ? 0.01 : duration,
        delay,
        ease: EASE_STUDIO,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SubtleParallaxProps {
  children: React.ReactNode;
  offsetPx?: number;
  className?: string;
}

/**
 * Restrained scroll-linked parallax wrapper strictly for editorial depth.
 * Automatically disabled when the user prefers reduced motion.
 */
export const SubtleParallax: React.FC<SubtleParallaxProps> = ({
  children,
  offsetPx = 22,
  className,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offsetPx, offsetPx]);

  return (
    <div ref={ref} className={`overflow-hidden ${className || ''}`}>
      <motion.div
        style={{ y: prefersReduced ? 0 : y }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

interface HairlineRuleProps {
  delay?: number;
  immediate?: boolean;
  className?: string;
}

/**
 * Smooth left-to-right accent rule draw for editorial section headers.
 */
export const HairlineRule: React.FC<HairlineRuleProps> = ({
  delay = 0.14,
  immediate = false,
  className = 'w-20 h-0.5 bg-gradient-to-r from-[#FF0000] to-[#C99A50] rounded-full',
}) => {
  const prefersReduced = useReducedMotion();

  if (immediate) {
    return (
      <motion.div
        initial={{ scaleX: prefersReduced ? 1 : 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: prefersReduced ? 0.01 : 0.7, delay, ease: EASE_STUDIO }}
        className={`origin-left ${className}`}
      />
    );
  }

  return (
    <motion.div
      initial={{ scaleX: prefersReduced ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: prefersReduced ? 0.01 : 0.7, delay, ease: EASE_STUDIO }}
      className={`origin-left ${className}`}
    />
  );
};

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  immediate?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.09,
  delayChildren = 0.05,
  immediate = false,
  className,
  ...rest
}) => {
  const prefersReduced = useReducedMotion();

  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : staggerDelay,
        delayChildren: prefersReduced ? 0 : delayChildren,
      },
    },
  };

  if (immediate) {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  yOffset?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  yOffset = 20,
  className,
  ...rest
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: prefersReduced ? 0 : yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: prefersReduced ? 0.01 : 0.62,
            ease: EASE_STUDIO,
          },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface CountUpNumberProps {
  target: number;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/**
 * Animated tabular numeral counter triggered once on viewport entry.
 */
export const CountUpNumber: React.FC<CountUpNumberProps> = ({
  target,
  suffix = '',
  durationMs = 1350,
  className,
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReduced = useReducedMotion();
  const [value, setValue] = useState(prefersReduced ? target : 0);

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    let rafId = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Quintic ease-out for calm, editorial deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, durationMs, prefersReduced]);

  return (
    <span ref={ref} className={`tabular-nums ${className || ''}`}>
      {value}
      {suffix}
    </span>
  );
};
