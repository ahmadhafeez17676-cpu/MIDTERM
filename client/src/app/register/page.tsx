"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, User, Building2 } from "lucide-react";

const roles = [
  { value: "client", label: "Client", desc: "Command and deploy global ad nodes" },
  { value: "moderator", label: "Vetting", desc: "Audit and authorize brand entry" },
  { value: "admin", label: "Root", desc: "Financial ledger and system control" },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "client",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Onboarding Entity... (Mock)");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-24 px-4 bg-slate-50 relative overflow-hidden">
      {/* Mesh Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-primary/[0.03] blur-[160px] rounded-full pointer-events-none" />

      <section className="w-full max-w-4xl mx-auto px-6 z-10 relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-12 shadow-xl shadow-primary/5 italic">
             <User className="h-4 w-4 fill-accent text-accent" />
            Azure Onboarding Protocol
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-primary uppercase italic mb-8">
            Create <span className="text-accent underline underline-offset-[1.5rem] decoration-primary/10">Entity</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-medium italic tracking-tight leading-relaxed max-w-4xl mx-auto">
            Join the AdFlow Azure Network and command absolute market authority. <br className="hidden md:block" />
            The standard for elite professional brand visibility.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12 rounded-[3.5rem] p-16 bg-white border border-slate-100 shadow-2xl shadow-slate-200/60 max-w-xl mx-auto backdrop-blur-sm">
          {/* Name */}
          <div className="space-y-4">
            <label htmlFor="reg-name" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4 italic">Entity Name [Individual/Corp]</label>
            <div className="relative">
              <User className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
              <input
                id="reg-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enterprise or Personal Identity"
                required
                className="w-full h-20 pl-20 pr-8 rounded-[1.5rem] bg-slate-50 border border-slate-200 text-primary placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all font-black uppercase italic tracking-tighter text-xl"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-4">
            <label htmlFor="reg-email" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4 italic">Comm Link [Email]</label>
            <div className="relative">
              <Mail className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
              <input
                id="reg-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="protocol@azure-net.org"
                required
                className="w-full h-20 pl-20 pr-8 rounded-[1.5rem] bg-slate-50 border border-slate-200 text-primary placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-accent/10 transition-all font-black uppercase italic tracking-tighter text-xl"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-4">
            <label htmlFor="reg-password" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4 italic">Passkey Security</label>
            <div className="relative">
              <Lock className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" />
              <input
                id="reg-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                required
                minLength={8}
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

          {/* Role Selection */}
          <div className="space-y-5">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 pl-4 italic">Clearance Matrix</label>
            <div className="grid grid-cols-3 gap-4">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: role.value })}
                  className={`p-6 rounded-[2rem] border text-center transition-all ${
                    form.role === role.value
                      ? "bg-primary text-white border-primary shadow-2xl shadow-primary/30 rotate-2"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100 italic"
                  }`}
                >
                  <Building2 className={`h-6 w-6 mx-auto mb-3 ${form.role === role.value ? "text-accent fill-accent" : "text-slate-300"}`} />
                  <p className="text-[10px] font-black uppercase tracking-[0.1em]">{role.label}</p>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-20 flex items-center justify-center gap-4 bg-primary hover:bg-primary/95 text-white font-black uppercase italic tracking-tighter text-xl rounded-[1.5rem] transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/40 mt-16 group"
          >
            Initiate Access <ArrowRight className="h-8 w-8 stroke-[3] group-hover:translate-x-2 transition-transform" />
          </button>

          <div className="text-center mt-12 pt-10 border-t border-slate-100">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] italic mb-4">Already Root Verified?</p>
            <Link href="/login" className="text-lg font-black text-primary hover:text-accent underline underline-offset-8 decoration-accent/30 uppercase tracking-tighter italic transition-all animate-pulse">Authenticate entry &rarr;</Link>
          </div>
        </form>
      </section>
    </div>
  );
}
