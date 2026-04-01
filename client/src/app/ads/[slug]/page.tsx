import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Star, ExternalLink, Tag, User } from "lucide-react";

// This would normally come from an API call
const mockAd = {
  id: 1,
  slug: "premium-web-development",
  title: "Premium Web Development Services",
  description:
    "Full-stack web development with modern technologies. We specialize in React, Next.js, Node.js, and cloud-native architectures. Our team delivers pixel-perfect, high-performance web applications tailored to your business needs.\n\nWhether you need a landing page, a complex SaaS platform, or an e-commerce solution, we've got you covered. With over 200 successful projects delivered, we are your trusted technology partner.",
  category: "Technology",
  city: "Lahore",
  package: "Premium",
  featured: true,
  imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
  publishedAt: "2026-03-28",
  expiresAt: "2026-04-27",
  rankScore: 95,
  seller: "TechVision Labs",
  contactUrl: "https://example.com",
  media: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=400&fit=crop",
  ],
};

export default function AdDetailPage() {
  const ad = mockAd;

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <Link href="/explore" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to Explore
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[400px]">
            <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
            {ad.featured && (
              <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-primary/90 text-white text-sm font-semibold flex items-center gap-1.5">
                <Star className="h-4 w-4" /> Featured Ad
              </div>
            )}
          </div>

          {/* Title & Meta */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">{ad.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                <Tag className="h-3.5 w-3.5" /> {ad.category}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                <MapPin className="h-3.5 w-3.5" /> {ad.city}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                <Clock className="h-3.5 w-3.5" /> Published {ad.publishedAt}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl p-6 bg-panel/50 border border-border/50">
            <h2 className="text-lg font-bold mb-3">About This Ad</h2>
            <div className="text-gray-400 whitespace-pre-line leading-relaxed">
              {ad.description}
            </div>
          </div>

          {/* Media Gallery */}
          <div className="rounded-2xl p-6 bg-panel/50 border border-border/50">
            <h2 className="text-lg font-bold mb-4">Gallery</h2>
            <div className="grid grid-cols-3 gap-3">
              {ad.media.map((url, i) => (
                <div key={i} className="rounded-xl overflow-hidden h-32 hover:ring-2 ring-primary/50 transition-all cursor-pointer">
                  <img src={url} alt={`Media ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Package Info */}
          <div className="rounded-2xl p-6 bg-panel/50 border border-border/50 glass">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Package</span>
              <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold">{ad.package}</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Rank Score</span>
                <span className="font-bold text-primary">{ad.rankScore}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Expires</span>
                <span className="font-medium">{ad.expiresAt}</span>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="rounded-2xl p-6 bg-panel/50 border border-border/50 glass">
            <h3 className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-4">Advertiser</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-bold">{ad.seller}</p>
                <p className="text-xs text-gray-500">Verified Seller</p>
              </div>
            </div>
            <a
              href={ad.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all hover:scale-[1.02]"
            >
              Visit Website <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30">
            <h3 className="font-bold text-lg mb-2">Want a spot like this?</h3>
            <p className="text-sm text-gray-400 mb-4">Get your brand in front of thousands. Choose a package and submit your ad today.</p>
            <Link href="/packages" className="w-full h-11 flex items-center justify-center bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all">
              View Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
