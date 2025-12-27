import * as React from "react";
import Header from "./Header";
import BottomNav from "./BottomNav";
import { MadeWithDyad } from "./made-with-dyad";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-[100dvh] w-full flex flex-col relative overflow-hidden bg-black">
      {/* Aura System */}
      <div className="aura-container">
        <div className="aura aura-1" />
        <div className="aura aura-2" />
        <div className="aura aura-3" />
      </div>
      
      <Header />
      
      {/* Scrollable Content Area */}
      <main className="flex-grow overflow-y-auto overflow-x-hidden relative custom-scrollbar">
        <div className="container mx-auto px-4 py-6 flex flex-col items-center min-h-full">
          {children}
          {/* Spacer for bottom UI */}
          <div className="h-40 w-full shrink-0" />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <MadeWithDyad />
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;