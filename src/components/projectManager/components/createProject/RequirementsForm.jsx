import React from 'react';
import { Plus } from 'lucide-react';

const SKILLS = ['Civil Engineering', 'Electrical', 'Plumbing', 'Masonry', 'Surveying'];
const LICENSES = ['Class A', 'Class B', 'Class C', 'ISO 9001', 'Safety'];

export default function RequirementsForm({ data, onChange, errors }) {
  const toggleMulti = (field, value) => {
    const arr = data[field] || [];
    if (arr.includes(value)) {
      onChange(field, arr.filter(v => v !== value));
    } else {
      onChange(field, [...arr, value]);
    }
  };

  const addMaterial = () =>
    onChange('materials', [...(data.materials || []), { name: '', qty: '' }]);

  const updateMaterial = (i, field, value) => {
    const arr = [...(data.materials || [])];
    arr[i][field] = value;
    onChange('materials', arr);
  };

  const removeMaterial = (i) => {
    const arr = [...(data.materials || [])];
    arr.splice(i, 1);
    onChange('materials', arr);
  };

  const tagBase =
    'px-3 py-1 rounded-full text-sm font-medium transition border';
  const activeTag =
    'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 border-transparent';
  const inactiveTag =
    'bg-slate-700/40 text-slate-300 border border-slate-600';

  const inputBase =
    'p-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-400/50';

  return (
    <div className="space-y-6 text-white">
      {/* Skills */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">
          Skills Required <span className="text-red-400">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(skill => (
            <button
              type="button"
              key={skill}
              className={`${tagBase} ${data.skills?.includes(skill) ? activeTag : inactiveTag}`}
              onClick={() => toggleMulti('skills', skill)}
            >
              {skill}
            </button>
          ))}
        </div>
        {errors.skills && <span className="text-red-400 text-xs">{errors.skills}</span>}
      </div>

      {/* Licenses */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">
          License Types Required <span className="text-red-400">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {LICENSES.map(lic => (
            <button
              type="button"
              key={lic}
              className={`${tagBase} ${data.licenses?.includes(lic) ? activeTag : inactiveTag}`}
              onClick={() => toggleMulti('licenses', lic)}
            >
              {lic}
            </button>
          ))}
        </div>
        {errors.licenses && <span className="text-red-400 text-xs">{errors.licenses}</span>}
      </div>

      {/* Materials */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">
          Materials Needed <span className="text-red-400">*</span>
        </label>
        <div className="space-y-2">
          {(data.materials || []).map((mat, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className={`${inputBase} flex-1`}
                placeholder="Material Name"
                value={mat.name}
                onChange={e => updateMaterial(i, 'name', e.target.value)}
                required
              />
              <input
                type="number"
                className={`${inputBase} w-24`}
                placeholder="Qty"
                value={mat.qty}
                onChange={e => updateMaterial(i, 'qty', e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => removeMaterial(i)}
                className="text-red-400 font-bold px-2 text-lg hover:text-red-300"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addMaterial}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold hover:from-emerald-500 hover:to-cyan-500 transition mt-2"
          >
            <Plus size={16} /> Add Material
          </button>
        </div>
        {errors.materials && <span className="text-red-400 text-xs">{errors.materials}</span>}
      </div>
    </div>
  );
}
