import React from 'react'

function Tile({ children, className = '' }){
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-slate-800/70 to-slate-900/60 ${className}`}>
      <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(to_bottom,black,rgba(0,0,0,0.5))]" />
      {children}
    </div>
  )
}

function EventTile({ item, onBook }){
  return (
    <Tile className="col-span-2 row-span-2">
      {item.image_url && (
        <img src={item.image_url} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
      )}
      <div className="relative p-5 flex h-full flex-col justify-between">
        <div>
          <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-500/20 text-blue-200 text-xs border border-blue-400/30">Featured event</span>
          <h3 className="mt-3 text-white text-lg font-semibold line-clamp-2 drop-shadow">{item.title}</h3>
          <p className="mt-1 text-slate-300/90 text-sm line-clamp-3">{item.description}</p>
        </div>
        <div className="flex items-end justify-between mt-4">
          <div className="text-slate-200 text-sm">
            <div>{item.date || 'TBA'}</div>
            <div className="text-blue-300/90">{item.location}</div>
          </div>
          <button onClick={()=>onBook('event', item)} className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/20">Book</button>
        </div>
      </div>
    </Tile>
  )
}

function MiniCard({ item, type, onBook }){
  return (
    <Tile className="col-span-1">
      {item.image_url && <img src={item.image_url} alt={item.title || item.name} className="h-28 w-full object-cover" />}
      <div className="p-4">
        <h4 className="text-white font-medium line-clamp-1">{item.title || item.name}</h4>
        <p className="text-slate-300/90 text-xs mt-1 line-clamp-2">{item.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-blue-300 text-xs">{item.location || item.category || 'General'}</span>
          <span className="text-white font-semibold text-sm">{item.price ? `$${item.price}` : 'Free'}</span>
        </div>
        <button onClick={()=>onBook(type, item)} className="mt-3 w-full px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-white text-sm border border-white/10">Book {type}</button>
      </div>
    </Tile>
  )
}

export default function CreativeMasonry({ featured = [], events = [], services = [], onBook }){
  // pick a hero from featured, and then mix of rest
  const hero = featured[0]
  const restFeatured = featured.slice(1)

  const eventCards = events.slice(0, 4)
  const serviceCards = services.slice(0, 4)

  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[1fr] gap-5">
        {hero && <EventTile item={hero} onBook={onBook} />}

        {restFeatured.map((f) => (
          <MiniCard key={`f-${f.id}`} item={f} type="event" onBook={onBook} />
        ))}

        {eventCards.map((e)=> (
          <MiniCard key={`e-${e.id}`} item={e} type="event" onBook={onBook} />
        ))}

        {serviceCards.map((s)=> (
          <MiniCard key={`s-${s.id}`} item={s} type="service" onBook={onBook} />
        ))}
      </div>
    </section>
  )
}
