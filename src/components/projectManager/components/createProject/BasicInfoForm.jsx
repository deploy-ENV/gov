import React from 'react';

const DEPARTMENTS = [
  { id: "15131664", name: "Public Works" },
  { id: "15131665", name: "Education" },
  { id: "15131666", name: "Health" },
  { id: "15131667", name: "Transport" },
];

const ZONES = ["North Zone", "South Zone", "East Zone", "West Zone", "Central Zone"];

export default function BasicInfoForm({ data, onChange, errors }) {
  const handleAddressChange = (field, value) => {
    onChange("location", { ...data.location, [field]: value });
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
            errors.title ? "border-red-500" : ""
          }`}
          placeholder="Enter project title"
          value={data.title}
          onChange={(e) => onChange("title", e.target.value)}
          required
        />
        {errors.title && <span className="text-red-400 text-xs">{errors.title}</span>}
      </div>

      {/* Department */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">
          Department <span className="text-red-400">*</span>
        </label>
        <select
          className={`w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white ${
            errors.departmentId ? "border-red-500" : ""
          }`}
          value={data.departmentId}
          onChange={(e) => onChange("departmentId", e.target.value)}
          required
        >
          <option value="">Select Department</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.departmentId && (
          <span className="text-red-400 text-xs">{errors.departmentId}</span>
        )}
      </div>

      {/* Zone */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">
          Zone <span className="text-red-400">*</span>
        </label>
        <select
          className={`w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white ${
            errors.zone ? "border-red-500" : ""
          }`}
          value={data.zone}
          onChange={(e) => onChange("zone", e.target.value)}
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

      {/* Created By */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">Created By</label>
        <input
          className="w-full p-3 rounded-lg bg-slate-700/30 border border-slate-600 text-slate-400 cursor-not-allowed"
          value={data.createdByName || ""}
          disabled
        />
      </div>

      {/* Project Manager ID */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">
          Project Manager ID
        </label>
        <input
          className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400"
          placeholder="Enter project manager ID"
          value={data.projectManagerId || ""}
          onChange={(e) => onChange("projectManagerId", e.target.value)}
        />
      </div>

      {/* Thumbnail URL */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">Thumbnail URL</label>
        <input
          type="url"
          className="w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400"
          placeholder="https://example.com/project-thumbnail.png"
          value={data.thumbnailUrl || ""}
          onChange={(e) => onChange("thumbnailUrl", e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label className="block font-semibold text-slate-300 mb-1">
          Project Description <span className="text-red-400">*</span>
        </label>
        <textarea
          className={`w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400/50 ${
            errors.description ? "border-red-500" : ""
          }`}
          placeholder="Describe the project"
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          rows={3}
          required
        />
        {errors.description && (
          <span className="text-red-400 text-xs">{errors.description}</span>
        )}
      </div>

      {/* Address Section */}
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
                errors.street ? "border-red-500" : ""
              }`}
              placeholder="Enter street address"
              value={data.location?.street || ""}
              onChange={(e) => handleAddressChange("street", e.target.value)}
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
                errors.city ? "border-red-500" : ""
              }`}
              placeholder="Enter city"
              value={data.location?.city || ""}
              onChange={(e) => handleAddressChange("city", e.target.value)}
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
                errors.state ? "border-red-500" : ""
              }`}
              placeholder="Enter state"
              value={data.location?.state || ""}
              onChange={(e) => handleAddressChange("state", e.target.value)}
              required
            />
            {errors.state && <span className="text-red-400 text-xs">{errors.state}</span>}
          </div>

          {/* Zip */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Zip Code <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className={`w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400/50 ${
                errors.zip ? "border-red-500" : ""
              }`}
              placeholder="Enter zip code"
              value={data.location?.zip || ""}
              onChange={(e) => handleAddressChange("zip", e.target.value)}
              required
            />
            {errors.zip && <span className="text-red-400 text-xs">{errors.zip}</span>}
          </div>

          {/* Country */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Country <span className="text-red-400">*</span>
            </label>
            <input
              className={`w-full p-3 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400/50 ${
                errors.country ? "border-red-500" : ""
              }`}
              placeholder="Enter country"
              value={data.location?.country || ""}
              onChange={(e) => handleAddressChange("country", e.target.value)}
              required
            />
            {errors.country && <span className="text-red-400 text-xs">{errors.country}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
