import type { Metadata } from "next";
import { Poppins, Space_Grotesk, Inter, Syne } from "next/font/google";
import "./globals.css";

// Bold, modern font for hero and main headings
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-poppins",
  subsets: ["latin"],
  display: 'swap',
});

// Tech-forward font for special headings and accents
const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: 'swap',
});

// Clean, readable font for body text
const inter = Inter({
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

// Artistic font for special effects and hero elements
const syne = Syne({
  weight: ['400', '500', '600', '700', '800'],
  variable: "--font-syne",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Climate Action Pledge - Join the Movement",
  description: "Take the Climate Action Pledge and join thousands of Indians committed to a sustainable future. Get your personalized certificate and see your pledge on the wall.",
  keywords: "climate action, sustainability, pledge, environment, India, green initiative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${poppins.variable} ${spaceGrotesk.variable} ${inter.variable} ${syne.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
