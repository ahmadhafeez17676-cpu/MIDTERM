"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, Star, Globe, Briefcase } from "lucide-react";

// Mock data for ads
const mockAds = [
  { id: 1, title: "Premium Web Development Services", user: "Creative Solutions", category: "Services", package: "Premium", price: "Starting at PKR 10,000", duration: "30 Days", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", rating: 4.8 },
  { id: 2, title: "Digital Marketing Campaign", user: "Sky High Marketing", category: "Ads", package: "Standard", price: "Starting at PKR 5,000", duration: "15 Days", imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop", rating: 4.5 },
  { id: 3, title: "E-Commerce Store Launch", user: "Direct Sales", category: "Store", package: "Basic", price: "Starting at PKR 2,000", duration: "7 Days", imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop", rating: 4.9 },
  { id: 4, title: "Restaurant Grand Opening", user: "Foodie Hub", category: "Events", package: "Standard", price: "Starting at PKR 5,000", duration: "15 Days", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop", rating: 4.2 },
  { id: 5, title: "Mobile App Promotion", user: "App Experts", category: "Apps", package: "Premium", price: "Starting at PKR 10,000", duration: "30 Days", imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop", rating: 4.7 },
  { id: 6, title: "Real Estate Listing", user: "Dream Homes", category: "Real Estate", package: "Basic", price: "Starting at PKR 2,000", duration: "7 Days", imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop", rating: 4.6 },
];

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen py-10">
      {/* Search & Global Filter Matrix */}
      <div className="max-w-7xl mx-auto px-6 mb-16 animate-in fade-in slide-in-from-top duration-700">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
          <div className="flex-1 max-w-2xl relative group">
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400 group-hover:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search Ad Entities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-20 pl-20 pr-8 rounded-[2rem] bg-white border border-slate-200 text-primary placeholder:text-slate-400 shadow-xl shadow-slate-200/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-black uppercase italic tracking-tighter text-xl"
            />
          </div>
          
          <div className="flex items-center gap-4">
             <button className="h-16 px-8 rounded-2xl bg-white border border-slate-200 text-slate-500 font-bold flex items-center gap-4 hover:border-primary hover:text-primary transition-all shadow-lg active:scale-95 italic text-sm">
               <Filter className="h-5 w-5" /> Filter Matrix
             </button>
             <button className="h-16 px-8 rounded-2xl bg-primary text-white font-black flex items-center gap-4 hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 active:scale-95 italic text-sm uppercase tracking-tighter">
               <Globe className="h-5 w-5 fill-accent" /> Network Status
             </button>
          </div>
        </div>

        {/* Global Breadcrumb Path */}
        <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-slate-400 italic">
          <Link href="/" className="hover:text-primary">Zenith</Link>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-primary underline underline-offset-4 decoration-accent/30">Network Matrix</span>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span className="text-slate-300">Live Stream [Active]</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {mockAds.map((ad) => (
          <div key={ad.id} className="group relative rounded-[2.5rem] bg-white overflow-hidden border border-slate-100 transition-all hover:-translate-y-4 shadow-2xl shadow-slate-200/50 hover:shadow-primary/10">
            {/* Visual Node */}
            <div className="relative h-72 w-full overflow-hidden">
               <Image 
                 src={ad.imageUrl} 
                 alt={ad.title} 
                 fill
                 className="object-cover transition-transform duration-700 group-hover:scale-110" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <div className="absolute top-6 left-6 flex gap-3">
                  <span className="px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md text-[9px] font-black uppercase tracking-widest text-primary border border-white/20 shadow-xl italic">
                    {ad.package} NODE
                  </span>
                  <span className="px-4 py-2 rounded-xl bg-accent text-white text-[9px] font-black uppercase tracking-widest shadow-xl italic">
                    VERIFIED
                  </span>
               </div>
            </div>

            {/* Entity Metrics */}
            <div className="p-10">
               <div className="flex items-start justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-black text-primary uppercase italic tracking-tighter leading-[0.9] group-hover:underline underline-offset-8 decoration-accent/30 transition-all mb-4 decoration-thickness-2">{ad.title}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic flex items-center gap-2">
                       <Briefcase className="h-4 w-4" /> {ad.user}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-primary text-[10px] font-black italic">
                    <Star className="h-4 w-4 fill-accent text-accent" /> {ad.rating}
                  </div>
               </div>

               <p className="text-slate-500 font-semibold mb-10 text-sm leading-relaxed italic line-clamp-2">
                 High-velocity brand exposure across the Royal Azure Sponsored Network with guaranteed node synchronization.
               </p>

               <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic mb-1">Contract Value</p>
                    <p className="text-xl font-black text-primary italic tracking-tighter">{ad.price}</p>
                  </div>
                  <Link 
                    href={`/ads/${ad.id}`}
                    className="h-14 px-8 bg-primary hover:bg-primary/95 text-white flex items-center justify-center rounded-2xl font-black uppercase italic tracking-tighter text-[11px] transition-all shadow-xl shadow-primary/20 active:scale-95 active:shadow-inner"
                  >
                    View Node
                  </Link>
               </div>
            </div>
          </div>
        ))}
      </main>

      {/* Matrix Expansion Action */}
      <div className="max-w-7xl mx-auto px-6 mt-24 text-center">
         <button className="px-16 h-20 rounded-[2rem] bg-white border border-slate-200 text-slate-400 font-black uppercase italic tracking-[0.2em] text-[11px] hover:border-primary hover:text-primary transition-all shadow-xl shadow-slate-100 hover:scale-[1.05] active:scale-95">
           Synchronize More Nodes
         </button>
      </div>
    </div>
  );
}
