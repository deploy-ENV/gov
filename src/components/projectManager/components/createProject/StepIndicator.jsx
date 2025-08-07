import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function StepIndicator({ step, setStep }) {
  const steps = [
    { label: 'Basic Info' },
    { label: 'Timeline & Budget' },
    { label: 'Contractor Requirements' },
    { label: 'Document Uploads' },
    { label: 'Other Settings' },
  ];

  return (
    <div className="flex items-center justify-between mb-10 overflow-x-auto px-2 scrollbar-hide w-full">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center min-w-[90px]">
            <button
              type="button"
              onClick={() => setStep(i)}
              className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold text-lg border-2 transition-all duration-200
                ${
                  i === step
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 border-transparent shadow-lg'
                    : 'bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600/50'
                }`}
              aria-label={s.label}
            >
              {i + 1}
            </button>
            <span
              className={`mt-2 text-xs font-medium text-center ${
                i === step ? 'text-emerald-400' : 'text-slate-400'
              }`}
            >
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <ChevronRight className="mx-3 text-slate-500 w-5 h-5" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
