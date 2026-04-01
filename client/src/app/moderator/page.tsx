"use client";

import Image from "next/image";
import { ShieldCheck, Clock, Filter, XCircle, AlertCircle } from "lucide-react";

// Mock data
const reviewQueue = [
  { id: 1, title: "Premium Web Development Services", user: "ahmad@gmail.com", category: "Services", package: "Premium", date: "2026-04-01", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop" },
  { id: 2, title: "Local Delivery Promo", user: "delivery_king@sky.net", category: "Ads", package: "Standard", date: "2026-04-01", imageUrl: "https://images.unsplash.com/photo-1510511459019-5dee997dd1db?q=80&w=400&auto=format&fit=crop" },
  { id: 3, title: "SaaS Platform Launch", user: "saas_pro@gmail.com", category: "Software", package: "Basic", date: "2026-03-31", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop" },
];

export default function ModeratorPage() {
  return (
    <div className="min-h-screen max-w-7xl mx-auto py-12 px-6">
      {/* Vetting Protocol Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-200 pb-10">
        <div>
          <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-12 shadow-xl shadow-primary/5 italic">
             <ShieldCheck className="h-5 w-5 fill-accent text-accent" />
            Azure Vetting Terminal
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-primary uppercase italic leading-none">
            Vetting <span className="text-accent underline underline-offset-[1.5rem] decoration-primary/10">Matrix</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-medium italic tracking-tight leading-relaxed max-w-4xl opacity-90">
            Audit and authorize professional node entry with absolute authority. <br className="hidden md:block" />
            The premier standard for brand legitimacy verification.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="rounded-[2.5rem] p-8 flex items-center gap-10 border border-slate-100 bg-white shadow-2xl shadow-slate-200/50">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic mb-2">Pending Nodes</p>
              <p className="text-4xl font-black text-primary italic leading-none">{reviewQueue.length} <span className="text-xs text-accent not-italic uppercase tracking-tighter ml-2 font-black">Waiting</span></p>
            </div>
            <div className="h-16 w-16 rounded-[1.5rem] bg-primary text-white flex items-center justify-center border border-primary/10 shadow-xl shadow-primary/20 transition-all hover:rotate-12">
              <Clock className="h-8 w-8 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Vetting Stream */}
        <div className="lg:col-span-3 space-y-12">
          <div className="rounded-[3rem] bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
            <div className="p-12 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-black text-3xl uppercase italic tracking-tighter text-primary leading-none">Vetting Stream</h2>
              <div className="flex items-center gap-4">
                <button className="h-14 w-14 flex items-center justify-center rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-primary transition-all border border-slate-200 shadow-lg">
                  <Filter className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-slate-50">
              {reviewQueue.map((ad) => (
                <div key={ad.id} className="p-10 hover:bg-slate-50/80 transition-all group cursor-pointer">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div className="flex items-start gap-8">
                      <div className="relative h-24 w-24 rounded-[2rem] bg-slate-100 border border-slate-200 overflow-hidden shrink-0 group-hover:border-primary/30 transition-all shadow-xl shadow-slate-200/50">
                        <Image 
                          src={ad.imageUrl} 
                          alt={ad.title} 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-black text-3xl text-primary group-hover:text-accent transition-colors leading-none mb-4 italic uppercase tracking-tighter">
                          {ad.title}
                        </h3>
                        <p className="text-[10px] font-black text-slate-400 italic uppercase tracking-widest leading-none mb-6">{ad.user} &bull; {ad.category}</p>
                        <div className="flex items-center gap-6">
                           <span className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[10px] font-black uppercase text-slate-500 tracking-tighter italic group-hover:text-primary transition-colors">
                            {ad.package} ARCH
                          </span>
                          <span className="text-[10px] text-slate-300 font-black tracking-widest uppercase flex items-center gap-3">
                            <Clock className="h-4 w-4" /> SUBMITTED: {ad.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button className="h-16 px-10 bg-emerald-600 text-white rounded-[1.5rem] font-black uppercase italic tracking-tighter text-sm hover:scale-[1.05] transition-all shadow-2xl shadow-emerald-600/30">
                        Authorize Node
                      </button>
                      <button className="h-16 w-16 bg-white text-red-500 rounded-[1.5rem] flex items-center justify-center hover:bg-red-50 transition-all border border-slate-200 shadow-xl shadow-slate-200/50">
                        <XCircle className="h-8 w-8" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Details */}
        <div className="lg:col-span-1 space-y-12">
           <div className="rounded-[3rem] bg-white border border-slate-100 p-12 shadow-2xl shadow-slate-200/50 sticky top-32">
             <div className="flex items-center gap-4 mb-10">
               <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                 <AlertCircle className="h-6 w-6 text-primary" />
               </div>
               <h4 className="text-[10px] font-black uppercase tracking-widest text-primary italic">Audit Parameters</h4>
             </div>
             
             <div className="space-y-8">
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-200">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Brand Reputation</p>
                  <p className="text-4xl font-black text-primary italic leading-none">AAA <span className="text-accent text-xs">Node</span></p>
               </div>
               
               <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-200">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 italic">Visual Fidelity</p>
                  <p className="text-4xl font-black text-primary italic leading-none">98% <span className="text-emerald-500 text-xs">High</span></p>
               </div>
               
               <div className="pt-8 border-t border-slate-100 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
                  <Activity className="h-4 w-4 text-emerald-500 animate-pulse" /> System Optimal
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function Activity(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
