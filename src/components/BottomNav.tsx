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
    <nav className="flex items-center bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2.25rem] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => cn(
            "relative flex flex-col items-center justify-center px-8 py-3.5 rounded-[1.75rem] transition-all duration-300 group overflow-hidden",
            isActive ? "text-white" : "text-white/40 hover:text-white/70"
          )}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute inset-0 bg-white/[0.08] animate-in fade-in zoom-in duration-500" />
              )}
              <div className="relative flex flex-col items-center space-y-1">
                <div className="relative">
                  <item.icon className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isActive 
                      ? "text-primary drop-shadow-[0_0_8px_rgba(180,160,255,0.6)] scale-110" 
                      : "group-hover:scale-110"
                  )} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-2 -right-3 h-4 w-4 flex items-center justify-center bg-primary text-[8px] font-black text-black rounded-full shadow-[0_0_10px_rgba(180,160,255,0.4)]">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-[0.2em] transition-all duration-300",
                  isActive ? "opacity-100" : "opacity-40"
                )}>
                  {item.label}
                </span>
              </div>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;