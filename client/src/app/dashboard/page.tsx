"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, PlusCircle, FileText, CreditCard,
  Bell, Clock, CheckCircle, XCircle, AlertTriangle,
  Eye
} from "lucide-react";

// Mock data
const stats = [
  { label: "Total Ads", value: "12", icon: <FileText className="h-5 w-5" />, color: "from-blue-500/20 to-cyan-500/20", textColor: "text-blue-600" },
  { label: "Published", value: "5", icon: <CheckCircle className="h-5 w-5" />, color: "from-emerald-500/20 to-green-500/20", textColor: "text-emerald-600" },
  { label: "Under Review", value: "3", icon: <Clock className="h-5 w-5" />, color: "from-amber-500/20 to-yellow-500/20", textColor: "text-amber-600" },
  { label: "Total Views", value: "2.4K", icon: <Eye className="h-5 w-5" />, color: "from-primary/20 to-accent/20", textColor: "text-primary" },
];

const myAds = [
  { id: 1, title: "Premium Web Development Services", status: "Published", package: "Premium", date: "2026-03-28", views: 845 },
  { id: 2, title: "Digital Marketing Campaign", status: "Under Review", package: "Standard", date: "2026-03-30", views: 0 },
  { id: 3, title: "E-Commerce Store Launch", status: "Payment Pending", package: "Basic", date: "2026-03-31", views: 0 },
  { id: 4, title: "Mobile App Promotion", status: "Draft", package: "Premium", date: "2026-04-01", views: 0 },
  { id: 5, title: "Restaurant Grand Opening", status: "Published", package: "Standard", date: "2026-03-25", views: 312 },
  { id: 6, title: "Real Estate Listing", status: "Expired", package: "Basic", date: "2026-02-15", views: 1203 },
];

const notifications = [
  { id: 1, message: "Your ad 'Digital Marketing Campaign' is under review.", time: "2 hours ago", type: "info" },
  { id: 2, message: "Payment required for 'E-Commerce Store Launch'.", time: "5 hours ago", type: "warning" },
  { id: 3, message: "Your ad 'Premium Web Development' was published!", time: "1 day ago", type: "success" },
];

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  Draft: { color: "text-slate-400 bg-slate-400/10 border-slate-400/20", icon: <FileText className="h-3.5 w-3.5" /> },
  "Under Review": { color: "text-amber-600 bg-amber-400/10 border-amber-400/20", icon: <Clock className="h-3.5 w-3.5" /> },
  "Payment Pending": { color: "text-orange-600 bg-orange-400/10 border-orange-400/20", icon: <AlertTriangle className="h-3.5 w-3.5" /> },
  Published: { color: "text-emerald-600 bg-emerald-400/10 border-emerald-400/20", icon: <CheckCircle className="h-3.5 w-3.5" /> },
  Expired: { color: "text-red-500 bg-red-400/10 border-red-400/20", icon: <XCircle className="h-3.5 w-3.5" /> },
};

type Tab = "overview" | "my-ads" | "payments" | "notifications";

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "overview", label: "Console Matrix", icon: <LayoutDashboard className="h-4 w-4" /> },
    { key: "my-ads", label: "Ad Inventory", icon: <FileText className="h-4 w-4" /> },
    { key: "payments", label: "Financial Ledger", icon: <CreditCard className="h-4 w-4" /> },
    { key: "notifications", label: "System Alerts", icon: <Bell className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen px-6 py-12">
      {/* Dashboard Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-slate-200 pb-12">
        <div>
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-10 shadow-xl shadow-primary/5 italic">
           <LayoutDashboard className="h-4 w-4 fill-accent text-accent" />
          Azure Console Terminal
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-primary uppercase italic leading-none">
            Control <span className="text-accent underline underline-offset-[1.5rem] decoration-primary/10">Matrix</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-medium italic tracking-tight leading-relaxed max-w-4xl opacity-90">
            Manage your professional visibility nodes with absolute precision. <br className="hidden md:block" />
            The authoritative standard for Royal Azure Network interaction.
          </p>
        </div>
        <Link
          href="/dashboard/create-ad"
          className="h-16 px-10 flex items-center gap-4 bg-primary hover:bg-primary/95 text-white font-black uppercase tracking-tighter text-sm rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/30 w-fit italic"
        >
          <PlusCircle className="h-6 w-6" /> Deploy New Campaign
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-12">
        {/* Sidebar Nav Matrix */}
        <div className="lg:col-span-1 space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`w-full flex items-center justify-between px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all italic ${
                activeTab === tab.key
                  ? "bg-white text-primary shadow-2xl shadow-slate-200/50 translate-x-2 border border-slate-100"
                  : "text-slate-400 hover:text-primary hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-4">
                {tab.icon} {tab.label}
              </span>
              {activeTab === tab.key && <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />}
            </button>
          ))}
          
          <div className="mt-12 p-8 rounded-3xl bg-primary/5 border border-primary/10 transition-all opacity-80 hover:opacity-100">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 italic">Optimization Hint</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Ads with <span className="text-primary font-black">Precision Targeting</span> show 42% higher lift velocity. Update your parameters in the Ad Inventory.
            </p>
          </div>
        </div>

        {/* Console Viewport */}
        <div className="lg:col-span-3">
          {activeTab === "overview" && (
            <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
              {/* Matrix Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-[2.5rem] p-10 bg-white border border-slate-100 group transition-all hover:scale-[1.05] shadow-2xl shadow-slate-200/50">
                    <div className={`h-14 w-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-8 shadow-xl shadow-primary/20 group-hover:rotate-6 transition-transform`}>
                      <span className="text-white">{stat.icon}</span>
                    </div>
                    <p className="text-5xl font-black text-primary italic tracking-tighter mb-2 leading-none">{stat.value}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic decoration-accent/30 group-hover:underline underline-offset-4">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Active Units */}
                <div className="rounded-[3rem] bg-white overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 transition-all">
                  <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h2 className="font-black text-2xl uppercase italic tracking-tighter text-primary">Active Units</h2>
                    <button onClick={() => setActiveTab("my-ads")} className="text-[10px] uppercase font-black tracking-widest text-primary hover:text-accent transition-all underline underline-offset-8 decoration-accent/30">
                      Access Matrix
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {myAds.slice(0, 4).map((ad) => {
                      const sc = statusConfig[ad.status];
                      return (
                        <div key={ad.id} className="px-10 py-8 hover:bg-slate-50 transition-colors group">
                           <div className="flex items-center justify-between">
                              <div className="min-w-0 pr-4">
                                <p className="font-black text-primary truncate uppercase italic tracking-tighter group-hover:underline decoration-accent/30 transition-all text-xl">{ad.title}</p>
                                <p className="text-[9px] font-black text-slate-400 mt-2 uppercase tracking-widest italic">{ad.package} ARCH &bull; {ad.date}</p>
                              </div>
                              <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border italic ${sc.color} shadow-sm bg-white`}>
                                {ad.status}
                              </span>
                           </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Console Logs */}
                <div className="rounded-[3rem] bg-white overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50">
                  <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <h2 className="font-black text-2xl uppercase italic tracking-tighter text-primary">Console Logs</h2>
                  </div>
                  <div className="p-10 space-y-10">
                    {notifications.map((n) => (
                      <div key={n.id} className="flex items-start gap-6 group">
                        <div className={`mt-2.5 h-2 w-2 rounded-full shrink-0 ${n.type === "success" ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]" : n.type === "warning" ? "bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]" : "bg-primary shadow-[0_0_15px_rgba(37,99,235,0.4)]"}`} />
                        <div>
                          <p className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors leading-relaxed italic">{n.message}</p>
                          <p className="text-[9px] font-black uppercase text-slate-300 mt-3 tracking-widest italic">{n.time} &mdash; AUTH_LOG</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
