"use client";

import { MessageCircle, PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";
import { SITE, whatsappLink } from "@/lib/site";

export default function StickyButtons() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      <a
        href={`tel:${SITE.phoneTel}`}
        className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-red-700 hover:scale-110 transition-all duration-300"
        aria-label="Call Now"
      >
        <PhoneCall size={24} />
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-green-700 hover:scale-110 transition-all duration-300"
        aria-label="WhatsApp Us"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
