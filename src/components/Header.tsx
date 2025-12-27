"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-3xl">
      <div className="container flex h-16 sm:h-20 items-center justify-between px-6 sm:px-10">
        <Link to="/" className="flex items-center space-x-3 sm:space-x-4 group">
          <div className="p-2 sm:p-2.5 rounded-xl bg-primary/10 border border-primary/20 transition-all duration-700 group-hover:bg-primary/20 shadow-[0_0_15px_rgba(180,160,255,0.2)]">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-black tracking-tighter text-lg sm:text-xl text-white leading-none uppercase">
              Humor.sys
            </span>
            <div className="flex items-center space-x-2 mt-1">
              <div className="h-1 w-1 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/20">Operational</span>
            </div>
          </div>
        </Link>

        <div className="flex items-center">
          <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/30">Node_8821-X</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;