"use client";

import * as React from "react";
import { NavLink } from "react-router-dom";
import { Zap, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";

const BottomNav: React.FC = () => {
  const { favorites } = useFavorites();
  const favoriteCount = favorites.length;

  const navItems = [
    {
      to: "/",
      label: "Discover",
      icon: Zap,
    },
    {
      to: "/favorites",
      label: "Archive",
      icon: Heart,
      badge: favoriteCount,
    },
  ];

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center bg-black/60 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-b-primary/20">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "relative flex flex-col items-center justify-center px-10 py-4 rounded-[1.75rem] transition-all duration-500 group",
              isActive ? "text-white" : "text-white/50 hover:text-white/80"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute inset-0 bg-primary/20 rounded-[1.75rem] animate-in fade-in zoom-in duration-500 shadow-[inset_0_0_20px_rgba(180,160,255,0.2)]" />
                )}
                <div className="relative flex flex-col items-center space-y-1.5">
                  <div className="relative">
                    <item.icon className={cn(
                      "h-6 w-6 transition-all duration-500",
                      isActive 
                        ? "text-primary drop-shadow-[0_0_12px_rgba(180,160,255,1)] scale-110" 
                        : "group-hover:scale-110"
                    )} />
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-3 h-4.5 w-4.5 flex items-center justify-center bg-primary text-[9px] font-black text-black rounded-full shadow-[0_0_15px_rgba(180,160,255,0.8)] border border-black/20">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-[0.25em] transition-all duration-500",
                    isActive ? "opacity-100" : "opacity-60"
                  )}>
                    {item.label}
                  </span>
                </div>
                {isActive && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-primary rounded-full blur-[3px] shadow-[0_0_10px_rgba(180,160,255,0.8)]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default BottomNav;