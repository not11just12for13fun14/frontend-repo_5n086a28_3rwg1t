import React, { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import FeaturedCarousel from './components/FeaturedCarousel'
import CardGrid from './components/CardGrid'
import BookingModal from './components/BookingModal'

const apiBase = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [query, setQuery] = useState('')
  const [events, setEvents] = useState([])
  const [services, setServices] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [selectedType, setSelectedType] = useState('event')
  const [toast, setToast] = useState(null)

  async function loadData(q=''){
    try {
      const [er, sr] = await Promise.all([
        fetch(`${apiBase}/api/events?q=${encodeURIComponent(q)}`),
        fetch(`${apiBase}/api/services?q=${encodeURIComponent(q)}`)
      ])
      const [e, s] = await Promise.all([er.json(), sr.json()])
      setEvents(e || [])
      setServices(s || [])
    } catch (e) {
      console.error(e)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pb-20">
      <Header onSearch={setQuery} />
      <div className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.06),transparent_50%)]" />
      </div>

      <main className="relative space-y-10 pt-4">
        <FeaturedCarousel />
        <section className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-2xl font-semibold">Browse</h2>
          </div>
        </section>
        <CardGrid events={events} services={services} onBook={onBook} />
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
