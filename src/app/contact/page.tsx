"use client";

import { Phone, Mail, MapPin, MessageCircle, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: `${formData.get("firstName")} ${formData.get("lastName")}`.trim(),
      email: formData.get("email"),
      mobile: formData.get("phone"),
      enquiryType: formData.get("service"),
      message: formData.get("message"),
      leadSource: "Website - Contact Form",
      // Include UTM params if they were present in the URL (mocked here for simplicity)
      utmSource: typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("utm_source") || "" : "",
    };

    try {
      const res = await fetch("/api/webhook/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // The API key is usually not exposed on the frontend in a real production app without a proxy,
          // but for this MVP webhook architecture, we can pass it if we expose it or let the route handle it without the strict key for internal calls.
          // Note: In production, the internal Next.js form shouldn't require the external webhook API key, or it should use a different internal endpoint.
          // For now, we will bypass the x-api-key check in the route if it's an internal origin, or we just pass a public key.
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      setIsSuccess(true);
      (e.target as HTMLFormElement).reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setErrorMsg("Something went wrong. Please try calling us instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-10 bg-white min-h-[90vh] flex flex-col justify-center text-gray-900 selection:bg-red-500/30 selection:text-red-900 overflow-hidden relative">
      
      {/* Background ambient grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=')] [background-size:40px_40px]"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 w-full max-w-6xl">
        
        {/* Header Section */}
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="text-3xl md:text-5xl font-black text-gray-900 mb-2 tracking-tighter flex flex-col items-center [perspective:1000px] px-2 w-full">
            <motion.div className="flex flex-wrap justify-center overflow-hidden gap-x-3" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
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
          
          <motion.p variants={fadeInUp} className="text-sm text-gray-500 leading-relaxed font-light max-w-2xl mx-auto">
            Need a quote or emergency repair services? Our team is standing by to assist you.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Contact Information */}
          <div className="lg:col-span-2 flex flex-col">
            <motion.div variants={fadeInUp} className="bg-gray-50 p-6 border border-gray-200 h-full">
              <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Direct Lines</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-white border border-gray-200 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Phone size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-0.5">Phone</h4>
                    <a href="tel:01129945496" className="text-gray-600 hover:text-red-600 block text-xs">011-29945496</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-white border border-gray-200 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <MessageCircle size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-0.5">WhatsApp</h4>
                    <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 block text-xs">Message our Engineers</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-white border border-gray-200 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-0.5">Email</h4>
                    <a href="mailto:info@powertechsolutions.com" className="text-gray-600 hover:text-red-600 block text-xs">info@powertechsolutions.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-white border border-gray-200 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-0.5">Headquarters</h4>
                    <p className="text-gray-600 text-[11px] leading-tight">Shop 1, B-43, Sudershan Park,<br/>New Delhi - 110015</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <motion.div variants={fadeInUp} className="bg-white p-6 md:p-8 border border-gray-200 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] h-full">
              <h3 className="text-lg font-bold text-gray-900 mb-6 tracking-tight">Send a Request</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-1">First Name</label>
                    <input type="text" id="firstName" name="firstName" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-xs rounded-none" placeholder="John" required disabled={isSubmitting} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-1">Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-xs rounded-none" placeholder="Doe" required disabled={isSubmitting} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-1">Email Address</label>
                    <input type="email" id="email" name="email" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-xs rounded-none" placeholder="john@example.com" required disabled={isSubmitting} />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-1">Phone Number</label>
                    <input type="tel" id="phone" name="phone" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-xs rounded-none" placeholder="+91 99999 99999" required disabled={isSubmitting} />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-1">Service Required</label>
                  <select id="service" name="service" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-xs rounded-none appearance-none" disabled={isSubmitting}>
                    <option>UPS Installation</option>
                    <option>Inverter Solutions</option>
                    <option>Battery Replacement</option>
                    <option>AMC Services</option>
                    <option>Emergency Repair</option>
                    <option>Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[10px] uppercase tracking-widest font-bold text-gray-900 mb-1">Message</label>
                  <textarea id="message" name="message" rows={3} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all text-xs rounded-none resize-none" placeholder="Tell us about your requirements..." disabled={isSubmitting}></textarea>
                </div>

                {errorMsg && (
                  <div className="text-red-600 text-xs font-bold">{errorMsg}</div>
                )}

                {isSuccess ? (
                  <div className="w-full bg-green-50 text-green-700 border border-green-200 font-bold uppercase tracking-widest text-[11px] py-3 px-6 rounded-none flex items-center justify-center gap-2 mt-2">
                    <CheckCircle2 size={16} /> Request Received Successfully
                  </div>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-[11px] py-3 px-6 rounded-none transition-colors flex items-center justify-center gap-2 group mt-2 disabled:opacity-70">
                    {isSubmitting ? "Submitting..." : "Submit Request"} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
