
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
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className={`flex-1 w-full ${!withoutPadding ? 'pt-24 pb-16' : ''}`}>
        <div className={`mx-auto ${className}`}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Container;
