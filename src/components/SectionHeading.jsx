import React from 'react'

export default function SectionHeading({ title, subtitle, accent = 'from-blue-500 to-cyan-400' }) {
  return (
    <div className="max-w-6xl mx-auto px-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-white text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-3">
          <span className={`inline-block h-6 w-6 rounded-md bg-gradient-to-br ${accent} shadow-lg shadow-blue-500/20`} />
          {title}
        </h2>
        {subtitle && (
          <p className="text-slate-300/80 text-sm md:text-base mt-1">{subtitle}</p>
        )}
      </div>
      <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300/80">
        <span className="h-1 w-1 rounded-full bg-slate-500" />
        <span className="uppercase tracking-widest">Explore</span>
      </div>
    </div>
  )
}
