import { Linkedin, Facebook, Youtube, Instagram, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className="bg-gray-900 text-gray-300 py-2 border-b border-gray-800 text-xs hidden md:block">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Contact Info */}
        <div className="flex items-center space-x-6">
          <a href="tel:01129945496" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={14} className="text-red-500" />
            <span>011-29945496</span>
          </a>
          <a href="mailto:info@powertech.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={14} className="text-red-500" />
            <span>info@powertech.com</span>
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-500 mr-2 uppercase tracking-wider text-[10px] font-bold">Follow Us:</span>
          <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
            <Facebook size={16} />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
            <Youtube size={16} />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
