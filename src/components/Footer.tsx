import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { ManishaLogo } from './ManishaLogo';
import { Reveal, StaggerContainer, StaggerItem } from './MotionPrimitives';
import { useNavigation } from '../context/NavigationContext';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <footer id="contact" className="bg-[#000000] text-white pt-14 sm:pt-16 lg:pt-20 pb-14 sm:pb-16 lg:pb-16 border-t border-neutral-900 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Main Grid: Logo | Info Columns */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-start text-left" staggerDelay={0.1}>
          
          {/* Col 1: Logo & Tagline */}
          <StaggerItem className="space-y-4">
            <motion.button
              type="button"
              whileHover={{ opacity: 0.9 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigate('home')}
              className="focus:outline-none cursor-pointer text-left"
              aria-label="Manisha Graphix Home"
            >
              <ManishaLogo variant="dark" size="lg" showTagline={true} showText={true} priority={false} />
            </motion.button>
            
            <p className="text-xs text-neutral-400 font-sans leading-relaxed max-w-sm">
              Creative graphic design and professional printing solutions crafted with precision, quality and attention to detail.
            </p>
          </StaggerItem>

          {/* Col 2: Owner & Email */}
          <StaggerItem className="space-y-4">
            {/* Owner */}
            <div className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-full bg-[#C99A50] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm transition-transform duration-300 ease-out group-hover:scale-105">
                <User className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="block text-[10px] font-mono text-neutral-400 uppercase">Owner</span>
                <span className="font-bold text-white text-sm">Harshil Mistry</span>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-full bg-[#C99A50] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm transition-transform duration-300 ease-out group-hover:scale-105">
                <Mail className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="block text-[10px] font-mono text-neutral-400 uppercase">Email</span>
                <a 
                  href="mailto:manishagraphix@gmail.com" 
                  className="font-medium text-neutral-300 hover:text-[#C99A50] transition-colors duration-250 break-all"
                >
                  manishagraphix@gmail.com
                </a>
              </div>
            </div>
          </StaggerItem>

          {/* Col 3: Phone & Address */}
          <StaggerItem className="space-y-4">
            {/* Phone */}
            <div className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-full bg-[#C99A50] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm transition-transform duration-300 ease-out group-hover:scale-105">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="block text-[10px] font-mono text-neutral-400 uppercase">Phone</span>
                <a 
                  href="tel:+919726803078" 
                  className="font-bold text-white hover:text-[#FF0000] transition-colors duration-250 font-mono"
                >
                  +91 97268 03078
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3 group">
              <div className="w-8 h-8 rounded-full bg-[#C99A50] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm transition-transform duration-300 ease-out group-hover:scale-105">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="block text-[10px] font-mono text-neutral-400 uppercase">Address</span>
                <span className="text-neutral-300 font-sans leading-relaxed">
                  Yuvraj Advantage Here, Vadodara, Gujarat
                </span>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>

        {/* Bottom Bar: Copyright & Footer Nav Links */}
        <Reveal delay={0.14} distance={14} className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div>
            © {new Date().getFullYear()} Manisha Graphix. All Rights Reserved.
          </div>

          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <button type="button" onClick={() => navigate('home')} className="hover:text-white transition-colors duration-250 link-underline-glide cursor-pointer">Home</button>
            <button type="button" onClick={() => navigate('about')} className="hover:text-white transition-colors duration-250 link-underline-glide cursor-pointer">About</button>
            <button type="button" onClick={() => navigate('services')} className="hover:text-white transition-colors duration-250 link-underline-glide cursor-pointer">Services</button>
            <button type="button" onClick={() => navigate('portfolio')} className="hover:text-white transition-colors duration-250 link-underline-glide cursor-pointer">Portfolio</button>
            <button type="button" onClick={() => navigate('contact')} className="hover:text-white transition-colors duration-250 link-underline-glide cursor-pointer">Contact</button>
          </nav>
        </Reveal>

      </div>
    </footer>
  );
};
