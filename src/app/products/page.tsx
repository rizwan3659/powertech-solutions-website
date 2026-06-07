"use client";

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

export default function ProductsPage() {
  const products = [
    { name: "Powertech 1KVA -100kva Online UPS System", image: "https://5.imimg.com/data5/SELLER/Default/2024/3/399151117/UY/WY/FM/17374280/powertech-1kva-100kva-online-ups-system.jpg", category: "UPS" },
    { name: "Online UPS System", image: "https://5.imimg.com/data5/SELLER/Default/2024/3/399149559/DB/TU/LH/17374280/online-ups-system.jpg", category: "UPS" },
    { name: "Industrial Ups Systems", image: "https://5.imimg.com/data5/SELLER/Default/2022/2/PP/SG/UR/17374280/ups-system.jpeg", category: "UPS" },
    { name: "Online Ups System", image: "https://5.imimg.com/data5/SELLER/Default/2022/2/TW/YY/JP/17374280/online-ups-system.jpeg", category: "UPS" },
    { name: "Three Phase Online Ups", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/363794848/EE/OE/DB/17374280/three-phase-online-ups.jpg", category: "UPS" },
    { name: "Manual Voltage Stabilizer", image: "https://5.imimg.com/data5/SELLER/Default/2024/3/399147933/WG/BA/TS/17374280/manual-voltage-stabilizer.jpg", category: "Stabilizer" },
    { name: "Automatic Voltage Stabilizer", image: "https://5.imimg.com/data5/SELLER/Default/2024/3/399150238/FO/UH/YI/17374280/automatic-voltage-stabilizer.jpg", category: "Stabilizer" },
    { name: "Servo Voltage Stabilizer", image: "https://5.imimg.com/data5/SELLER/Default/2024/3/399145621/LZ/OA/VY/17374280/servo-voltage-stabilizer.jpg", category: "Stabilizer" },
    { name: "Standard Voltage Stabilizer", image: "https://5.imimg.com/data5/SELLER/Default/2024/3/399146301/PI/YA/CU/17374280/standard-voltage-stabilizer.jpg", category: "Stabilizer" },
    { name: "Emerson Online Industrial UPS", image: "https://5.imimg.com/data5/SELLER/Default/2024/3/399155874/LL/GS/RF/17374280/emerson-online-industrial-ups.jpeg", category: "UPS" },
    { name: "Vertiv Online Ups", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/363796443/RQ/FC/NB/17374280/vertiv-online-ups.jpg", category: "UPS" },
    { name: "Sine Wave UPS", image: "https://5.imimg.com/data5/SELLER/Default/2024/3/399161480/BJ/ZY/BZ/17374280/delta-online-ups.jpg", category: "UPS" },
    { name: "Amaron Quanta Smf Battery", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/363798253/BT/EB/FL/17374280/numeric-online-ups.jpg", category: "Battery" },
    { name: "Online Ups Battery", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/363793776/QT/RI/GS/17374280/online-ups-battery.jpg", category: "Battery" },
    { name: "Amaron Quantum Battery", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/363797973/SK/HI/YG/17374280/amaron-quantum-battery.jpg", category: "Battery" },
    { name: "Amaron Quantum 28 Ah Smf Battery", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/363798772/HO/PM/PC/17374280/amaron-quantum-28-ah-smf-battery.jpg", category: "Battery" },
    { name: "Apc Online Ups", image: "https://5.imimg.com/data5/SELLER/Default/2023/11/363791527/MF/TT/PS/17374280/apc-online-ups.jpg", category: "UPS" },
    { name: "Smf Battery", image: "https://5.imimg.com/data5/SELLER/Default/2021/12/BK/SB/FZ/17374280/oip-1-.jpg", category: "Battery" },
  ];

  return (
    <div className="pt-24 pb-10 bg-white min-h-[90vh] flex flex-col justify-center text-gray-900 selection:bg-red-500/30 selection:text-red-900 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=')] [background-size:40px_40px]"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-6xl w-full flex flex-col h-[85vh]">
        
        {/* Header Section */}
        <motion.div 
          className="text-center mb-6 shrink-0"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="text-3xl md:text-5xl font-black text-gray-900 mb-2 tracking-tighter flex flex-col items-center [perspective:1000px] px-2 w-full">
            <motion.div className="flex flex-wrap justify-center overflow-hidden gap-x-3" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
              {"Our Products.".split(" ").map((word, wIdx) => (
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
            Direct from our catalog: High-quality UPS systems, stabilizers, and industrial batteries.
          </motion.p>
        </motion.div>

        {/* Scrollable Grid Container */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-y-auto pr-2 pb-10 flex-grow scrollbar-thin scrollbar-thumb-gray-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {products.map((product, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="bg-white border border-gray-200 group hover:border-red-600 transition-colors flex flex-col relative overflow-hidden h-full rounded-md shadow-sm hover:shadow-md">
              <div className="aspect-square bg-gray-50 w-full relative overflow-hidden border-b border-gray-100 flex items-center justify-center p-2">
                <img src={product.image} alt={product.name} className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
              </div>
              <div className="p-3 flex flex-col flex-grow">
                <span className="text-[9px] uppercase tracking-widest font-bold text-red-600 mb-1">{product.category}</span>
                <h3 className="text-[11px] font-bold text-gray-900 leading-tight">{product.name}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
