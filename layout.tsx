import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "N VERA SETS | Joyería",
  description: "Sets, collares, anillos, aretes y pulseras. Compra joyería con atención personalizada."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
