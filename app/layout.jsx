"use client";
import "./globals.css";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/navbar/custom.scss";
import NavBarComponent from "./components/navbar/Navbar";
import FooterComponent from "./components/footer/Footer";
import QuoteModal from "./quoteModel/QuoteModal";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {  
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = (submitted) => {
    if (submitted) {
      toast.success("Quote Submitted!");
    }
    setModalOpen(false);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBarComponent handleOpenModal={handleOpenModal} />
        <QuoteModal isOpen={modalOpen} onClose={handleCloseModal} />
        
        {children}

        <FooterComponent />
      </body>
    </html>
  );
}
