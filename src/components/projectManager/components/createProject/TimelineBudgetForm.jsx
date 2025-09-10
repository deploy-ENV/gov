import React from 'react';
import { Plus } from 'lucide-react';

export default function TimelineBudgetForm({ data, onChange, errors }) {
  // Base input styling to match the project's design
  const inputBase =
    "w-full p-3 rounded-lg text-white bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-accent/30";

  // Helper functions for phases management
  const addPhase = () => {
    const newPhases = [
      ...(data.progressSteps || []),
      { title: "", description: "", dueDate: "", supervisorId: "", order: (data.progressSteps?.length || 0) + 1 }
    ];
    onChange("progressSteps", newPhases);
  };

  const updatePhase = (index, field, value) => {
    const newPhases = [...(data.progressSteps || [])];
    newPhases[index] = { ...newPhases[index], [field]: String(value) };
    onChange("progressSteps", newPhases);
  };

  const removePhase = (index) => {
    const newPhases = (data.progressSteps || []).filter((_, i) => i !== index);
    onChange("progressSteps", newPhases);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold text-slate-300 mb-1">
            Expected Start Date *
          </label>
          <input
            type="date"
            className={`${inputBase} ${errors.expectedStartDate ? "border-red-400" : ""}`}
            value={data.expectedStartDate || ""}
            onChange={(e) => onChange("expectedStartDate", String(e.target.value))}
            required
          />
          {errors.expectedStartDate && (
            <span className="text-red-400 text-xs">{errors.expectedStartDate}</span>
          )}
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">
            Project Deadline *
          </label>
          <input
            type="date"
            className={`${inputBase} ${errors.deadline ? "border-red-400" : ""}`}
            value={data.deadline || ""}
            onChange={(e) => onChange("deadline", String(e.target.value))}
            required
          />
          {errors.deadline && (
            <span className="text-red-400 text-xs">{errors.deadline}</span>
          )}
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">
            Bid Submission Deadline *
          </label>
          <input
            type="date"
            className={`${inputBase} ${errors.bidSubmissionDeadline ? "border-red-400" : ""}`}
            value={data.bidSubmissionDeadline || ""}
            onChange={(e) => onChange("bidSubmissionDeadline", String(e.target.value))}
            required
          />
          {errors.bidSubmissionDeadline && (
            <span className="text-red-400 text-xs">{errors.bidSubmissionDeadline}</span>
          )}
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">
            Total Budget (₹) *
          </label>
          <input
            type="number"
            className={`${inputBase} ${errors.totalBudget ? "border-red-400" : ""}`}
            placeholder="Enter total budget"
            value={data.totalBudget || ""}
            onChange={(e) => onChange("totalBudget", String(e.target.value))}
            required
          />
          {errors.totalBudget && (
            <span className="text-red-400 text-xs">{errors.totalBudget}</span>
          )}
        </div>
      </div>

      {/* Phases Section */}
      <div>
        <label className="block font-semibold text-slate-300 mb-1">
          Project Phases <span className="text-red-400">*</span>
        </label>
        <div className="space-y-2">
          {(data.progressSteps || []).map((phase, i) => (
            <div key={i} className="flex gap-2 items-center">
              <div className="grid grid-cols-4 gap-2 items-center w-full">
                <input
                  className={`${inputBase} flex-1 ${errors.phases ? "border-red-400" : ""}`}
                  placeholder="Phase Title"
                  value={phase.title}
                  onChange={(e) => updatePhase(i, "title", e.target.value)}
                  required
                />
                <input
                  className={`${inputBase} flex-1 ${errors.phases ? "border-red-400" : ""}`}
                  placeholder="Phase Description"
                  value={phase.description}
                  onChange={(e) => updatePhase(i, "description", e.target.value)}
                  required
                />
                <input
                  type="date"
                  className={`${inputBase} ${errors.phases ? "border-red-400" : ""}`}
                  value={phase.dueDate || ""}
                  onChange={(e) => updatePhase(i, "dueDate", e.target.value)}
                  required
                />
                <input
                  className={inputBase}
                  placeholder="Supervisor ID"
                  value={phase.supervisorId}
                  onChange={(e) => updatePhase(i, "supervisorId", e.target.value)}
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => removePhase(i)}
                  className="text-red-400 font-bold px-2 text-lg hover:text-red-300 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addPhase}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold hover:from-emerald-500 hover:to-cyan-500 transition mt-2"
          >
            <Plus size={16} /> Add Phase
          </button>
        </div>
        {errors.phases && (
          <span className="text-red-400 text-xs">{errors.phases}</span>
        )}
      </div>
    </div>
  );
}
