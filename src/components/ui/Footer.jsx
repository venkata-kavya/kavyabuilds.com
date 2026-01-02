import React from "react";
import { Instagram } from "lucide-react";

const Footer = () => (
  <footer className="py-8 border-t border-white/5 bg-[#050505] font-mono text-xs relative z-10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> ALL
        SYSTEMS NORMAL
      </div>
      <div className="text-gray-500">© 2026 KAVYABUILDS.</div>
      <div className="flex gap-6">
        <a
          href="https://instagram.com/kavyabuilds"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-cyan-400 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <Instagram size={14} /> INSTAGRAM
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
