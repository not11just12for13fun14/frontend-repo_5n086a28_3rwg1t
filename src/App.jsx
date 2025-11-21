import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import FeaturedCarousel from './components/FeaturedCarousel'
import CardGrid from './components/CardGrid'
import BookingModal from './components/BookingModal'
import SectionHeading from './components/SectionHeading'
import CreativeMasonry from './components/CreativeMasonry'
import SplitShowcase from './components/SplitShowcase'

const apiBase = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [query, setQuery] = useState('')
  const [events, setEvents] = useState([])
  const [services, setServices] = useState([])
  const [featured, setFeatured] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [selectedType, setSelectedType] = useState('event')
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function loadData(q=''){
    setLoading(true)
    setError(null)
    try {
      const [er, sr, fr] = await Promise.all([
        fetch(`${apiBase}/api/events?q=${encodeURIComponent(q)}`),
        fetch(`${apiBase}/api/services?q=${encodeURIComponent(q)}`),
        fetch(`${apiBase}/api/events?featured=true&limit=8`)
      ])
      if(!er.ok || !sr.ok || !fr.ok) throw new Error('Failed to load content')
      const [e, s, f] = await Promise.all([er.json(), sr.json(), fr.json()])
      setEvents(e || [])
      setServices(s || [])
      setFeatured(f || [])
    } catch (e) {
      console.error(e)
      setError('Could not load content. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ loadData() }, [])
  useEffect(()=>{ const id = setTimeout(()=>loadData(query), 350); return ()=>clearTimeout(id) }, [query])

  const onBook = (type, item) => {
    setSelected(item)
    setSelectedType(type)
    setModalOpen(true)
  }

  const handleConfirm = async ({ name, email, datetime, notes }) => {
    try {
      const res = await fetch(`${apiBase}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item_type: selectedType,
          item_id: selected.id,
          customer_name: name,
          customer_email: email,
          scheduled_for: datetime || null,
          notes: notes || null,
        })
      })
      if(!res.ok){
        const t = await res.json().catch(()=>({detail:'Error'}))
        throw new Error(t.detail || 'Booking failed')
      }
      setToast({ type:'success', message: 'Booking confirmed!' })
    } catch (e) {
      setToast({ type:'error', message: e.message })
    } finally {
      setModalOpen(false)
      setSelected(null)
    }
  }

  const topEvents = useMemo(()=>events.slice(0,6), [events])
  const topServices = useMemo(()=>services.slice(0,6), [services])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-24">
      <Header onSearch={setQuery} />

      <main className="relative space-y-12 pt-6">
        {/* Decorative backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_10%,rgba(59,130,246,0.08),transparent),radial-gradient(1000px_500px_at_90%_40%,rgba(16,185,129,0.07),transparent)]" />
        </div>

        {/* 1) Featured section */}
        <SectionHeading title="Featured Events" subtitle="Hand-picked highlights worth your time" />
        <FeaturedCarousel />

        {/* 2) Creative mixed mosaic of featured + events + services */}
        <SectionHeading title="Discover More" subtitle="A playful mix of events and services" accent="from-fuchsia-500 to-rose-400" />
        <CreativeMasonry featured={featured} events={topEvents} services={topServices} onBook={onBook} />

        {/* 3) Split showcase: upcoming events vs popular services */}
        <SectionHeading title="Plan Your Next Move" subtitle="Compare options side-by-side" accent="from-emerald-500 to-cyan-400" />
        <SplitShowcase
          left={(
            <div>
              <h3 className="text-white font-semibold text-lg">Upcoming events</h3>
              <div className="mt-4 space-y-3">
                {topEvents.slice(0,4).map(e => (
                  <div key={`le-${e.id}`} className="group p-3 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-blue-500/40 transition">
                    <div className="flex items-center gap-3">
                      {e.image_url ? (
                        <img src={e.image_url} alt={e.title} className="h-14 w-20 object-cover rounded-lg" />
                      ) : (
                        <div className="h-14 w-20 rounded-lg bg-slate-700" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium truncate">{e.title}</div>
                        <div className="text-slate-300/90 text-xs truncate">{e.location} • {e.date || 'TBA'}</div>
                      </div>
                      <button onClick={()=>onBook('event', e)} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs">Book</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          right={(
            <div>
              <h3 className="text-white font-semibold text-lg">Popular services</h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {topServices.slice(0,4).map(s => (
                  <div key={`rs-${s.id}`} className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/40 transition">
                    <div className="aspect-[16/9] w-full overflow-hidden rounded-lg mb-3">
                      {s.image_url ? (
                        <img src={s.image_url} alt={s.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-slate-700" />
                      )}
                    </div>
                    <div className="text-white font-medium line-clamp-1">{s.name}</div>
                    <div className="text-slate-300/90 text-xs line-clamp-2 mt-0.5">{s.description}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-emerald-300 text-sm">{s.category}</span>
                      <span className="text-white font-semibold text-sm">{s.price ? `$${s.price}` : 'Free'}</span>
                    </div>
                    <button onClick={()=>onBook('service', s)} className="mt-3 w-full px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm">Book service</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        />

        <SectionHeading title="All listings" subtitle="Browse everything in one place" accent="from-indigo-500 to-blue-400" />
        {loading && (
          <div className="max-w-6xl mx-auto px-4 text-slate-300">Loading…</div>
        )}
        {error && (
          <div className="max-w-6xl mx-auto px-4 text-rose-300">{error}</div>
        )}
        {!loading && !error && (
          <CardGrid events={events} services={services} onBook={onBook} />
        )}
      </main>

      <BookingModal open={modalOpen} onClose={() => setModalOpen(false)} item={selected} type={selectedType} onConfirm={handleConfirm} />

      {toast && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg border ${toast.type==='success'?'bg-emerald-600/90 border-emerald-400 text-white':'bg-rose-600/90 border-rose-400 text-white'}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default App
