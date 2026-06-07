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

type Product = {
  id: string;
  name: string;
  category: string;
  imageUrl: string | null;
  description: string;
  isActive: boolean;
};

export default function ProductsClient({ products }: { products: Product[] }) {
  if (!products || products.length === 0) {
    return (
      <div className="pt-24 pb-10 bg-white min-h-[90vh] flex flex-col items-center justify-center text-gray-900">
        <div className="text-center max-w-lg px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Check back soon.</h2>
          <p className="text-gray-500">We are currently updating our product catalog. New items will be available shortly.</p>
        </div>
      </div>
    );
  }

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
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeInUp} className="bg-white border border-gray-200 group hover:border-red-600 transition-colors flex flex-col relative overflow-hidden h-full rounded-md shadow-sm hover:shadow-md">
              <div className="aspect-square bg-gray-50 w-full relative overflow-hidden border-b border-gray-100 flex items-center justify-center p-2">
                <img src={product.imageUrl || "https://placehold.co/400?text=No+Image"} alt={product.name} className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />
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
