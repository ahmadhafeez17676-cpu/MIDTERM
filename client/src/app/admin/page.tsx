"use client";

import { useState } from "react";
import { 
  TrendingUp, Star, Clock, 
  Zap, Megaphone, BarChart3, DollarSign, ChevronRight, Users, Settings
} from "lucide-react";

// Mock data
const adminStats = [
  { label: "Revenue", value: "PKR 1.2M", icon: <DollarSign className="h-5 w-5" />, trend: "+12.5%", color: "from-emerald-500/20 to-teal-500/20", textColor: "text-emerald-600" },
  { label: "Active Nodes", value: "154", icon: <Megaphone className="h-5 w-5" />, trend: "+8.2%", color: "from-blue-500/20 to-cyan-500/20", textColor: "text-blue-600" },
  { label: "Elite Users", value: "842", icon: <Users className="h-5 w-5" />, trend: "+15.0%", color: "from-purple-500/20 to-pink-500/20", textColor: "text-purple-600" },
  { label: "Velocity", value: "2.4M", icon: <TrendingUp className="h-5 w-5" />, trend: "+24.3%", color: "from-orange-500/20 to-amber-500/20", textColor: "text-orange-600" },
];

const pendingPayments = [
  { id: 1, ad: "Premium Web Dev", user: "ahmad@gmail.com", amount: "PKR 10,000", method: "JazzCash", date: "2026-03-31" },
  { id: 2, ad: "Digital Marketing", user: "marketing_pro@sky.net", amount: "PKR 5,000", method: "Easypaisa", date: "2026-04-01" },
  { id: 3, ad: "Real Estate Listing", user: "homes_pk@gmail.com", amount: "PKR 10,000", method: "Bank Transfer", date: "2026-04-01" },
];

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState("overview");

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-12 px-6">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10 border-b border-slate-200 pb-12">
        <div>
          <div className="inline-flex items-center gap-4 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-10 shadow-xl shadow-primary/5 italic">
             <Zap className="h-4 w-4 fill-accent" />
            Azure Root Authority
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-primary uppercase italic mb-8 leading-none">
            Admin <span className="text-accent underline underline-offset-[1.5rem] decoration-primary/10">Matrix</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-medium italic tracking-tight leading-relaxed max-w-4xl">
            Financial ledgers, node synchronization, and system-wide azure control. <br className="hidden md:block" />
            Authoritative command over the Royal Azure Sponsored Network.
          </p>
        </div>
        
        <div className="flex items-center gap-2 p-1.5 glass rounded-2xl border border-slate-200">
           {["overview", "payments", "publishing", "analytics"].map((view) => (
             <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest italic transition-all ${
                  activeView === view
                    ? "bg-primary text-white shadow-2xl shadow-primary/10"
                    : "text-slate-400 hover:text-primary"
                }`}
             >
               {view}
             </button>
           ))}
        </div>
      </div>

      <div className="space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {activeView === "overview" && (
          <>
            {/* Matrix Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {adminStats.map((stat) => (
                <div key={stat.label} className="rounded-[2.5rem] p-10 bg-white border border-slate-100 transition-all group relative overflow-hidden shadow-2xl shadow-slate-200/50">
                  <div className={`absolute -right-4 -top-4 w-40 h-40 bg-primary blur-[80px] opacity-[0.03] pointer-events-none group-hover:opacity-[0.06] transition-opacity`} />
                  <div className={`h-16 w-16 rounded-[1.5rem] bg-slate-50 text-primary flex items-center justify-center mb-10 border border-slate-100 group-hover:rotate-6 transition-transform shadow-xl shadow-slate-200/50`}>
                    <span className="text-primary">{stat.icon}</span>
                  </div>
                  <div>
                      <p className="text-5xl font-black text-primary italic tracking-tighter mb-3 leading-none uppercase">{stat.value}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic decoration-accent/30 group-hover:underline underline-offset-4">{stat.label}</p>
                        <span className="text-[10px] font-black text-emerald-600 flex items-center gap-2">
                          <TrendingUp className="h-4 w-4" /> {stat.trend}
                        </span>
                      </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Financial Ledger Queue */}
              <div className="rounded-[3rem] bg-white p-12 border border-slate-100 shadow-2xl shadow-slate-200/50">
                 <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-100">
                   <h2 className="font-black text-2xl uppercase italic tracking-tighter text-primary">Financial Ledger</h2>
                   <div className="h-10 px-5 rounded-xl bg-accent/10 text-accent flex items-center gap-3 text-[10px] font-black tracking-widest uppercase italic border border-accent/20">
                     <Clock className="h-4 w-4" /> 08 Actions Pending
                   </div>
                 </div>

                 <div className="space-y-6">
                    {pendingPayments.map((p) => (
                      <div key={p.id} className="p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100 flex items-center justify-between hover:bg-slate-100 transition-all group/item">
                        <div className="flex items-center gap-6">
                          <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center font-black text-slate-400 uppercase italic text-xs tracking-tighter border border-slate-100">
                            TXN
                          </div>
                          <div>
                             <p className="font-black text-primary uppercase italic tracking-tighter text-xl leading-none group-hover/item:text-accent transition-colors">{p.ad}</p>
                             <p className="text-[10px] font-bold text-slate-400 italic uppercase tracking-widest mt-2">{p.user} &mdash; <span className="text-primary">{p.method}</span></p>
                          </div>
                        </div>
                        <div className="text-right">
                           <p className="text-2xl font-black text-emerald-600 italic tracking-tighter leading-none mb-2">{p.amount}</p>
                           <button className="text-[9px] font-black uppercase text-slate-400 hover:text-primary transition-all tracking-widest flex items-center gap-2 justify-end">
                             Verify Node <ChevronRight className="h-3 w-3" />
                           </button>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

               {/* Publication Matrix */}
               <div className="rounded-[3rem] bg-white p-12 border border-slate-100 shadow-2xl shadow-slate-200/50">
                 <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-100">
                   <h2 className="font-black text-2xl uppercase italic tracking-tighter text-primary">Entry Matrix</h2>
                   <button className="h-11 px-8 rounded-xl bg-primary text-white flex items-center gap-3 text-[10px] font-black tracking-widest uppercase italic hover:bg-primary/90 transition-all shadow-2xl active:scale-95">
                     <Zap className="h-4 w-4 fill-accent" /> Smart Schedule
                   </button>
                 </div>
                 
                 <div className="p-12 text-center rounded-[2.5rem] bg-slate-50 border border-dashed border-slate-200">
                    <p className="text-slate-400 font-bold italic text-sm mb-10 leading-relaxed uppercase tracking-tighter">
                      No units awaiting publication node. <br /> All nodes synchronized with Azure standard.
                    </p>
                    <div className="flex items-center gap-4 max-w-sm mx-auto">
                       <button className="flex-1 h-16 bg-emerald-600 text-white rounded-2xl font-black uppercase italic tracking-tighter text-sm hover:scale-[1.02] transition-all shadow-2xl shadow-emerald-600/20 active:scale-95">
                         Execute Publication
                       </button>
                       <button className="h-16 w-16 bg-white text-slate-400 rounded-2xl flex items-center justify-center hover:text-primary transition-all border border-slate-200 shadow-xl shadow-slate-200/50">
                         <Settings className="h-6 w-6" />
                       </button>
                    </div>
                 </div>
               </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
