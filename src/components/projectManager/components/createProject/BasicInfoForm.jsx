import React from 'react';

const DEPARTMENTS = ['Public Works', 'Education', 'Health', 'Transport'];
const ZONES = ['North', 'South', 'East', 'West', 'Central'];

export default function BasicInfoForm({ data, onChange, errors }) {
  const handleLocationChange = (field, value) => {
    onChange('location', { ...data.location, [field]: value });
  };

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

      {/* Department (disabled) */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">Department</label>
        <input
          className="w-full p-3 rounded-lg bg-slate-700/30 border border-slate-600 text-slate-400 cursor-not-allowed"
          value={DEPARTMENTS[0]}
          disabled
        />
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

      {/* Location Section */}
      <div className="md:col-span-2">
        <h2 className="text-xl font-bold text-cyan-400 mb-4">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Street */}
          <div className="md:col-span-2">
            <label className="block font-semibold text-slate-300 mb-1">
              Street <span className="text-red-400">*</span>
            </label>
            <input
              className={`w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400/50 ${
                errors.street ? 'border-red-500' : ''
              }`}
              placeholder="Enter street address"
              value={data.location?.street || ''}
              onChange={(e) => handleLocationChange('street', e.target.value)}
              required
            />
            {errors.street && <span className="text-red-400 text-xs">{errors.street}</span>}
          </div>

          {/* City */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              City <span className="text-red-400">*</span>
            </label>
            <input
              className={`w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400/50 ${
                errors.city ? 'border-red-500' : ''
              }`}
              placeholder="Enter city"
              value={data.location?.city || ''}
              onChange={(e) => handleLocationChange('city', e.target.value)}
              required
            />
            {errors.city && <span className="text-red-400 text-xs">{errors.city}</span>}
          </div>

          {/* State */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              State <span className="text-red-400">*</span>
            </label>
            <input
              className={`w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400/50 ${
                errors.state ? 'border-red-500' : ''
              }`}
              placeholder="Enter state"
              value={data.location?.state || ''}
              onChange={(e) => handleLocationChange('state', e.target.value)}
              required
            />
            {errors.state && <span className="text-red-400 text-xs">{errors.state}</span>}
          </div>

          {/* Zip Code */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Zip Code <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className={`w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400/50 ${
                errors.zip ? 'border-red-500' : ''
              }`}
              placeholder="Enter zip code"
              value={data.location?.zipCode || ''}
              onChange={(e) => handleLocationChange('zipCode', e.target.value)}
              required
            />
            {errors.zip && <span className="text-red-400 text-xs">{errors.zipCode}</span>}
          </div>

          {/* Country */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Country <span className="text-red-400">*</span>
            </label>
            <input
              className={`w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400/50 ${
                errors.country ? 'border-red-500' : ''
              }`}
              placeholder="Enter country"
              value={data.location?.country || ''}
              onChange={(e) => handleLocationChange('country', e.target.value)}
              required
            />
            {errors.country && <span className="text-red-400 text-xs">{errors.country}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
