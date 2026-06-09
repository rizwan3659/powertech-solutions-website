"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Wrench, Battery, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col w-full selection:bg-red-500/30 selection:text-red-900 bg-white overflow-hidden relative">
      
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-gray-50/30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjM5LCA2OCwgNjgsIDAuMSkiLz48L3N2Zz4=')] [background-size:40px_40px] opacity-70 animate-[slide_15s_linear_infinite]"></div>
        
        {/* Pulsing Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-red-100 rounded-full blur-[120px] mix-blend-multiply opacity-50 animate-[pulse_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-red-50 rounded-full blur-[100px] mix-blend-multiply opacity-70 animate-[pulse_8s_ease-in-out_infinite_alternate]"></div>

        {/* Floating Particles */}
        {Array.from({ length: 20 }).map((_, i) => {
          const size = 10 + (i % 4) * 15;
          const left = (i * 13) % 100;
          const delay = (i % 7) * 2;
          const duration = 15 + (i % 5) * 5;
          return (
            <motion.div
              key={i}
              className="absolute bg-red-600/10 rounded-full backdrop-blur-3xl"
              style={{
                width: size,
                height: size,
                left: `${left}%`,
                bottom: "-10%",
              }}
              animate={{
                y: ["0vh", "-120vh"],
                x: [0, (i % 2 === 0 ? 100 : -100)],
                rotate: [0, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
              }}
            />
          );
        })}
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[85vh] text-gray-900 flex items-center pt-20 border-b border-gray-100 z-10 bg-white/70 backdrop-blur-md overflow-hidden">
        <motion.div 
          className="container mx-auto px-4 lg:px-8 relative z-10 flex flex-col items-center text-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
          }}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-gray-600 text-sm font-medium mb-10 tracking-wide uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Next-Generation Power Infrastructure
          </motion.div>
          
          <div className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter mb-8 leading-[1.1] max-w-5xl w-full text-gray-900 drop-shadow-sm flex flex-col items-center [perspective:1000px] px-2">
            <motion.div className="flex flex-wrap justify-center overflow-hidden gap-x-3 sm:gap-x-4 md:gap-x-5" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}>
              {"Defy Outages.".split(" ").map((word, wIdx) => (
                <span key={`w1-${wIdx}`} className="inline-flex whitespace-nowrap">
                  {word.split("").map((char, cIdx) => (
                    <motion.span 
                      key={`c1-${wIdx}-${cIdx}`} 
                      variants={{
                        hidden: { opacity: 0, y: 60, rotateX: -60, scale: 0.8 },
                        visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", damping: 12, stiffness: 100 } }
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.div>
            <motion.div className="flex flex-wrap justify-center overflow-hidden text-red-600 mt-2 gap-x-3 sm:gap-x-4 md:gap-x-5" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.4 } } }}>
              {"Embrace Reliability.".split(" ").map((word, wIdx) => (
                <span key={`w2-${wIdx}`} className="inline-flex whitespace-nowrap">
                  {word.split("").map((char, cIdx) => (
                    <motion.span 
                      key={`c2-${wIdx}-${cIdx}`} 
                      variants={{
                        hidden: { opacity: 0, y: 60, rotateX: -60, scale: 0.8 },
                        visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", damping: 12, stiffness: 100 } }
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.div>
          </div>
          
          <motion.p variants={fadeInUp} className="text-base md:text-lg text-gray-600 mb-10 max-w-2xl leading-relaxed font-light mt-4">
            Amaron batteries, servo voltage stabilizers and online UPS systems &mdash; engineered for zero downtime. Trusted power backup since 2009.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <Link href="/contact" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white font-medium rounded-none hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-500/25">
              Explore Solutions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:01129945496" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-300 text-gray-900 font-medium rounded-none hover:bg-gray-50 transition-colors shadow-sm">
              Speak to an Expert
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Minimal Grid Section */}
      <section className="py-24 border-b border-gray-100 z-10 bg-white/80 backdrop-blur-sm relative">
        <motion.div 
          className="container mx-auto px-4 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-16 md:mb-24 relative">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight drop-shadow-sm">Our Services</h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl font-light">Comprehensive power backup solutions tailored for homes and enterprises.</p>
          </motion.div>
          
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 relative">
            {[
              { title: "Online UPS Systems", icon: Zap, desc: "Powertech, Emerson & Vertiv online UPS from 1 to 100 KVA with pure sine wave output.", href: "/products/category/ups-systems" },
              { title: "Batteries", icon: Battery, desc: "Amaron Quanta SMF, tubular, automotive and industrial batteries for every backup need.", href: "/products/category/batteries" },
              { title: "Voltage Stabilizers", icon: ShieldCheck, desc: "Servo and automatic voltage stabilizers that protect equipment from voltage fluctuations.", href: "/products/category/voltage-stabilizers" },
              { title: "UPS Repair & AMC", icon: Wrench, desc: "Repair and Annual Maintenance Contracts for all UPS brands to ensure 100% uptime.", href: "/products/category/power-backup-solutions" },
              { title: "Emergency Support", icon: Clock, desc: "24/7 emergency troubleshooting and on-site support across Delhi NCR.", href: "/contact" },
              { title: "Consultation", icon: Users, desc: "Free site assessment to determine your exact power backup needs.", href: "/contact" }
            ].map((service, idx) => (
              <motion.div variants={fadeInUp} key={idx} className="group flex flex-col bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300">
                <div className="mb-6 text-red-600 bg-red-50 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 transition-transform">
                  <service.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-500 mb-6 flex-1 font-light leading-relaxed">{service.desc}</p>
                <Link href={service.href} className="text-red-600 font-medium flex items-center gap-2 hover:gap-3 transition-all mt-auto w-fit">
                  Learn more <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Trust & Metrics Section */}
      <section className="py-24 z-10 bg-gray-50/90 backdrop-blur-md relative border-b border-gray-100">
        <motion.div 
          className="container mx-auto px-4 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-gray-200">
            <motion.div variants={fadeInUp} className="pl-4 md:pl-0">
              <span className="block text-5xl font-black text-gray-900 mb-2 drop-shadow-sm">15+</span>
              <span className="text-red-600 font-bold tracking-widest uppercase text-xs">Years Experience</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="pl-8">
              <span className="block text-5xl font-black text-gray-900 mb-2 drop-shadow-sm">ISO</span>
              <span className="text-red-600 font-bold tracking-widest uppercase text-xs">9001:2008 Certified</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="pl-8">
              <span className="block text-5xl font-black text-gray-900 mb-2 drop-shadow-sm">24/7</span>
              <span className="text-red-600 font-bold tracking-widest uppercase text-xs">Support</span>
            </motion.div>
            <motion.div variants={fadeInUp} className="pl-8">
              <span className="block text-5xl font-black text-gray-900 mb-2 drop-shadow-sm">7+</span>
              <span className="text-red-600 font-bold tracking-widest uppercase text-xs">Trusted Brands</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action Minimal */}
      <section className="py-32 z-10 bg-white/70 backdrop-blur-lg relative">
        <motion.div 
          className="container mx-auto px-4 lg:px-8 text-center max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight drop-shadow-sm">Fortify Your Power.</motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-500 mb-12 font-light">Join thousands of businesses who have eliminated downtime with PowerTech Solutions.</motion.p>
          <motion.div variants={fadeInUp}>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-red-600 text-white font-medium py-5 px-12 rounded-none hover:bg-red-700 transition-colors shadow-xl hover:shadow-red-500/25">
              Request a Consultation
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
