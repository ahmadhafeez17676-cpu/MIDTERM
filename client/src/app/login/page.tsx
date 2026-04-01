"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Authenticating Node... (Mock)");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 bg-slate-50 relative overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-primary/[0.03] blur-[160px] rounded-full pointer-events-none" />

      <section className="w-full max-w-4xl mx-auto px-6 z-10 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-10 shadow-xl shadow-primary/5 italic">
             <Zap className="h-4 w-4 fill-accent text-accent" />
            Azure Entry Protocol
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-primary uppercase italic mb-8">
            Light <span className="text-accent underline underline-offset-[1.5rem] decoration-primary/10">Node</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-medium italic tracking-tight leading-relaxed max-w-4xl mx-auto">
            Authenticate your credentials to command the Azure Network. <br className="hidden md:block" />
            The authoritative gateway for elite professional nodes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12 rounded-[3.5rem] p-16 bg-white border border-slate-100 shadow-2xl shadow-slate-200/60 max-w-xl mx-auto backdrop-blur-sm">
          {/* Email */}
          <div className="space-y-4">
            <label htmlFor="email" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4 italic">Authority ID [Email]</label>
            <div className="relative">
              <Mail className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="authority@cerulean.net"
                required
                className="w-full h-20 pl-20 pr-8 rounded-[1.5rem] bg-slate-50 border border-slate-200 text-primary placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all font-black uppercase italic tracking-tighter text-xl"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pl-4">
              <label htmlFor="password" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Security Passkey</label>
              <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-accent italic decoration-accent/30 hover:underline underline-offset-4 transition-all">Lost Access?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full h-20 pl-20 pr-20 rounded-[1.5rem] bg-slate-50 border border-slate-200 text-primary placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all text-2xl"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-20 flex items-center justify-center gap-4 bg-primary hover:bg-primary/95 text-white font-black uppercase italic tracking-tighter text-xl rounded-[1.5rem] transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/40 mt-16 group"
          >
            Authenticate <ArrowRight className="h-8 w-8 stroke-[3] group-hover:translate-x-2 transition-transform" />
          </button>

          <div className="text-center mt-12 pt-10 border-t border-slate-100">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic mb-4">Unauthorized Entity Access?</p>
            <Link href="/register" className="text-lg font-black text-primary hover:text-accent underline underline-offset-8 decoration-accent/30 uppercase tracking-tighter italic transition-all">Request Node Clearance &rarr;</Link>
          </div>
        </form>
      </section>
    </div>
  );
}
