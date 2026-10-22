import React from "react";
import { Instagram } from "lucide-react";

const Footer = () => (
  <footer className="portfolio-footer relative z-10 border-t border-white/5 bg-[#050505] py-8 font-mono text-xs">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
        <span>ALL SYSTEMS NORMAL</span>
      </div>

      <div className="text-gray-500">© 2026 KAVYABUILDS.</div>

      <div className="flex gap-6">
        <a
          href="https://instagram.com/kavyabuilds"
          target="_blank"
          rel="noopener noreferrer"
          className="flex cursor-pointer items-center gap-2 transition-colors hover:text-cyan-400"
        >
          <Instagram size={14} />
          INSTAGRAM
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
