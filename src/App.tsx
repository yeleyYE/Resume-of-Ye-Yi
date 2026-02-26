/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, MapPin, Calendar, Briefcase, ArrowRight, 
  ChevronLeft, ChevronRight, Phone, Mail, Award, Globe,
  Zap, Layers, Users, Database, Target, Rocket, Shield
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import experiencesData from './data/experience.json';

interface ExperienceDetail {
  title: string;
  content: string;
}

interface Experience {
  id: number;
  company: string;
  period: string;
  role: string;
  location: string;
  images: string[];
  description: string;
  details: ExperienceDetail[];
  benchmarkCase?: {
    name: string;
    scale: string;
    items: ExperienceDetail[];
  };
}

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden apple-shadow group bg-white border border-font-primary/5">
      {/* Slide Counter - More prominent */}
      <div className="absolute top-4 right-4 z-30 px-4 py-1.5 rounded-full bg-apple-blue text-white text-xs md:text-sm font-bold tracking-widest uppercase shadow-lg">
        {currentIndex + 1} / {images.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ 
            imageRendering: '-webkit-optimize-contrast',
          }}
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      
      {/* Gradient Overlays for depth */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />

      {/* Navigation Arrows - Always visible and prominent */}
      <div className="absolute inset-0 flex items-center justify-between px-4 z-20">
        <button 
          onClick={prev} 
          className="p-3 rounded-full bg-apple-blue text-white hover:bg-apple-blue/90 transition-all duration-300 shadow-xl"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={next} 
          className="p-3 rounded-full bg-apple-blue text-white hover:bg-apple-blue/90 transition-all duration-300 shadow-xl"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Pagination Indicators - More visible */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentIndex 
                ? 'w-8 bg-apple-blue shadow-[0_0_8px_rgba(0,113,227,0.5)]' 
                : 'w-2 bg-font-primary/20 hover:bg-font-primary/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      
      {/* Swipe Hint for Mobile */}
      <div className="absolute bottom-4 right-4 lg:hidden animate-pulse">
        <div className="flex items-center gap-1 text-[10px] font-bold text-font-secondary">
          <span>SWIPE</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroRef = useRef(null);
  
  // Background breathing effect
  const [bgPos, setBgPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setBgPos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            x: bgPos.x, 
            y: bgPos.y,
          }}
          transition={{ type: 'spring', damping: 50, stiffness: 100 }}
          className="absolute -inset-[10%] opacity-30 blur-[120px]"
        >
          <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-apple-blue" />
          <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] rounded-full bg-apple-indigo" />
          <div className="absolute top-[40%] right-[30%] w-[30%] h-[30%] rounded-full bg-moonstone" />
        </motion.div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 py-20 md:px-12 lg:px-24">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Mobile Image (Visible only on small screens) */}
          <motion.div 
            className="lg:hidden relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="aspect-[5/4] w-full max-w-sm mx-auto rounded-[24px] overflow-hidden apple-shadow relative">
              <img 
                src="https://i.postimg.cc/vZg00HDW/微信图片_20251008205328_2290_17.jpg" 
                alt="Ye Yi" 
                style={{ imageRendering: 'auto' }}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Desktop Image (Left on desktop) */}
          <motion.div 
            className="hidden lg:block lg:col-span-5 relative"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <div className="aspect-[5/8] w-full rounded-[24px] overflow-hidden apple-shadow relative">
              <img 
                src="https://i.postimg.cc/vZg00HDW/微信图片_20251008205328_2290_17.jpg" 
                alt="Ye Yi" 
                style={{ imageRendering: 'auto' }}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Text Content (Right on desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 z-10"
          >
            <div className="glass p-6 md:p-12 rounded-[32px] apple-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-apple-blue/10 blur-[80px] -mr-32 -mt-32" />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="relative z-10"
              >
                <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-font-primary mb-2">
                  Hi there,<br />I’m <span className="gradient-text">Ye Yi.</span>
                </h1>
                <p className="text-2xl md:text-3xl font-medium text-font-secondary mb-6">叶怡</p>
              </motion.div>
              
              <motion.div 
                className="space-y-8 text-lg md:text-xl text-font-secondary leading-relaxed relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <div className="flex flex-col gap-2">
                  <p className="font-bold text-font-primary text-3xl tracking-tight">
                    2001.03.07
                  </p>
                  <p className="font-medium text-apple-blue">
                    南安普顿大学移动通信专业（一等学位）
                  </p>
                </div>
                
                <div className="space-y-6 pt-6 border-t border-font-primary/5">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-font-primary uppercase tracking-widest">
                      <Award className="w-4 h-4 text-apple-orange" />
                      专业能力
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {['亚太数学建模竞赛二等奖', '美国大学生数学建模竞赛S奖', '华为人工智能初级工程师HCIA-AI认证'].map((skill) => (
                        <span key={skill} className="px-4 py-2 rounded-xl bg-white/80 border border-font-primary/5 text-sm font-medium text-font-primary apple-shadow hover:scale-105 transition-transform cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-font-primary uppercase tracking-widest">
                      <Globe className="w-4 h-4 text-apple-blue" />
                      英语能力
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {['全国大学生英语竞赛二等奖', '雅思总分6.5'].map((skill) => (
                        <span key={skill} className="px-4 py-2 rounded-xl bg-white/80 border border-font-primary/5 text-sm font-medium text-font-primary apple-shadow hover:scale-105 transition-transform cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-font-4">Scroll</span>
          <ChevronDown className="w-5 h-5 text-font-4" />
        </motion.div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto space-y-32">
        {(experiencesData as Experience[]).map((exp, index) => (
          <div key={exp.id}>
            {index > 0 && (
              <div className="flex items-center justify-center py-20">
                <div className="w-px h-24 bg-gradient-to-b from-apple-blue/40 to-transparent" />
              </div>
            )}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-12"
            >
            {/* Carousel */}
            <div className="w-full">
              <Carousel images={exp.images} />
            </div>

            {/* Text Content */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-apple-blue/10 text-apple-blue text-base font-bold uppercase tracking-wider">
                    <Briefcase className="w-4 h-4" />
                    {exp.role}
                  </div>
                  <h2 className="text-3xl font-bold text-font-primary leading-tight">
                    {exp.company.split('-').map((part, i) => (
                      <span key={i} className="block">{part}</span>
                    ))}
                  </h2>
                  <div className="flex flex-col gap-2 text-font-secondary text-base font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-8 space-y-8">
                <div className="glass p-6 md:p-10 rounded-[32px] apple-shadow space-y-10 experience-card">
                  <div className="flex items-center justify-between border-b border-font-primary/5 pb-6">
                    <h3 className="text-2xl font-bold text-font-primary flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-apple-blue rounded-full" />
                      {exp.description}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-8">
                    {exp.details.map((detail, i) => {
                      const icons = [Zap, Layers, Users, Database];
                      const Icon = icons[i % icons.length];
                      return (
                        <div key={i} className="group flex gap-6">
                          <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-apple-blue/5 flex items-center justify-center group-hover:bg-apple-blue/10 transition-all duration-300 group-hover:scale-110">
                            <Icon className="w-6 h-6 text-apple-blue" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-lg font-bold text-font-primary group-hover:text-apple-blue transition-colors">
                              {detail.title}
                            </h4>
                            <p className="text-font-secondary leading-relaxed text-sm md:text-base opacity-90">
                              {detail.content}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Benchmark Case Row */}
              {exp.benchmarkCase && (
                <>
                  <div className="md:col-span-4 self-start pt-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="space-y-4"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lion/10 text-lion text-xs font-bold uppercase tracking-widest">
                        标杆案例
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-3xl font-bold text-font-primary leading-tight tracking-tight">
                          {exp.benchmarkCase.name}
                        </h3>
                        <p className="text-lg font-medium text-lion">
                          {exp.benchmarkCase.scale}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="md:col-span-8">
                    <div className="glass p-6 md:p-10 rounded-[32px] apple-shadow space-y-10 border-l-8 border-lion/40 experience-card">
                      <div className="flex items-center justify-between border-b border-lion/10 pb-6">
                        <div className="flex items-center gap-3 text-2xl font-bold text-font-primary">
                          <Target className="w-7 h-7 text-lion" />
                          标杆案例
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-10">
                        {exp.benchmarkCase.items.map((item, i) => {
                          const icons = [Shield, Rocket, Target];
                          const Icon = icons[i % icons.length];
                          return (
                            <div key={i} className="group flex gap-6">
                              <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-lion/5 flex items-center justify-center group-hover:bg-lion/10 transition-all duration-300 group-hover:scale-110">
                                <Icon className="w-6 h-6 text-lion" />
                              </div>
                              <div className="space-y-2">
                                <h4 className="text-lg font-bold text-font-primary group-hover:text-lion transition-colors">
                                  {item.title}
                                </h4>
                                <p className="text-font-secondary leading-relaxed text-sm md:text-base opacity-90">
                                  {item.content}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 text-center border-t border-font-1/5">
        <p className="text-font-4 text-sm font-medium tracking-wide">
          © {new Date().getFullYear()} Ye Yi. Crafted with Precision & Passion.
        </p>
      </footer>

      {/* Floating Contact Info */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50"
      >
        <div className="glass px-4 py-3 md:px-6 md:py-4 rounded-2xl apple-shadow flex flex-col gap-2 md:gap-3 border-apple-blue/20">
          <div className="flex items-center gap-2 md:gap-3 text-font-primary">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-apple-blue/10 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 md:w-4 md:h-4 text-apple-blue" />
            </div>
            <span className="text-xs md:text-sm font-medium tracking-wide">13348222139</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3 text-font-primary">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-apple-indigo/10 flex items-center justify-center">
              <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 text-apple-indigo" />
            </div>
            <span className="text-xs md:text-sm font-medium tracking-wide">yeley12391@163.com</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
