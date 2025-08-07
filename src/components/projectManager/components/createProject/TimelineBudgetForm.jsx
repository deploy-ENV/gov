import React from 'react';

export default function TimelineBudgetForm({ data, onChange, errors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block font-semibold text-slate-300 mb-1">Expected Start Date *</label>
        <input
          type="date"
          className={` w-full p-3 rounded-lg text-white bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-accent/30 ${errors.startDate ? 'border-error' : ''}`}
          value={data.startDate}
          onChange={e => onChange('startDate', e.target.value)}
          required
        />
        {errors.startDate && <span className="text-error text-xs">{errors.startDate}</span>}
      </div>
      <div>
        <label className="blockfont-semibold text-slate-300 mb-1">Project Deadline *</label>
        <input
          type="date"
          className={` w-full p-3 rounded-lg text-white bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-accent/30 ${errors.deadline ? 'border-error' : ''}`}
          value={data.deadline}
          onChange={e => onChange('deadline', e.target.value)}
          required
        />
        {errors.deadline && <span className="text-error text-xs">{errors.deadline}</span>}
      </div>
      <div>
        <label className="block font-semibold text-slate-300 mb-1">Bid Submission Deadline *</label>
        <input
          type="date"
          className={` w-full p-3 rounded-lg text-white bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-accent/30 ${errors.bidDeadline ? 'border-error' : ''}`}
          value={data.bidDeadline}
          onChange={e => onChange('bidDeadline', e.target.value)}
          required
        />
        {errors.bidDeadline && <span className="text-error text-xs">{errors.bidDeadline}</span>}
      </div>
      <div>
        <label className="block font-semibold text-slate-300 mb-1">Total Budget (₹) *</label>
        <input
          type="number"
          className={` w-full p-3 rounded-lg text-white bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-accent/30 ${errors.budget ? 'border-error' : ''}`}
          placeholder="Enter total budget"
          value={data.budget}
          onChange={e => onChange('budget', e.target.value)}
          required
        />
        {errors.budget && <span className="text-error text-xs">{errors.budget}</span>}
      </div>
    </div>
  );
}
