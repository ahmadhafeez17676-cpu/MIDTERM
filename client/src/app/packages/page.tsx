import Link from "next/link";
import { Check, Zap, Crown, Star } from "lucide-react";

const packages = [
  {
    name: "Basic",
    price: "PKR 2,500",
    duration: "7 days",
    icon: <Zap className="h-7 w-7" />,
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    badgeColor: "bg-blue-500/20 text-blue-400",
    features: [
      "Standard ad placement",
      "Basic analytics",
      "7-day ad duration",
      "Low priority ranking",
      "Email support",
    ],
    excluded: [
      "Featured badge",
      "Auto boost",
      "Priority support",
    ],
  },
  {
    name: "Standard",
    price: "PKR 5,000",
    duration: "15 days",
    icon: <Star className="h-7 w-7" />,
    color: "from-primary/20 to-violet-500/20",
    borderColor: "border-primary/40",
    badgeColor: "bg-primary/20 text-primary",
    popular: true,
    features: [
      "Enhanced ad placement",
      "Detailed analytics",
      "15-day ad duration",
      "Medium priority ranking",
      "Priority email support",
      "Category highlighting",
    ],
    excluded: [
      "Featured badge",
      "Auto boost",
    ],
  },
  {
    name: "Premium",
    price: "PKR 10,000",
    duration: "30 days",
    icon: <Crown className="h-7 w-7" />,
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-500/30",
    badgeColor: "bg-amber-500/20 text-amber-400",
    features: [
      "Premium ad placement",
      "Real-time analytics dashboard",
      "30-day ad duration",
      "Highest priority ranking",
      "Featured badge ⭐",
      "Auto boost every 48 hours",
      "Dedicated account manager",
      "Priority support 24/7",
    ],
    excluded: [],
  },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="w-full py-24 md:py-32 relative overflow-hidden text-center bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 z-10 relative">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-8 shadow-xl shadow-primary/5 italic">
             <Crown className="h-4 w-4 fill-primary" />
            Tier Distribution Protocol
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 text-primary uppercase italic leading-none">
            Choose Your <span className="text-accent underline underline-offset-8 decoration-primary/10">Package</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-3xl mx-auto italic tracking-tight leading-relaxed">
            Select the perfect enterprise plan to amplify your reach. <br className="hidden md:block" />
            Command the market with the <span className="text-primary font-black">Zenith Network</span>.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-24 grid md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`relative rounded-[3rem] p-12 bg-white border glass flex flex-col transition-all hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/10 group ${
              pkg.popular ? "border-primary ring-1 ring-primary/20" : "border-slate-100"
            }`}
          >
            {pkg.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-primary text-white text-[10px] font-black uppercase italic tracking-widest rounded-xl shadow-2xl shadow-primary/30">
                Most Popular Node
              </div>
            )}

            <div className={`inline-flex items-center justify-center h-20 w-20 rounded-[1.5rem] bg-primary text-white mb-10 shadow-xl shadow-primary/20 transition-all group-hover:rotate-6`}>
              {pkg.icon}
            </div>

            <h2 className="text-3xl font-black text-primary uppercase italic tracking-tighter mb-2">{pkg.name}</h2>
            <p className="text-[10px] font-black text-slate-500 mb-8 uppercase tracking-widest italic">{pkg.duration} clearance</p>

            <div className="mb-10 pb-10 border-b border-slate-100">
              <span className="text-5xl font-black text-primary italic tracking-tighter leading-none">{pkg.price}</span>
              <span className="text-slate-400 text-xs font-black uppercase tracking-widest ml-3">/ Node</span>
            </div>

            <ul className="space-y-5 mb-12 flex-1">
              {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start gap-4 text-sm font-bold text-slate-600 group-hover:text-primary transition-colors italic leading-tight">
                  <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              {pkg.excluded.map((feature) => (
                <li key={feature} className="flex items-start gap-4 text-sm font-bold text-slate-300 italic opacity-60">
                  <span className="h-5 w-5 flex items-center justify-center text-slate-300 mt-0.5 shrink-0">✕</span>
                  <span className="line-through">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/login"
              className={`w-full h-16 flex items-center justify-center font-black uppercase italic tracking-tighter text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-2xl ${
                pkg.popular
                  ? "bg-primary text-white shadow-primary/30"
                  : "bg-slate-50 text-primary border border-slate-200 hover:bg-slate-100 shadow-slate-100"
              }`}
            >
              Authorize Node
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
