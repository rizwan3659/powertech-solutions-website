"use client";

import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function ContactPage() {
  return (
    <div className="py-20 bg-white min-h-screen text-gray-900 selection:bg-red-500/30 selection:text-red-900 overflow-hidden relative">
      
      {/* Background ambient grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=')] [background-size:40px_40px]"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-24"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center justify-center px-4 py-2 border border-red-200 text-red-600 font-bold text-xs uppercase tracking-widest mb-6">
            Get In Touch
          </motion.div>
          
          <div className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tighter flex flex-col items-center [perspective:1000px] px-2 w-full">
            <motion.div className="flex flex-wrap justify-center overflow-hidden gap-x-3 sm:gap-x-4 md:gap-x-5" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
              {"Contact Us.".split(" ").map((word, wIdx) => (
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
            Need a quote or emergency repair services? Our team is standing by to assist you.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* Contact Information */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <motion.div variants={fadeInUp} className="bg-gray-50 p-8 md:p-10 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Direct Lines</h3>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-white border border-gray-200 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-gray-900 mb-1">Phone</h4>
                    <a href="tel:01129945496" className="text-gray-600 hover:text-red-600 block text-sm">011-29945496</a>
                    <a href="tel:01129945496" className="text-gray-500 hover:text-red-600 block text-xs mt-1">(24/7 Support)</a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-white border border-gray-200 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-gray-900 mb-1">WhatsApp</h4>
                    <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 block text-sm">Message our Engineers</a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-white border border-gray-200 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-gray-900 mb-1">Email</h4>
                    <a href="mailto:info@powertechsolutions.com" className="text-gray-600 hover:text-red-600 block text-sm">info@powertechsolutions.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-white border border-gray-200 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-widest font-bold text-gray-900 mb-1">Headquarters</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Shop No-1, B-43, Sudershan Park,<br/>New Delhi, Delhi - 110015</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <motion.div variants={fadeInUp} className="bg-white p-8 md:p-12 border border-gray-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Send a Request</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-xs uppercase tracking-widest font-bold text-gray-900 mb-2">First Name</label>
                    <input type="text" id="firstName" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-sm rounded-none" placeholder="John" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs uppercase tracking-widest font-bold text-gray-900 mb-2">Last Name</label>
                    <input type="text" id="lastName" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-sm rounded-none" placeholder="Doe" required />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-xs uppercase tracking-widest font-bold text-gray-900 mb-2">Email Address</label>
                    <input type="email" id="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-sm rounded-none" placeholder="john@example.com" required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs uppercase tracking-widest font-bold text-gray-900 mb-2">Phone Number</label>
                    <input type="tel" id="phone" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-sm rounded-none" placeholder="+91 99999 99999" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs uppercase tracking-widest font-bold text-gray-900 mb-2">Service Required</label>
                  <select id="service" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-sm rounded-none appearance-none">
                    <option>UPS Installation</option>
                    <option>Inverter Solutions</option>
                    <option>Battery Replacement</option>
                    <option>AMC Services</option>
                    <option>Emergency Repair</option>
                    <option>Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-widest font-bold text-gray-900 mb-2">Message</label>
                  <textarea id="message" rows={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-sm rounded-none resize-none" placeholder="Tell us about your requirements..."></textarea>
                </div>

                <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-sm py-4 px-8 rounded-none transition-colors flex items-center justify-center gap-2 group">
                  Submit Request <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>

        {/* Google Maps */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mt-24 overflow-hidden border border-gray-200 h-[400px] w-full"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.954490333792!2d77.1352!3d28.6311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d032240b6164f%3A0xc3cbff7c8f416e7a!2sSudershan%20Park%2C%20New%20Delhi%2C%20Delhi%20110015!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale hover:grayscale-0 transition-all duration-700"
          >
          </iframe>
        </motion.div>
      </div>
    </div>
  );
}
