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
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "relative flex flex-col items-center justify-center px-8 py-3 rounded-2xl transition-all duration-500 group",
              isActive ? "text-white" : "text-white/30 hover:text-white/50"
            )}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl animate-in fade-in zoom-in duration-500" />
                )}
                <div className="relative flex flex-col items-center space-y-1">
                  <div className="relative">
                    <item.icon className={cn(
                      "h-5 w-5 transition-all duration-500",
                      isActive ? "text-primary drop-shadow-[0_0_8px_rgba(180,160,255,0.8)] scale-110" : "group-hover:scale-110"
                    )} />
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="absolute -top-1 -right-2 h-3.5 w-3.5 flex items-center justify-center bg-primary text-[8px] font-black text-black rounded-full shadow-[0_0_10px_rgba(180,160,255,0.5)]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className={cn(
                    "text-[8px] font-black uppercase tracking-[0.2em] transition-all duration-500",
                    isActive ? "opacity-100" : "opacity-40"
                  )}>
                    {item.label}
                  </span>
                </div>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary rounded-full blur-[2px]" />
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