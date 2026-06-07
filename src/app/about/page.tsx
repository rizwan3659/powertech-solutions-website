"use client";

import { CheckCircle2, Building, ShieldCheck, Clock, Users } from "lucide-react";
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

export default function AboutPage() {
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
          <motion.div variants={fadeInUp} className="inline-flex items-center justify-center px-4 py-2 border border-red-200 text-red-600 font-bold text-sm uppercase tracking-widest mb-6">
            ISO 9001:2008 Certified
          </motion.div>
          
          <div className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tighter flex flex-col items-center [perspective:1000px] px-2 w-full max-w-4xl">
            <motion.div className="flex flex-wrap justify-center overflow-hidden gap-x-3 sm:gap-x-4 md:gap-x-5" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
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
          
          <motion.p variants={fadeInUp} className="text-base md:text-lg text-gray-500 leading-relaxed font-light mt-4">
            Founded in the year 2009, Power Tech Solutions is a professional Manufacturer, Trader, Supplier and Service Provider of electrical, electronics, and power conditioning instruments.
          </motion.p>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-center mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="space-y-8">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-black tracking-tight">Manufacturing Excellence in South Delhi.</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-gray-500 leading-relaxed font-light">
              We design and develop UPS Systems, Industrial Batteries, PCB Boards, Solar Power Systems, Solar Inverters, Solar Panels, Voltage Stabilizers, and Solar Power Controllers. We also provide comprehensive UPS AMC, Repairing, and Rental Services.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-gray-500 leading-relaxed font-light">
              We take pride in introducing ourselves as one of the best manufacturers of excellent quality Electrical & Electronics Instruments for power conditioning, serving the Indian market for over 15 years.
            </motion.p>

            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-100">
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Company CEO</p>
                <p className="text-xl font-bold text-gray-900">N Haque</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Established</p>
                <p className="text-xl font-bold text-gray-900">2009</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Business Type</p>
                <p className="text-xl font-bold text-gray-900">Service Provider</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-wider mb-1">Location</p>
                <p className="text-xl font-bold text-gray-900">New Delhi</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Why Us Section */}
        <motion.div 
          className="bg-gray-50 p-12 lg:p-20 border border-gray-100 mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-6 tracking-tight">Why Choose Us?</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
              For the smooth functioning of processes, we have divided our firm into various specialized units and hired the best industry talent.
            </p>
          </motion.div>
          
          <motion.div variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Fair Dealing", icon: Building },
              { title: "Timely Delivery", icon: Clock },
              { title: "Well Equipped Infrastructure", icon: ShieldCheck },
              { title: "Skilled Workforce", icon: Users },
            ].map((item, idx) => (
              <motion.div variants={fadeInUp} key={idx} className="bg-white p-8 border border-gray-200 text-center hover:border-red-600 transition-colors">
                <div className="text-red-600 mb-6 flex justify-center">
                  <item.icon size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Clientele Section */}
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeInUp} className="text-4xl font-black text-gray-900 mb-12 tracking-tight">Our Trusted Clientele</motion.h2>
          <motion.div variants={staggerContainer} className="flex flex-wrap justify-center gap-4">
            {[
              "All India Institute of Local Self Govt.",
              "Bio Cell Medicare",
              "Erbis Engg. Co. Ltd.",
              "Digital Empowerment Foundation",
              "On Spot Support Technical Services",
              "R.D. Wireless Varanasi",
              "Honeywell Pune",
              "Gyan Sharma & Associates",
              "Divya Creations",
              "Bisleri International Pvt Ltd",
              "CTDI India Pvt Ltd"
            ].map((client, idx) => (
              <motion.span variants={fadeInUp} key={idx} className="px-6 py-3 bg-white border border-gray-200 text-gray-600 font-medium text-sm flex items-center gap-2">
                <CheckCircle2 size={16} className="text-red-500" />
                {client}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
