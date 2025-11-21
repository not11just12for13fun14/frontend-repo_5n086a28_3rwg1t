import React, { useEffect, useState } from 'react';

const apiBase = import.meta.env.VITE_BACKEND_URL || '';

export default function FeaturedCarousel() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch(`${apiBase}/api/events?featured=true&limit=8`);
        const data = await res.json();
        setItems(data || []);
      } catch (e) {
        console.error(e);
      }
    }
    fetchFeatured();
  }, []);

  if (!items.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 mt-6">
      <h2 className="text-white text-2xl font-semibold mb-4">Featured Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {items.map((item) => (
          <div key={item.id} className="group rounded-2xl overflow-hidden bg-slate-800/60 border border-slate-700 hover:border-blue-500/40 transition">
            {item.image_url ? (
              <img src={item.image_url} alt={item.title} className="h-40 w-full object-cover" />
            ) : (
              <div className="h-40 w-full bg-slate-700" />
            )}
            <div className="p-4">
              <h3 className="text-white font-medium line-clamp-1">{item.title}</h3>
              <p className="text-slate-300 text-sm line-clamp-2 mt-1">{item.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-blue-300 text-sm">{item.date || 'TBA'}</span>
                <span className="text-white font-semibold">{item.price ? `$${item.price}` : 'Free'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
