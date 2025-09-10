import React from 'react';
import { UploadCloud } from 'lucide-react';

export default function DocumentUploadForm({ data, onChange, errors }) {
  const handleFile = (field, file) => {
    onChange(field, file);
  };

  const fileInputClass =
    'flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold cursor-pointer hover:from-emerald-500 hover:to-cyan-500 transition';

  const labelClass = 'block font-semibold text-slate-300 mb-1';
  const fileNameClass = 'text-slate-300 text-sm';

  return (
    <div className="space-y-6 text-white">
      {/* Legal */}
      <div>
        <label className={labelClass}>
          Legal Documents <span className="text-red-400">*</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            className="hidden"
            id="legal-upload"
            onChange={(e) => handleFile('legal', e.target.files[0])}
            accept=".pdf,.doc,.docx"
          />
          <label htmlFor="legal-upload" className={fileInputClass}>
            <UploadCloud size={18} /> Upload Legal
          </label>
          {data.legal && <span className={fileNameClass}>{data.legal.name}</span>}
        </div>
        {errors.legal && <span className="text-red-400 text-xs">{errors.legal}</span>}
      </div>

      {/* Blueprints */}
      <div>
        <label className={labelClass}>
          Blueprints <span className="text-red-400">*</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            className="hidden"
            id="blueprints-upload"
            onChange={(e) => handleFile('blueprints', e.target.files[0])}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <label htmlFor="blueprints-upload" className={fileInputClass}>
            <UploadCloud size={18} /> Upload Blueprints
          </label>
          {data.blueprints && <span className={fileNameClass}>{data.blueprints.name}</span>}
        </div>
        {errors.blueprints && <span className="text-red-400 text-xs">{errors.blueprints}</span>}
      </div>

      {/* BoQ */}
      <div>
        <label className={labelClass}>
          BoQ (Bill of Quantities) <span className="text-red-400">*</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            className="hidden"
            id="boq-upload"
            onChange={(e) => handleFile('boq', e.target.files[0])}
            accept=".pdf,.xlsx"
          />
          <label htmlFor="boq-upload" className={fileInputClass}>
            <UploadCloud size={18} /> Upload BoQ
          </label>
          {data.boq && <span className={fileNameClass}>{data.boq.name}</span>}
        </div>
        {errors.boq && <span className="text-red-400 text-xs">{errors.boq}</span>}
      </div>

      {/* Safety */}
      <div>
        <label className={labelClass}>
          Safety Documents <span className="text-red-400">*</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            className="hidden"
            id="safety-upload"
            onChange={(e) => handleFile('safety', e.target.files[0])}
            accept=".pdf,.doc,.docx"
          />
          <label htmlFor="safety-upload" className={fileInputClass}>
            <UploadCloud size={18} /> Upload Safety
          </label>
          {data.safety && <span className={fileNameClass}>{data.safety.name}</span>}
        </div>
        {errors.safety && <span className="text-red-400 text-xs">{errors.safety}</span>}
      </div>
    </div>
  );
}
