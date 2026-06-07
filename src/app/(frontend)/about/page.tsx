"use client";

import { Building, ShieldCheck, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-10 bg-white min-h-[90vh] flex flex-col justify-center text-gray-900 selection:bg-red-500/30 selection:text-red-900 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=')] [background-size:40px_40px]"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl w-full">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="text-3xl md:text-5xl font-black text-gray-900 mb-2 tracking-tighter flex flex-col items-center [perspective:1000px] px-2 w-full">
            <motion.div className="flex flex-wrap justify-center overflow-hidden gap-x-3" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
              {"Our Story.".split(" ").map((word, wIdx) => (
                <span key={`w-${wIdx}`} className={`inline-flex whitespace-nowrap ${wIdx === 1 ? 'text-red-600' : ''}`}>
                  {word.split("").map((char, cIdx) => (
                    <motion.span 
                      key={`c-${wIdx}-${cIdx}`} 
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
          <motion.p variants={fadeInUp} className="text-sm text-gray-500 leading-relaxed font-light max-w-2xl mx-auto">
            Founded in 2009, Power Tech Solutions is an ISO 9001:2008 Certified pioneer in power conditioning instruments.
          </motion.p>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="space-y-6">
            <motion.h2 variants={fadeInUp} className="text-2xl font-black tracking-tight">Manufacturing Excellence.</motion.h2>
            <motion.p variants={fadeInUp} className="text-[13px] text-gray-500 leading-relaxed font-light">
              We design and develop UPS Systems, Industrial Batteries, Solar Power Systems, Voltage Stabilizers, and Solar Power Controllers. We also provide comprehensive UPS AMC, Repairing, and Rental Services. We take pride in introducing ourselves as one of the best manufacturers of excellent quality Electrical & Electronics Instruments, serving the Indian market for over 15 years.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Company CEO</p>
                <p className="text-sm font-bold text-gray-900">N Haque</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Established</p>
                <p className="text-sm font-bold text-gray-900">2009</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Business Type</p>
                <p className="text-sm font-bold text-gray-900">Service Provider</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Location</p>
                <p className="text-sm font-bold text-gray-900">New Delhi</p>
              </div>
            </motion.div>
          </div>

          {/* Why Us Section */}
          <motion.div variants={staggerContainer} className="bg-gray-50 p-6 border border-gray-100">
            <motion.div variants={fadeInUp} className="mb-6">
              <h2 className="text-xl font-black text-gray-900 mb-2 tracking-tight">Why Choose Us?</h2>
              <p className="text-[12px] text-gray-500 font-light">
                We have divided our firm into various specialized units and hired the best industry talent.
              </p>
            </motion.div>
            
            <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4">
              {[
                { title: "Fair Dealing", icon: Building },
                { title: "Timely Delivery", icon: Clock },
                { title: "Top Infrastructure", icon: ShieldCheck },
                { title: "Skilled Workforce", icon: Users },
              ].map((item, idx) => (
                <motion.div variants={fadeInUp} key={idx} className="bg-white p-4 border border-gray-200 hover:border-red-600 transition-colors flex items-center gap-3">
                  <div className="text-red-600 flex justify-center shrink-0">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[11px] uppercase tracking-widest font-bold text-gray-900">{item.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
