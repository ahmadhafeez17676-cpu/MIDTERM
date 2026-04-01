import Link from "next/link";
import { ArrowRight, Zap, Globe, Lock, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Zenith Hero Section */}
      <section className="w-full relative py-32 md:py-48 flex flex-col items-center text-center overflow-hidden">
        <div className="z-10 max-w-6xl flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-10 shadow-xl shadow-primary/5 italic">
             <Zap className="h-4 w-4 fill-accent text-accent" />
            Cerulean Zenith Protocol
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-10 text-primary uppercase italic leading-none animate-in fade-in slide-in-from-top duration-1000">
            AdFlow <span className="text-accent underline underline-offset-[1.5rem] decoration-primary/20">Light</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-slate-600 font-medium max-w-4xl mx-auto leading-snug tracking-tight mb-16 animate-in fade-in duration-1000 delay-300 italic">
            Command the standard of global visibility with the <span className="text-primary font-black uppercase">Royal Azure</span> Engine. <br className="hidden md:block" />
            Where elite brands achieve absolute market authority.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <Link href="/explore" className="h-16 px-12 flex items-center justify-center bg-primary text-white font-black uppercase italic tracking-tighter text-lg rounded-2xl transition-all hover:scale-105 shadow-2xl shadow-primary/20 active:scale-95 group border border-primary/50 hover:bg-accent hover:text-primary hover:border-accent">
              Enter Marketplace
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/dashboard" className="h-16 px-12 flex items-center justify-center bg-white hover:bg-slate-50 text-primary font-black uppercase italic tracking-tighter text-lg rounded-2xl border border-primary/10 transition-all hover:border-accent active:scale-95 shadow-xl shadow-slate-100">
              Launch Campaign
            </Link>
          </div>
        </div>

        {/* Decorative Grid Component */}
        <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-primary/[0.03] blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[60%] left-[5%] w-[400px] h-[400px] bg-accent/[0.03] blur-[100px] rounded-full pointer-events-none" />
      </section>

      {/* Feature Architecture */}
      <section className="w-full grid md:grid-cols-3 gap-12 py-32">
        <div className="group p-10 rounded-[2.5rem] glass-card">
          <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center mb-8 shadow-2xl shadow-primary/40 group-hover:rotate-6 transition-transform">
            <Globe className="text-white h-8 w-8" />
          </div>
          <h3 className="text-2xl font-black mb-4 text-primary uppercase italic tracking-tighter">Global Reach</h3>
          <p className="text-slate-500 leading-relaxed font-semibold">
            Deploy your campaigns across the entire AdFlow network with millisecond precision and localized targeting.
          </p>
        </div>
        
        <div className="group p-10 rounded-[2.5rem] glass-card">
          <div className="h-16 w-16 rounded-2xl bg-accent flex items-center justify-center mb-8 shadow-2xl shadow-accent/40 group-hover:rotate-6 transition-transform">
            <Lock className="text-white h-8 w-8" />
          </div>
          <h3 className="text-2xl font-black mb-4 text-primary uppercase italic tracking-tighter">Secure Protocol</h3>
          <p className="text-slate-500 leading-relaxed font-semibold">
            Our manual vetting system and secure payment architecture ensure every interaction is authentic and protected.
          </p>
        </div>

        <div className="rounded-[3rem] glass p-10 hover:border-accent transition-all hover:shadow-2xl hover:shadow-accent/5 group bg-white shadow-xl shadow-slate-100">
          <div className="h-16 w-16 rounded-2xl bg-primary text-accent flex items-center justify-center mb-8 shadow-xl shadow-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-transform">
            <TrendingUp className="h-8 w-8 stroke-[2.5]" />
          </div>
          <h3 className="text-2xl font-black mb-4 text-primary uppercase italic tracking-tighter decoration-accent/30 group-hover:underline underline-offset-4">Azure Precision</h3>
          <p className="text-slate-500 leading-relaxed font-semibold italic opacity-90">
            Real-time analytics and predictive ranking engines ensure your brand maintains absolute market velocity.
          </p>
        </div>
      </section>
    </div>
  );
}
