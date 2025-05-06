import React from "react";
import { Header } from "@/widgets/Header/Header"
import { Footer } from "@/widgets/Footer/Footer"
import { Outlet } from "react-router";

export const PagesLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <main><Outlet/></main>
      <Footer />
    </div>
  );
};
