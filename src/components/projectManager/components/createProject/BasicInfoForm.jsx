import React from 'react';
const DEPARTMENTS = ['Public Works', 'Education', 'Health', 'Transport'];
const ZONES = ['North', 'South', 'East', 'West', 'Central'];

export default function BasicInfoForm({ data, onChange, errors }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
      {/* Project Title */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">
          Project Title <span className="text-red-400">*</span>
        </label>
        <input
          className={`w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400/50 ${
            errors.title ? 'border-red-500' : ''
          }`}
          placeholder="Enter project title"
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
          required
        />
        {errors.title && <span className="text-red-400 text-xs">{errors.title}</span>}
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label className="block font-semibold text-slate-300 mb-1">
          Project Description <span className="text-red-400">*</span>
        </label>
        <textarea
          className={`w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400/50 ${
            errors.description ? 'border-red-500' : ''
          }`}
          placeholder="Describe the project"
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
          rows={3}
          required
        />
        {errors.description && <span className="text-red-400 text-xs">{errors.description}</span>}
      </div>

      {/* Department (disabled) */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">Department</label>
        <input
          className="w-full p-3 rounded-lg bg-slate-700/30 border border-slate-600 text-slate-400 cursor-not-allowed"
          value={DEPARTMENTS[0]}
          disabled
        />
      </div>

      {/* Zone */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">
          Zone / Region <span className="text-red-400">*</span>
        </label>
        <select
          className={`w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:ring-2 focus:ring-emerald-400/50 ${
            errors.zone ? 'border-red-500' : ''
          }`}
          value={data.zone}
          onChange={(e) => onChange('zone', e.target.value)}
          required
        >
          <option value="">Select Zone</option>
          {ZONES.map((z) => (
            <option key={z} value={z}>
              {z}
            </option>
          ))}
        </select>
        {errors.zone && <span className="text-red-400 text-xs">{errors.zone}</span>}
      </div>
    </div>
  );
}
