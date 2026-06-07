import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-3 lg:px-8 py-3 flex justify-between items-center gap-4">
        <Link href="/" className="flex items-center shrink-0">
          {/* Recreated Logo from the image - Very Small */}
          <div className="flex border border-gray-800 bg-white shadow-sm overflow-hidden h-5">
            <div className="bg-[#991b1b] text-white font-bold text-xs px-1.5 flex items-center justify-center">
              PTS
            </div>
            <div className="flex flex-col justify-center px-1 text-[5px] font-bold leading-tight text-gray-900 border-l border-gray-800 tracking-tighter">
              <span className="border-b border-gray-300 pb-[1px] mb-[1px]">POWER TECH</span>
              <span>POWER PRODUCTS</span>
            </div>
          </div>
        </Link>

        {/* Horizontal Nav - Always visible */}
        <nav className="flex items-center space-x-3 md:space-x-5 text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-gray-500 overflow-x-auto whitespace-nowrap w-full justify-end scrollbar-hide py-1">
          <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
          <Link href="/services" className="hover:text-red-600 transition-colors">Services</Link>
          <Link href="/products" className="hover:text-red-600 transition-colors">Products</Link>
          <Link href="/about" className="hover:text-red-600 transition-colors">About</Link>
          <Link href="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
          <div className="flex items-center space-x-2 ml-1 border-l border-gray-200 pl-3">
            <Link 
              href="/admin/login" 
              className="text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 transition-colors font-bold shrink-0 text-[9px] sm:text-[10px]"
            >
              Admin Login
            </Link>
            <a
              href="tel:01129945496"
              className="bg-red-600 text-white px-3 py-1 rounded-none hover:bg-red-700 transition-colors font-bold shrink-0 text-[9px] sm:text-[10px]"
            >
              Call Us
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
