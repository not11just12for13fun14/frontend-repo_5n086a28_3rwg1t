import React from 'react'

export default function SplitShowcase({ left, right }){
  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-blue-600/10 to-slate-900">
          <div className="absolute -inset-20 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#60a5fa,transparent_40%),radial-gradient(circle_at_80%_80%,#22d3ee,transparent_40%)]" />
          <div className="relative p-6">
            {left}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-emerald-600/10 to-slate-900">
          <div className="absolute -inset-20 opacity-20 bg-[radial-gradient(circle_at_20%_80%,#34d399,transparent_40%),radial-gradient(circle_at_80%_20%,#60a5fa,transparent_40%)]" />
          <div className="relative p-6">
            {right}
          </div>
        </div>
      </div>
    </section>
  )
}
