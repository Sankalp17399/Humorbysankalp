import * as React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { MadeWithDyad } from "./made-with-dyad";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative pb-32">
      {/* Aura System */}
      <div className="aura-container">
        <div className="aura aura-1" />
        <div className="aura aura-2" />
        <div className="aura aura-3" />
      </div>
      
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        {children}
      </main>
      <BottomNav />
      <MadeWithDyad />
    </div>
  );
};

export default Layout;