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
    transition: { staggerChildren: 0.03 }
  }
};

export default function PhotosPage() {
  const photos = [
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399151117/UY/WY/FM/17374280/powertech-1kva-100kva-online-ups-system-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399151120/XD/YT/YR/17374280/powertech-1kva-100kva-online-ups-system-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399151123/OT/ZM/GD/17374280/powertech-1kva-100kva-online-ups-system-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399151126/RF/PJ/UW/17374280/powertech-1kva-100kva-online-ups-system-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399149559/DB/TU/LH/17374280/online-ups-system-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399149550/QQ/AG/RI/17374280/online-ups-system-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399149554/LS/GX/PE/17374280/online-ups-system-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399149563/QM/NT/KE/17374280/online-ups-system-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2022/2/PP/SG/UR/17374280/ups-system-500x500.jpeg",
    "https://5.imimg.com/data5/SELLER/Default/2023/11/363799307/WW/ND/XU/17374280/industrial-ups-systems-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2023/11/363799317/HN/ZR/HS/17374280/industrial-ups-systems-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2023/11/363799327/MU/OS/ZV/17374280/industrial-ups-systems-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2023/11/363799330/NH/EV/UW/17374280/industrial-ups-systems-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2023/11/363799334/TQ/IW/TS/17374280/industrial-ups-systems-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2022/2/TW/YY/JP/17374280/online-ups-system-500x500.jpeg",
    "https://5.imimg.com/data5/SELLER/Default/2023/11/363798996/PF/PR/IE/17374280/online-ups-system-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2023/11/363798998/UU/LW/QU/17374280/online-ups-system-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2023/11/363799003/XM/SH/EC/17374280/online-ups-system-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2023/11/363794848/EE/OE/DB/17374280/three-phase-online-ups-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2023/11/363794849/AG/OU/GE/17374280/three-phase-online-ups-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399147933/WG/BA/TS/17374280/manual-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399154584/OW/GX/UW/17374280/manual-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399154595/VI/IR/XR/17374280/manual-voltage-stabilizer-500x500.png",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399150238/FO/UH/YI/17374280/automatic-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399150241/XP/PV/LW/17374280/automatic-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399150244/EK/XN/BH/17374280/automatic-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399150250/YF/TJ/WA/17374280/automatic-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399148413/LF/WX/WS/17374280/automatic-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399148397/HT/TU/HO/17374280/automatic-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399148402/KU/GI/VT/17374280/automatic-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399148406/QR/MI/UR/17374280/automatic-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399145621/LZ/OA/VY/17374280/servo-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399145596/GC/PC/KH/17374280/servo-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399145604/WD/PD/OI/17374280/servo-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399145613/GI/OU/GK/17374280/servo-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399145620/BQ/OX/QW/17374280/servo-voltage-stabilizer-500x500.png",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399146301/PI/YA/CU/17374280/standard-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399146300/ZY/CC/CJ/17374280/standard-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399146307/YX/KO/HE/17374280/standard-voltage-stabilizer-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2024/3/399146313/QN/VE/VS/17374280/standard-voltage-stabilizer-500x500.png"
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
              {"Gallery.".split(" ").map((word, wIdx) => (
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
            A visual overview of our manufacturing facilities, product lineup, and infrastructure.
          </motion.p>
        </motion.div>

        {/* Scrollable Masonry/Grid Container */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-y-auto pr-2 pb-10 flex-grow scrollbar-thin scrollbar-thumb-gray-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {photos.map((photo, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="bg-gray-50 border border-gray-100 group relative overflow-hidden rounded-md shadow-sm aspect-square flex items-center justify-center p-2 hover:border-red-600 transition-colors">
              <img src={photo} alt={`Gallery image ${idx + 1}`} className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" loading="lazy" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
