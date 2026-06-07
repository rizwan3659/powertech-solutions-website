import { Battery, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Products | PowerTech Solutions",
  description: "Browse our extensive range of Online UPS, Offline UPS, Home Inverters, Industrial Inverters, Tubular Batteries, and Lithium Batteries.",
};

export default function ProductsPage() {
  const products = [
    {
      category: "Online UPS",
      desc: "Double conversion UPS for critical equipment.",
      features: ["Zero transfer time", "Pure sine wave output", "Active power factor correction", "Extended runtime options"],
      applications: "Servers, Data Centers, Medical Equipment",
      icon: Zap
    },
    {
      category: "Offline UPS",
      desc: "Reliable power backup for standard electronics.",
      features: ["Compact design", "Auto-restart", "Cold start capability", "Overload protection"],
      applications: "Desktop PCs, Routers, POS Systems",
      icon: Zap
    },
    {
      category: "Home Inverters",
      desc: "Intelligent inverters for uninterrupted home power.",
      features: ["Smart battery management", "Noiseless operation", "Fast charging", "App connectivity (select models)"],
      applications: "Homes, Small Shops, Offices",
      icon: Zap
    },
    {
      category: "Industrial Inverters",
      desc: "Heavy-duty inverters for heavy loads.",
      features: ["High surge capacity", "Three-phase options", "Robust build quality", "Advanced DSP technology"],
      applications: "Manufacturing, Elevators, Large Offices",
      icon: Zap
    },
    {
      category: "Tubular Batteries",
      desc: "Long-lasting deep cycle batteries for heavy use.",
      features: ["High cycle life", "Low maintenance", "Fast recovery from deep discharge", "Excellent overcharge tolerance"],
      applications: "Home Inverters, Solar Systems",
      icon: Battery
    },
    {
      category: "Lithium Batteries",
      desc: "Next-gen compact and lightweight power storage.",
      features: ["Ultra-fast charging", "Zero maintenance", "3x longer lifespan", "Compact footprint"],
      applications: "Modern UPS systems, Premium Home Backup",
      icon: Battery
    }
  ];

  return (
    <div className="py-20 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Products</h1>
          <p className="text-lg text-slate-600">
            We partner with leading brands to bring you the most reliable and efficient power backup systems available in the market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <product.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{product.category}</h3>
              </div>
              <p className="text-slate-600 mb-6 font-medium">{product.desc}</p>
              
              <div className="mb-6">
                <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase tracking-wider">Key Features</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-slate-700 text-sm">
                      <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8 p-4 bg-white rounded-lg border border-slate-100">
                <h4 className="font-semibold text-slate-900 mb-1 text-xs uppercase tracking-wider">Ideal For</h4>
                <p className="text-slate-600 text-sm">{product.applications}</p>
              </div>

              <Link href="/contact" className="block w-full text-center bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-3 rounded-lg transition-colors">
                Request Quote
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
