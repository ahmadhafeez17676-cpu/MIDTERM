"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ImagePlus, Save, Send, ChevronDown } from "lucide-react";

const categories = ["Technology", "Marketing", "Real Estate", "Health", "Food", "Education", "Automotive", "Fashion"];
const cities = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan"];
const packageOptions = [
  { value: "basic", label: "Basic – PKR 2,500 (7 days)" },
  { value: "standard", label: "Standard – PKR 5,000 (15 days)" },
  { value: "premium", label: "Premium – PKR 10,000 (30 days)" },
];

export default function CreateAdPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    city: "",
    package: "",
    imageUrl: "",
    contactUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Ad saved as Draft (mock).");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Ad submitted for review (mock).");
  };

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-8">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Dashboard
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight mb-2">Create New Ad</h1>
      <p className="text-gray-400 mb-8">Fill in the details below. You can save it as a draft or submit directly for review.</p>

      <form className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="ad-title" className="text-sm font-medium text-gray-300">Ad Title</label>
          <input
            id="ad-title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Premium Web Development Services"
            required
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="ad-desc" className="text-sm font-medium text-gray-300">Description</label>
          <textarea
            id="ad-desc"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your ad in detail..."
            rows={5}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
          />
        </div>

        {/* Category & City */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="ad-category" className="text-sm font-medium text-gray-300">Category</label>
            <div className="relative">
              <select
                id="ad-category"
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 pr-10 rounded-xl bg-white/5 border border-white/10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              >
                <option value="" className="bg-zinc-900">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-zinc-900">{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="ad-city" className="text-sm font-medium text-gray-300">City</label>
            <div className="relative">
              <select
                id="ad-city"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className="w-full h-12 px-4 pr-10 rounded-xl bg-white/5 border border-white/10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
              >
                <option value="" className="bg-zinc-900">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city} className="bg-zinc-900">{city}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Package */}
        <div className="space-y-2">
          <label htmlFor="ad-package" className="text-sm font-medium text-gray-300">Package</label>
          <div className="relative">
            <select
              id="ad-package"
              name="package"
              value={form.package}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 pr-10 rounded-xl bg-white/5 border border-white/10 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
            >
              <option value="" className="bg-zinc-900">Select Package</option>
              {packageOptions.map((pkg) => (
                <option key={pkg.value} value={pkg.value} className="bg-zinc-900">{pkg.label}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label htmlFor="ad-image" className="text-sm font-medium text-gray-300">Image URL</label>
          <div className="relative">
            <ImagePlus className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              id="ad-image"
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </div>
          <p className="text-xs text-gray-500">Paste an external image URL. No file uploads.</p>
        </div>

        {/* Contact URL */}
        <div className="space-y-2">
          <label htmlFor="ad-contact" className="text-sm font-medium text-gray-300">Contact / Website URL</label>
          <input
            id="ad-contact"
            name="contactUrl"
            type="url"
            value={form.contactUrl}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={handleSaveDraft}
            type="button"
            className="h-12 px-6 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all flex-1"
          >
            <Save className="h-4 w-4" /> Save as Draft
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            className="h-12 px-6 flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(79,70,229,0.3)] flex-1"
          >
            <Send className="h-4 w-4" /> Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
}
