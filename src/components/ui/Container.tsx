
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  withoutPadding?: boolean;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = "",
  withoutPadding = false 
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-background/50 backdrop-filter">
      <Navbar />
      <main className={`flex-1 w-full ${!withoutPadding ? 'pt-28 pb-20' : ''}`}>
        <div className={`container mx-auto px-4 md:px-6 ${className}`}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Container;
