"use client";

import Link from "next/link";
import { ArrowRight, Zap, ShieldCheck, Battery, CalendarCheck, Factory, Settings, Users, Trophy, Building2, MapPin, CheckCircle2, Bot } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

function Counter({ end, label, suffix = "" }: { end: number, label: string, suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 font-mono">
        {count}{suffix}
      </div>
      <div className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 font-bold">{label}</div>
    </div>
  );
}

export default function HomeClient() {
  const clientele = [
    "All India Institute of Local Self Govt.",
    "Bio Cell Medicare",
    "Erbis Engg. Co. Ltd.",
    "Digital Empowerment Foundation",
    "On Spot Support Technical Services",
    "Honeywell Pune"
  ];

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
              style={{ width: size, height: size, left: `${left}%`, bottom: "-10%" }}
              animate={{ y: ["0vh", "-120vh"], x: [0, (i % 2 === 0 ? 100 : -100)], rotate: [0, 360], opacity: [0, 1, 0] }}
              transition={{ duration: duration, repeat: Infinity, ease: "linear", delay: delay }}
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
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-gray-900 text-white text-[10px] sm:text-xs font-bold mb-10 tracking-widest uppercase">
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Premium UPS Dealer in Delhi NCR
          </motion.div>
          
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 leading-[1.1] max-w-5xl w-full text-gray-900 drop-shadow-sm flex flex-col items-center [perspective:1000px] px-2">
            <motion.div className="flex flex-wrap justify-center overflow-hidden gap-x-3 sm:gap-x-4 md:gap-x-5" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}>
              {"Powering Businesses.".split(" ").map((word, wIdx) => (
                <span key={`w1-${wIdx}`} className="inline-flex whitespace-nowrap">
                  {word.split("").map((char, cIdx) => (
                    <motion.span key={`c1-${wIdx}-${cIdx}`} variants={{ hidden: { opacity: 0, y: 60, rotateX: -60, scale: 0.8 }, visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", damping: 12, stiffness: 100 } } }} style={{ display: "inline-block" }}>
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.div>
            <motion.div className="flex flex-wrap justify-center overflow-hidden text-red-600 mt-2 gap-x-3 sm:gap-x-4 md:gap-x-5" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.4 } } }}>
              {"Delivering Reliability.".split(" ").map((word, wIdx) => (
                <span key={`w2-${wIdx}`} className="inline-flex whitespace-nowrap">
                  {word.split("").map((char, cIdx) => (
                    <motion.span key={`c2-${wIdx}-${cIdx}`} variants={{ hidden: { opacity: 0, y: 60, rotateX: -60, scale: 0.8 }, visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { type: "spring", damping: 12, stiffness: 100 } } }} style={{ display: "inline-block" }}>
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.div>
          </div>
          
          <motion.p variants={fadeInUp} className="text-sm sm:text-base md:text-lg text-gray-600 mb-10 max-w-2xl leading-relaxed font-light mt-4">
            State-of-the-art UPS systems, industrial batteries, and intelligent inverters engineered for absolute zero downtime. Minimal design, maximum power.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <Link href="/services" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white text-xs sm:text-sm font-bold uppercase tracking-widest rounded-none hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-500/25">
              Get Instant Quote <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:01129945496" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-300 text-gray-900 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-none hover:bg-gray-50 transition-colors shadow-sm">
              Talk to an Expert
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust & Counters Section */}
      <section className="py-16 border-b border-gray-100 bg-white relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            <Counter end={15} label="Years Experience" suffix="+" />
            <Counter end={2500} label="Happy Clients" suffix="+" />
            <Counter end={100} label="Projects Monthly" suffix="+" />
            <Counter end={24} label="Hour Support" suffix="/7" />
          </div>
        </div>
      </section>

      {/* AI Solutions Showcase */}
      <section className="py-24 bg-gray-50 relative z-10 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Driven by <span className="text-red-600">AI Innovation</span>.</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 font-light">Experience the future of power backup solutions. Our integrated AI agents are available 24/7 to help you calculate loads, recommend products, and instantly troubleshoot errors.</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { title: "AI Product Advisor", desc: "Instantly find the perfect UPS or inverter based on your exact residential or commercial load requirements." },
              { title: "Power Calculator", desc: "Automated calculation of battery AH and inverter VA ratings required to run your specific appliances." },
              { title: "Smart Troubleshooting", desc: "Real-time AI assistance to diagnose UPS beep codes, red light errors, and overload indicators." }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-white p-8 border border-gray-200 hover:border-red-600 transition-colors group">
                <Bot className="text-red-600 mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 relative z-10 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          >
            <div className="max-w-2xl">
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tighter">Enterprise Power Solutions.</motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-gray-500 font-light leading-relaxed">
                From high-capacity industrial systems to residential inverters. We design, supply, and maintain infrastructure that refuses to fail.
              </motion.p>
            </div>
            <motion.div variants={fadeInUp}>
              <Link href="/services" className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-widest text-xs hover:text-red-700 transition-colors">
                View All Services <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          >
            {[
              { icon: Zap, title: "Online UPS Systems", desc: "Continuous, zero-transfer-time power protection for mission-critical servers and medical equipment." },
              { icon: Battery, title: "Industrial Batteries", desc: "High-cycle tubular and SMF/Lithium battery banks designed for extreme longevity and performance." },
              { icon: ShieldCheck, title: "Comprehensive AMC", desc: "Proactive, 24/7 maintenance contracts that prevent failures before they impact your operations." },
              { icon: Factory, title: "Industrial Solutions", desc: "Heavy-duty three-phase setups capable of sustaining manufacturing floors and large complexes." },
              { icon: Building2, title: "Solar Power Systems", desc: "Eco-friendly, high-efficiency solar inverters and panels to drastically reduce your operational costs." },
              { icon: Settings, title: "Expert Installation", desc: "Precision deployment by ISO 9001:2008 certified engineers adhering to strict electrical safety standards." },
            ].map((service, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="group relative p-10 border border-gray-200 bg-white hover:border-red-600 transition-colors duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
                <service.icon size={32} strokeWidth={1.5} className="text-red-600 mb-8 relative z-10" />
                <h3 className="text-xl font-bold text-gray-900 mb-4 relative z-10">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed relative z-10">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust & Clientele */}
      <section className="py-24 bg-gray-900 text-white relative z-10 border-t border-gray-800">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-black mb-12 tracking-tight">Trusted by Industry Leaders</motion.h2>
            <motion.div variants={staggerContainer} className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {clientele.map((client, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="px-6 py-3 bg-gray-800 border border-gray-700 text-gray-300 font-medium text-xs uppercase tracking-wider flex items-center gap-2 hover:border-red-500 transition-colors">
                  <CheckCircle2 size={14} className="text-red-500" />
                  {client}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className="py-32 relative z-10 bg-red-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4=')] [background-size:40px_40px]"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="max-w-3xl mx-auto">
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">Ready to eliminate downtime forever?</motion.h2>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-red-100 mb-10 font-light">Speak with our certified engineers today and get a customized power backup solution for your specific needs.</motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/contact" className="inline-block bg-white text-red-600 font-bold uppercase tracking-widest text-sm px-10 py-5 hover:bg-gray-100 transition-colors shadow-2xl">
                Request Free Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
