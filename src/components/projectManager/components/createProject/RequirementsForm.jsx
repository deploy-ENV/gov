import React from 'react';
import { Plus } from 'lucide-react';

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

  // --- Materials ---
  const addMaterial = () => {
    onChange('requiredMaterials', [...(data.requiredMaterials || []), '']);
    onChange('estimatedQuantities', [...(data.estimatedQuantities || []), '']);
  };

  const updateMaterial = (i, field, value) => {
    if (field === 'name') {
      const arr = [...(data.requiredMaterials || [])];
      arr[i] = value;
      onChange('requiredMaterials', arr);
    } else if (field === 'qty') {
      const arr = [...(data.estimatedQuantities || [])];
      arr[i] = value;
      onChange('estimatedQuantities', arr);
    }
  };

  const removeMaterial = (i) => {
    const names = [...(data.requiredMaterials || [])];
    const qtys = [...(data.estimatedQuantities || [])];
    names.splice(i, 1);
    qtys.splice(i, 1);
    onChange('requiredMaterials', names);
    onChange('estimatedQuantities', qtys);
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
      {/* Contractor Requirements */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">
          Contractor Requirements <span className="text-red-400">*</span>
        </label>
        <textarea
          className={`${inputBase} w-full h-24 resize-y`}
          placeholder="Describe the required skills or contractor requirements..."
          value={data.contractorRequirements || ''}
          onChange={e => onChange('contractorRequirements', e.target.value)}
          required
        />
        {errors.contractorRequirements && (
          <span className="text-red-400 text-xs">{errors.contractorRequirements}</span>
        )}
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
          {(data.requiredMaterials || []).map((mat, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className={`${inputBase} flex-1`}
                placeholder="Material Name"
                value={mat}
                onChange={e => updateMaterial(i, 'name', e.target.value)}
                required
              />
              <input
                type="text" // ✅ text instead of number to allow "5000 tons"
                className={`${inputBase} w-32`}
                placeholder="Qty (e.g. 5000 tons)"
                value={data.estimatedQuantities?.[i] || ''}
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
        {(errors.requiredMaterials || errors.estimatedQuantities) && (
          <span className="text-red-400 text-xs">
            {errors.requiredMaterials || errors.estimatedQuantities}
          </span>
        )}
      </div>
    </div>
  );
}
