"use client";

import { ShieldCheck, Zap, Wrench, Battery, Clock, Factory } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function ServicesPage() {
  const services = [
    {
      title: "UPS Installation",
      icon: Zap,
      desc: "Supply and install high-quality online and offline UPS systems for homes, offices, and server rooms. We ensure proper sizing and seamless integration.",
    },
    {
      title: "Inverter Solutions",
      icon: Zap,
      desc: "Top-brand inverters perfectly matched with your load requirements. We handle end-to-end installation with rigorous safety standards.",
    },
    {
      title: "Battery Replacement",
      icon: Battery,
      desc: "End-of-life battery replacement services with genuine tubular and lithium batteries. Includes eco-friendly disposal of old units.",
    },
    {
      title: "Annual Maintenance",
      icon: ShieldCheck,
      desc: "Comprehensive AMCs to keep your power backup systems running at 100% efficiency year-round. Prevent breakdowns proactively.",
    },
    {
      title: "Emergency Repairs",
      icon: Clock,
      desc: "Rapid response repair services. Our technicians carry standard spares to resolve issues on the first visit, minimizing downtime.",
    },
    {
      title: "Industrial Power",
      icon: Factory,
      desc: "Heavy-duty three-phase UPS systems and industrial inverters tailored for manufacturing units and large commercial complexes.",
    },
  ];

  return (
    <div className="py-20 bg-white min-h-screen text-gray-900 selection:bg-red-500/30 selection:text-red-900 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-24"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center justify-center px-4 py-2 border border-red-200 text-red-600 font-bold text-xs uppercase tracking-widest mb-6">
            Expert Support
          </motion.div>
          
          <div className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tighter flex flex-col items-center [perspective:1000px] px-2 w-full">
            <motion.div className="flex flex-wrap justify-center overflow-hidden gap-x-3 sm:gap-x-4 md:gap-x-5" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
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
          
          <motion.p variants={fadeInUp} className="text-base md:text-lg text-gray-500 leading-relaxed font-light mt-4 max-w-2xl mx-auto">
            Professional, reliable, and swift power backup services designed to keep your life and business completely uninterrupted.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {services.map((service, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="bg-white p-10 border border-gray-200 group hover:border-red-600 transition-colors flex flex-col items-start relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-4 -mt-4 opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
              <div className="w-14 h-14 bg-gray-50 text-red-600 rounded-none border border-gray-200 flex items-center justify-center mb-8 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all relative z-10">
                <service.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 relative z-10">{service.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed relative z-10">{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="bg-gray-900 p-12 md:p-20 text-center text-white border border-gray-800 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')] [background-size:40px_40px]"></div>
          
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-black mb-6 tracking-tight relative z-10">Need Immediate Assistance?</motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto font-light relative z-10">
            Our expert technicians are on standby to resolve your power backup issues quickly and efficiently.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link href="/contact" className="bg-red-600 text-white font-medium text-sm uppercase tracking-widest py-4 px-10 hover:bg-red-700 transition-colors">
              Book a Service
            </Link>
            <a href="tel:01129945496" className="bg-transparent text-white font-medium text-sm uppercase tracking-widest py-4 px-10 hover:bg-gray-800 transition-colors border border-gray-600 hover:border-gray-500">
              Call Support
            </a>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
