import React, { useState } from 'react';

export default function BookingModal({ open, onClose, item, type, onConfirm }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [datetime, setDatetime] = useState('');
  const [notes, setNotes] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700">
        <div className="p-5 border-b border-slate-800">
          <h3 className="text-white text-lg font-semibold">Book {type}</h3>
          <p className="text-slate-300 text-sm mt-1">{item?.title || item?.name}</p>
        </div>
        <div className="p-5 space-y-3">
          <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400" />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your email" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400" />
          <input type="datetime-local" value={datetime} onChange={(e)=>setDatetime(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400" />
          <textarea value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Notes (optional)" className="w-full px-3 py-2 rounded bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 min-h-[80px]" />
        </div>
        <div className="p-5 flex items-center justify-end gap-3 border-t border-slate-800">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">Cancel</button>
          <button onClick={() => onConfirm({ name, email, datetime, notes })} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium">Confirm Booking</button>
        </div>
      </div>
    </div>
  );
}
