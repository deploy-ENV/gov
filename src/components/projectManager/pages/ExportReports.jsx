import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, Calendar, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DUMMY_PROJECTS = [

];

const REPORT_TYPES = [
  // {
  //   key: 'progress',
  //   title: 'Project Progress Report',
  //   summary: 'Includes project title, zone, status, tasks completed, live updates, supervisor notes, and issues.',
  //   options: ['pdf', 'csv'],
  //   badge: 'Last exported',
  // },
  // {
  //   key: 'fund',
  //   title: 'Fund Usage Report',
  //   summary: 'Shows total budget, requested vs released funds, fund requests, remaining balance, and a chart preview.',
  //   options: ['pdf', 'xlsx'],
  //   badge: 'Last exported',
  // },
  // {
  //   key: 'docs',
  //   title: 'Document Summary Report',
  //   summary: 'Lists all uploaded documents, uploader, upload date, and type.',
  //   options: ['pdf'],
  //   badge: 'Last exported',
  // },
];

const DUMMY_EXPORTS = [
  
];

function ProjectSelector({ projects, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-white mb-1">Select Project</label>
      <select
        className="w-full p-3 rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 focus:ring-2 focus:ring-emerald-400/50 text-white"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option value="" className="bg-slate-800">-- Select Project --</option>
        {projects.map(p => (
          <option key={p.id} value={p.id} className="bg-slate-800">{p.name}</option>
        ))}
      </select>
    </div>
  );
}

function DateRangeFilter({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-white mb-1 flex items-center gap-2"><Calendar size={16} className="text-emerald-400" /> Date Range</label>
      <div className="flex gap-2">
        <input
          type="date"
          className="p-2 rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 focus:ring-2 focus:ring-emerald-400/50 text-white"
          value={value.start}
          onChange={e => onChange({ ...value, start: e.target.value })}
        />
        <span className="text-slate-400">to</span>
        <input
          type="date"
          className="p-2 rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 focus:ring-2 focus:ring-emerald-400/50 text-white"
          value={value.end}
          onChange={e => onChange({ ...value, end: e.target.value })}
        />
      </div>
    </div>
  );
}

function ReportCard({ type, project, lastExport, onExport, includeAttachments }) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl  p-6 flex flex-col gap-4 flex-1 min-w-[260px]">
      <div className="flex items-center gap-2 mb-2">
        {type.key === 'progress' && <FileText className="text-emerald-400" size={28} />}
        {type.key === 'fund' && <FileSpreadsheet className="text-emerald-400" size={28} />}
        {type.key === 'docs' && <FileText className="text-slate-300" size={28} />}
        <div className="font-bold text-white text-lg">{type.title}</div>
      </div>
      <div className="text-sm text-slate-400 mb-2">{type.summary}</div>
      {type.key === 'fund' && (
        <div className="w-full h-2 bg-slate-700/50 rounded-full mb-2">
          <div className="h-2 bg-emerald-400 rounded-full" style={{ width: '60%' }} />
        </div>
      )}
      <div className="flex gap-2 mt-2">
        {type.options.includes('pdf') && (
          <button
            className="flex items-center gap-1 px-4 py-2 rounded bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold shadow-card hover:scale-105 transition text-xs"
            onClick={() => onExport(type, 'PDF')}
          >
            <Download size={16} /> Export as PDF
          </button>
        )}
        {type.options.includes('csv') && (
          <button
            className="flex items-center gap-1 px-4 py-2 rounded bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 font-semibold shadow-card hover:scale-105 transition text-xs"
            onClick={() => onExport(type, 'CSV')}
          >
            <Download size={16} /> Export as CSV
          </button>
        )}
        {type.options.includes('xlsx') && (
          <button
            className="flex items-center gap-1 px-4 py-2 rounded bg-gradient-to-r from-green-400 to-emerald-400 text-slate-900 font-semibold shadow-card hover:scale-105 transition text-xs"
            onClick={() => onExport(type, 'Excel')}
          >
            <Download size={16} /> Export as Excel
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-semibold">{type.badge}: {lastExport || 'Never'}</span>
        {includeAttachments && <span className="inline-block px-2 py-0.5 rounded-full bg-slate-300/20 text-slate-300 text-xs font-semibold">With Attachments</span>}
      </div>
    </div>
  );
}

function ExportReportsPanel() {
  const [selectedProject, setSelectedProject] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [includeAttachments, setIncludeAttachments] = useState(false);
  const [exportLog, setExportLog] = useState(DUMMY_EXPORTS);
  const [toast, setToast] = useState(null);

  const handleExport = (type, format) => {
    if (!selectedProject) {
      setToast('Please select a project first.');
      setTimeout(() => setToast(null), 2000);
      return;
    }
    setExportLog(log => [
      { id: Math.random().toString(36).slice(2), type: type.title, date: new Date().toISOString().slice(0, 10), format, project: DUMMY_PROJECTS.find(p => p.id == selectedProject)?.name },
      ...log.slice(0, 4),
    ]);
    setToast('Report exported successfully');
    setTimeout(() => setToast(null), 2000);
  };

  const lastExport = (key) => {
    const found = exportLog.find(e => e.type.toLowerCase().includes(key));

    return found ? found.date : null;
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-0 m-0">
      <div className="w-full h-full flex flex-col gap-8 p-6">
        {/* Section 1: Project Selection & Date Range */}
        <div className="flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-1">
            <ProjectSelector projects={DUMMY_PROJECTS} value={selectedProject} onChange={setSelectedProject} />
          </div>
          <div className="flex-1">
            <DateRangeFilter value={dateRange} onChange={setDateRange} />
          </div>
          <div className="flex items-center gap-2 mb-2">
            <input type="checkbox" id="include-attachments" checked={includeAttachments} onChange={e => setIncludeAttachments(e.target.checked)} className="accent-emerald-400 w-4 h-4" />
            <label htmlFor="include-attachments" className="text-sm text-white font-medium">Include Attachments</label>
          </div>
        </div>
        {/* Section 2: Report Types */}
        <div className="flex flex-col md:flex-row gap-6">
          {REPORT_TYPES.map(type => (
            <ReportCard
              key={type.key}
              type={type}
              project={DUMMY_PROJECTS.find(p => p.id == selectedProject)}
              lastExport={lastExport(type.key)}
              onExport={handleExport}
              includeAttachments={includeAttachments}
            />
          ))}
        </div>
        {/* Export Activity Log */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl  p-6 mt-4">
          <div className="font-bold text-white mb-2">Export Activity Log</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white bg-slate-700/50">
                <th className="py-2 px-3 text-left font-semibold">Date</th>
                <th className="py-2 px-3 text-left font-semibold">Project</th>
                <th className="py-2 px-3 text-left font-semibold">Report</th>
                <th className="py-2 px-3 text-left font-semibold">Format</th>
              </tr>
            </thead>
            <tbody>
              {exportLog.map(e => (
                <tr key={e.id} className="border-b last:border-0 border-slate-700/50">
                  <td className="py-2 px-3 text-slate-300">{e.date}</td>
                  <td className="py-2 px-3 text-slate-300">{e.project}</td>
                  <td className="py-2 px-3 text-slate-300">{e.type}</td>
                  <td className="py-2 px-3 text-slate-300">{e.format}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="fixed left-1/2 -translate-x-1/2 bottom-8 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 px-6 py-3 rounded-xl shadow-card flex items-center gap-2 z-50"
            >
              <CheckCircle className="text-white" size={24} />
              <span>{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ExportReports() {
  return <ExportReportsPanel />;
}