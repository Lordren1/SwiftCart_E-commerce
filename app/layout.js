import { Inter } from "next/font/google";
import "./globals.css";
import AppContextProvider from "@/context/AppContext";
import {  Toaster } from "react-hot-toast";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

/* const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
}); */

export const metadata = {
  title: "SwiftCart",
  description: "Ecommerce Clothing App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased` }
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning={true}>
        <AppContextProvider>
          <Toaster /> 
          <Provider >
            {children}
          </Provider>
        </AppContextProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
