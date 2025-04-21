import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-[100vw]">
        <div className="container  mx-auto ">{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
