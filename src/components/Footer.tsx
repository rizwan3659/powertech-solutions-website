import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const FacebookIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TwitterIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const LinkedinIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-white text-gray-500 pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* About */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-6">
            <div className="flex border border-gray-800 bg-white shadow-sm overflow-hidden h-5 w-fit">
              <div className="bg-[#991b1b] text-white font-bold text-xs px-1.5 flex items-center justify-center">
                PTS
              </div>
              <div className="flex flex-col justify-center px-1 text-[5px] font-bold leading-tight text-gray-900 border-l border-gray-800 tracking-tighter">
                <span className="border-b border-gray-300 pb-[1px] mb-[1px]">POWER TECH</span>
                <span>POWER PRODUCTS</span>
              </div>
            </div>
          </Link>
          <p className="mb-6 leading-relaxed font-light">
            Leading provider of UPS systems, inverters, and power backup solutions. Minimal downtime, maximum efficiency.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-colors text-gray-400">
              <FacebookIcon size={18} />
            </a>
            <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-colors text-gray-400">
              <TwitterIcon size={18} />
            </a>
            <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-colors text-gray-400">
              <LinkedinIcon size={18} />
            </a>
            <a href="#" className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-red-600 hover:text-red-600 transition-colors text-gray-400">
              <InstagramIcon size={18} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-gray-900 font-bold text-lg mb-6 tracking-tight">Our Services</h3>
          <ul className="space-y-4 font-light">
            <li><Link href="/services" className="hover:text-red-600 transition-colors">UPS Installation</Link></li>
            <li><Link href="/services" className="hover:text-red-600 transition-colors">Inverter Sales & Repair</Link></li>
            <li><Link href="/services" className="hover:text-red-600 transition-colors">Battery Replacement</Link></li>
            <li><Link href="/services" className="hover:text-red-600 transition-colors">Annual Maintenance (AMC)</Link></li>
            <li><Link href="/services" className="hover:text-red-600 transition-colors">Industrial Power Solutions</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-gray-900 font-bold text-lg mb-6 tracking-tight">Quick Links</h3>
          <ul className="space-y-4 font-light">
            <li><Link href="/about" className="hover:text-red-600 transition-colors">About</Link></li>
            <li><Link href="/products" className="hover:text-red-600 transition-colors">Our Products</Link></li>
            <li><Link href="/contact" className="hover:text-red-600 transition-colors">Contact</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-red-600 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-red-600 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-gray-900 font-bold text-lg mb-6 tracking-tight">Contact Info</h3>
          <ul className="space-y-4 font-light">
            <li className="flex items-start gap-3">
              <MapPin className="text-red-600 shrink-0 mt-1" size={18} />
              <span className="leading-tight">F-109, IIIrd Floor, (R), Shaheen Bagh, Abul Fazal Enclave-II, Jamia Nagar, New Delhi-25</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-red-600 shrink-0" size={18} />
              <span>Tel: 011-29945496<br/>Mob: 9810517255</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-red-600 shrink-0" size={18} />
              <span>data_powertech@yahoo.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="container mx-auto px-4 lg:px-8 pt-8 border-t border-gray-100 text-center md:text-left md:flex justify-between items-center text-sm font-light text-gray-400">
        <p>&copy; {new Date().getFullYear()} PowerTech Solutions. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Defy Outages.</p>
      </div>
    </footer>
  );
}
