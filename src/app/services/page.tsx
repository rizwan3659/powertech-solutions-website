"use client";

import { ShieldCheck, Zap, Battery, Clock, Factory } from "lucide-react";
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

export default function ServicesPage() {
  const services = [
    {
      title: "UPS Installation",
      icon: Zap,
      desc: "Supply and install high-quality UPS systems for homes and server rooms.",
    },
    {
      title: "Inverter Solutions",
      icon: Zap,
      desc: "Top-brand inverters matched with your exact load requirements.",
    },
    {
      title: "Battery Replacement",
      icon: Battery,
      desc: "End-of-life battery replacement with genuine tubular and lithium models.",
    },
    {
      title: "Annual Maintenance",
      icon: ShieldCheck,
      desc: "Comprehensive AMCs to keep your systems running at 100% efficiency.",
    },
    {
      title: "Emergency Repairs",
      icon: Clock,
      desc: "Rapid response repair services with standard spares to resolve issues instantly.",
    },
    {
      title: "Industrial Power",
      icon: Factory,
      desc: "Heavy-duty three-phase UPS systems tailored for manufacturing units.",
    },
  ];

  return (
    <div className="pt-24 pb-10 bg-white min-h-[90vh] flex flex-col justify-center text-gray-900 selection:bg-red-500/30 selection:text-red-900 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=')] [background-size:40px_40px]"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl w-full">
        <motion.div 
          className="text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="text-3xl md:text-5xl font-black text-gray-900 mb-2 tracking-tighter flex flex-col items-center [perspective:1000px] px-2 w-full">
            <motion.div className="flex flex-wrap justify-center overflow-hidden gap-x-3" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
              {"Our Services.".split(" ").map((word, wIdx) => (
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
            Professional, reliable, and swift power backup services designed to keep your life and business completely uninterrupted.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {services.map((service, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="bg-white p-6 border border-gray-200 group hover:border-red-600 transition-colors flex flex-col items-start relative overflow-hidden h-full">
              <div className="w-10 h-10 bg-gray-50 text-red-600 rounded-none border border-gray-200 flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all relative z-10">
                <service.icon size={18} strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-2 relative z-10 uppercase tracking-widest">{service.title}</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed relative z-10">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
