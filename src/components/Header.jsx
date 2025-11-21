import React from 'react';

function Header({ onSearch }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-slate-900/50 bg-slate-900/70 border-b border-blue-500/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
          <span className="text-white font-semibold text-lg">Event & Services</span>
        </div>
        <div className="w-full max-w-md ml-6">
          <input
            type="text"
            placeholder="Search events or services..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
