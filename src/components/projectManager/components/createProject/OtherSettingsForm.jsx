import React from 'react';

export default function OtherSettingsForm({ data, onChange }) {
  return (
    <div className="space-y-6 text-white">
      {/* AI Match Toggle */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">
          Enable AI-based Contractor Match
        </label>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={data.aiMatch}
            onChange={(e) => onChange('aiMatch', e.target.checked)}
            className="accent-emerald-400 w-5 h-5 mr-2"
          />
          <span className="text-slate-400 text-sm">
            Let the system suggest best-fit contractors based on requirements
          </span>
        </div>
      </div>

      {/* Comments Field */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">Additional Comments</label>
        <textarea
          className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400/50"
          placeholder="Any special instructions or notes..."
          value={data.comments}
          onChange={(e) => onChange('comments', e.target.value)}
          rows={3}
        />
      </div>
    </div>
  );
}
