import { Phone, Mail } from "lucide-react";

const LinkedinIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const FacebookIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const YoutubeIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
);

const InstagramIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

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
            <LinkedinIcon />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
            <YoutubeIcon />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
