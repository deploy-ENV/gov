import React from 'react';
import { FileText, BadgeCheck, AlertTriangle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

// Dummy Data
const PROGRESS_UPDATES = [
  {
    contractor: 'AlphaBuild Co.',
    timestamp: '2024-07-19 14:30',
    description: 'Foundation work is complete. Starting on structural columns.',
    status: 'In Progress',
    validated: true,
    media: [
      { type: 'image', url: '/images/foundation1.jpg' },
      { type: 'video', url: '/videos/foundation-progress.mp4' },
    ],
  },
];

const SUPERVISOR_VALIDATIONS = [
  {
    name: 'Engr. Josephine Cruz',
    date: '2024-07-18',
    status: 'Approved',
    note: 'Progress matches submitted reports. Continue as scheduled.',
  },
];

const MATERIALS = [
  { name: 'Cement', delivered: 100, used: 80 },
  { name: 'Steel Bars', delivered: 200, used: 150 },
];

const FUND_DATA = {
  allocated: 1000000,
  used: 650000,
};

const ISSUE_ALERTS = [
  {
    title: 'Delayed Material Delivery',
    description: 'Steel beams scheduled for July 15 have not yet arrived.',
    severity: 'High',
    reportedBy: 'Project Manager',
    date: '2024-07-17',
  },
];

const LAST_UPDATED = '2024-07-20 10:00';

// Components

function ProgressUpdateCard({ update }) {
  return (
    <motion.div layout className="bg-slate-800/40 backdrop-blur-sm rounded-2xl shadow-md p-5 mb-4 border border-slate-700/50 text-white">
      <div className="flex items-center gap-3 mb-2">
        <span className="font-semibold text-cyan-400">{update.contractor}</span>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Clock size={14} /> {update.timestamp}
        </span>
        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
          update.status === 'In Progress'
            ? 'bg-cyan-400/20 text-cyan-300'
            : update.status === 'Submitted'
            ? 'bg-emerald-400/20 text-emerald-300'
            : 'bg-yellow-400/20 text-yellow-300'
        }`}>
          {update.status}
        </span>
        {update.validated && (
          <span className="ml-2 inline-flex items-center gap-1 text-emerald-400 text-xs font-semibold">
            <BadgeCheck size={14} /> Validated by Supervisor
          </span>
        )}
      </div>
      <div className="text-sm text-slate-300 mb-3">{update.description}</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {update.media.map((m, i) => (
          <div key={i} className="rounded-lg overflow-hidden border border-slate-700 bg-slate-700/50 flex items-center justify-center aspect-video">
            {m.type === 'image' ? (
              <img src={m.url} alt="media" className="object-cover w-full h-full" />
            ) : (
              <video src={m.url} controls className="w-full h-full bg-black" />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MaterialTable({ materials }) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-5 text-white border border-slate-700/50 mb-6">
      <h2 className="text-lg font-semibold text-cyan-400 mb-4">Material Usage</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-cyan-400">
            <th className="py-2 px-3 text-left font-semibold">Material</th>
            <th className="py-2 px-3 text-left font-semibold">Delivered</th>
            <th className="py-2 px-3 text-left font-semibold">Used</th>
            <th className="py-2 px-3 text-left font-semibold">Balance</th>
            <th className="py-2 px-3 text-left font-semibold">Usage</th>
          </tr>
        </thead>
        <tbody>
          {materials.map(mat => {
            const balance = mat.delivered - mat.used;
            const percent = Math.round((mat.used / mat.delivered) * 100);
            return (
              <tr key={mat.name} className="border-b border-slate-700 last:border-0">
                <td className="py-2 px-3 font-medium text-cyan-400">{mat.name}</td>
                <td className="py-2 px-3">{mat.delivered}</td>
                <td className="py-2 px-3">{mat.used}</td>
                <td className="py-2 px-3">{balance}</td>
                <td className="py-2 px-3">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-emerald-400 h-full rounded-full transition-all" style={{ width: `${percent}%` }} />
                  </div>
                  <span className="text-xs text-slate-400 ml-2">{percent}%</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function SupervisorValidationCard({ validation }) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm p-4 rounded-xl border border-slate-700/50 text-white mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-cyan-400 font-semibold">{validation.name}</div>
        <div className="text-xs text-slate-400">{validation.date}</div>
      </div>
      <div className="text-sm text-slate-300">{validation.note}</div>
      <div className="text-xs mt-2 px-2 py-1 bg-emerald-400/20 text-emerald-300 rounded-full inline-block font-semibold">
        {validation.status}
      </div>
    </div>
  );
}

function IssueAlertCard({ issue }) {
  return (
    <div className="bg-red-800/30 border border-red-500/20 rounded-xl p-4 text-white mb-3">
      <div className="flex items-center gap-2 mb-2 text-red-400 font-semibold">
        <AlertTriangle size={16} /> {issue.title}
      </div>
      <div className="text-sm text-red-100 mb-1">{issue.description}</div>
      <div className="text-xs text-red-300">
        Reported by {issue.reportedBy} on {issue.date}
      </div>
    </div>
  );
}

function FundSummary({ data }) {
  const usedPercent = Math.round((data.used / data.allocated) * 100);
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm p-5 rounded-xl border border-slate-700/50 text-white mb-6">
      <h2 className="text-lg font-semibold text-cyan-400 mb-3">Fund Utilization</h2>
      <div className="mb-2 text-sm text-slate-300">Allocated: ₱{data.allocated.toLocaleString()}</div>
      <div className="mb-2 text-sm text-slate-300">Used: ₱{data.used.toLocaleString()}</div>
      <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${usedPercent}%` }} />
      </div>
      <div className="text-xs text-slate-400 mt-1">{usedPercent}% of funds used</div>
    </div>
  );
}

// Main Component

export default function ProjectMonitoring() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white">
      <div className="text-xs text-slate-400 mb-6">Last Updated: {LAST_UPDATED}</div>

      <h1 className="text-xl font-bold text-cyan-400 mb-4">Progress Updates</h1>
      {PROGRESS_UPDATES.map((update, i) => (
        <ProgressUpdateCard key={i} update={update} />
      ))}

      <MaterialTable materials={MATERIALS} />
      <FundSummary data={FUND_DATA} />

      <h2 className="text-lg font-semibold text-cyan-400 mt-8 mb-3">Supervisor Validations</h2>
      {SUPERVISOR_VALIDATIONS.map((val, i) => (
        <SupervisorValidationCard key={i} validation={val} />
      ))}

      <h2 className="text-lg font-semibold text-cyan-400 mt-8 mb-3">Issue Alerts</h2>
      {ISSUE_ALERTS.map((issue, i) => (
        <IssueAlertCard key={i} issue={issue} />
      ))}
    </div>
  );
}
