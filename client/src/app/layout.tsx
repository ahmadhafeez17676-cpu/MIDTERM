import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "AdFlow Pro | Elite Azure Marketplace",
  description: "The global standard for professional sponsored ad nodes and brand visibility operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-foreground bg-background min-h-screen flex flex-col`}>
        <nav className="h-24 flex items-center justify-between border-b border-slate-200/50 bg-white/80 backdrop-blur-xl sticky top-0 z-[100] px-6 md:px-16 shadow-lg shadow-slate-100">
          <Link href="/" className="flex items-center gap-4 group transition-all">
            <div className="h-12 w-12 flex items-center justify-center bg-primary text-white rounded-[1.2rem] rotate-3 group-hover:rotate-12 transition-transform shadow-2xl shadow-primary/30">
              <span className="text-2xl font-black italic">A</span>
            </div>
            <div className="flex flex-col">
               <span className="text-3xl font-black tracking-tighter text-primary uppercase italic decoration-accent/30 group-hover:underline underline-offset-4 leading-none">AdFlow <span className="text-accent underline underline-offset-4 decoration-primary/20">Pro</span></span>
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 mt-1 italic opacity-80 group-hover:opacity-100 transition-opacity">Cerulean Zenith Node</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-12 text-[11px] font-black uppercase tracking-widest text-slate-500 italic">
            <Link href="/explore" className="hover:text-primary transition-colors hover:underline underline-offset-[12px] decoration-accent/40 decoration-thickness-2">Matrix</Link>
            <Link href="/packages" className="hover:text-primary transition-colors hover:underline underline-offset-[12px] decoration-accent/40 decoration-thickness-2">Protocols</Link>
            <Link href="/dashboard" className="hover:text-primary transition-colors hover:underline underline-offset-[12px] decoration-accent/40 decoration-thickness-2">Terminal</Link>
            <Link href="/moderator" className="hover:text-primary transition-colors hover:underline underline-offset-[12px] decoration-accent/40 decoration-thickness-2">Audit</Link>
            <Link href="/admin" className="hover:text-primary transition-colors hover:underline underline-offset-[12px] decoration-accent/40 decoration-thickness-2">Root</Link>
          </div>

          <div className="flex items-center gap-8">
             <Link href="/login" className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all underline underline-offset-8 decoration-accent/20 italic">Sign In</Link>
             <Link href="/register" className="h-14 px-10 flex items-center justify-center bg-primary text-white font-black uppercase italic tracking-tighter text-[11px] rounded-[1.2rem] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/40 border-2 border-primary/10 hover:border-accent hover:bg-white hover:text-primary">
               Access Unit &rarr;
             </Link>
          </div>
        </nav>

        <main className="flex-1 bg-aurora relative overflow-hidden">
          {children}
        </main>

        <footer className="py-24 border-t border-slate-200 bg-white px-6 md:px-16 transition-all">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
             <Link href="/" className="flex items-center gap-4 group">
              <div className="h-12 w-12 flex items-center justify-center bg-primary text-white rounded-[1.2rem] rotate-3 transition-transform shadow-xl shadow-primary/20">
                <span className="text-xl font-black italic">A</span>
              </div>
              <span className="text-3xl font-black tracking-tighter text-primary uppercase italic">AdFlow <span className="text-accent underline underline-offset-8 decoration-primary/10">Pro</span></span>
            </Link>

            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic opacity-80 leading-relaxed text-center md:text-left">
              Royal Azure Authority Protocol V1.4.2 &mdash; Zenith Root Terminal <br className="hidden md:block" />
              Global Standard for Professional Nodes &copy; {new Date().getFullYear()}
            </p>

            <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">
              <Link href="/terms" className="hover:text-primary hover:underline underline-offset-8 decoration-accent/30 transition-all">Legals</Link>
              <Link href="/privacy" className="hover:text-primary hover:underline underline-offset-8 decoration-accent/30 transition-all">Policy</Link>
              <span className="text-primary flex items-center gap-4">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] animate-pulse" />
                Network Optimal
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
