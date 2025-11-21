import React from 'react';

function Card({ item, type, onBook }) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-slate-800/60 border border-slate-700 hover:border-blue-500/40 transition">
      {item.image_url ? (
        <img src={item.image_url} alt={item.title || item.name} className="h-40 w-full object-cover" />
      ) : (
        <div className="h-40 w-full bg-slate-700" />
      )}
      <div className="p-4">
        <h3 className="text-white font-medium line-clamp-1">{item.title || item.name}</h3>
        <p className="text-slate-300 text-sm line-clamp-2 mt-1">{item.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-blue-300 text-sm">{item.location || item.category || 'General'}</span>
          <span className="text-white font-semibold">{item.price ? `$${item.price}` : 'Free'}</span>
        </div>
        <button
          onClick={() => onBook(item)}
          className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
        >
          Book {type}
        </button>
      </div>
    </div>
  );
}

export default function CardGrid({ events, services, onBook }) {
  return (
    <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {events?.map((e) => (
        <Card key={`e-${e.id}`} item={e} type="event" onBook={(item) => onBook('event', item)} />
      ))}
      {services?.map((s) => (
        <Card key={`s-${s.id}`} item={s} type="service" onBook={(item) => onBook('service', item)} />
      ))}
    </div>
  );
}
