import { Phone, Mail } from "lucide-react";

export default function TopBar() {
  return (
    <div className="bg-gray-900 text-gray-300 py-2 border-b border-gray-800 text-xs hidden md:block">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Contact Info */}
        <div className="flex items-center space-x-6 w-full justify-between lg:justify-start">
          <a href="tel:01129945496" className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={14} className="text-red-500" />
            <span>011-29945496</span>
          </a>
          <a href="mailto:info@powertech.com" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={14} className="text-red-500" />
            <span>info@powertech.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
