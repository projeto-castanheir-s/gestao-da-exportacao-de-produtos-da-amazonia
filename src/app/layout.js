import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Plataforma Exportação - Castanhas do Brasil",
  description: "Plataforma de conexão entre exportadores e importadores de castanhas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
