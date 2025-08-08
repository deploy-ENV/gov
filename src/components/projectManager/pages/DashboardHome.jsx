import React from 'react';
import { Folder, Clock, CheckCircle, AlertTriangle, Info, Calendar, FileText, User, ChevronDown, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
  { label: 'Total Projects', value: 24, icon: <Folder size={28} />, color: 'bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 text-emerald-400' },
  { label: 'Ongoing Projects', value: 14, icon: <Clock size={28} />, color: 'bg-gradient-to-br from-yellow-400/20 to-amber-400/20 text-yellow-400' },
  { label: 'Completed Projects', value: 7, icon: <CheckCircle size={28} />, color: 'bg-gradient-to-br from-emerald-400/20 to-green-400/20 text-emerald-400' },
  { label: 'Delayed Projects', value: 3, icon: <AlertTriangle size={28} />, color: 'bg-gradient-to-br from-red-400/20 to-pink-400/20 text-red-400' },
];

const ALERTS = [
  
];

const DEADLINES = [

];

const PROGRESS = 65;

const ACTIVITY = [
  // { id: 1, user: 'Project Manager', action: 'Uploaded report', time: 'Today at 9:32 AM', icon: <FileText className="text-emerald-400" size={16} /> },
  // { id: 2, user: 'Supervisor', action: 'Validated site', time: 'Yesterday at 4:10 PM', icon: <User className="text-cyan-400" size={16} /> },
  // { id: 3, user: 'Contractor', action: 'Submitted fund request', time: 'Yesterday at 2:45 PM', icon: <Info className="text-emerald-400" size={16} /> },
];

function StatsCard({ stat }) {
  return (
    <motion.div whileHover={{ scale: 1.04 }} className={`flex flex-col items-center justify-center rounded-2xl p-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 cursor-pointer ${stat.color}`}> 
      <div className="mb-2">{stat.icon}</div>
      <div className="text-2xl font-bold text-white">{stat.value}</div>
      <div className="text-sm font-medium text-slate-400 text-center">{stat.label}</div>
    </motion.div>
  );
}

function AlertList({ alerts }) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="font-bold text-white text-lg">Recent Alerts</div>
        <button className="flex items-center gap-1 text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded hover:bg-slate-600/50 transition-colors"><ChevronDown size={14} /> All</button>
      </div>
      <div className="space-y-3">
        {alerts.map(alert => (
          <div key={alert.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300">
            {alert.icon}
            <div className="flex-1">
              <div className="font-semibold text-white text-sm">{alert.project}</div>
              <div className="text-xs text-slate-400">{alert.text}</div>
            </div>
            <div className="text-xs text-slate-500 whitespace-nowrap">{alert.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeadlineCard({ deadline }) {
  return (
    <div className="flex items-center gap-3 bg-slate-700/30 rounded-xl p-4 mb-3 hover:bg-slate-700/50 transition-all duration-300">
      {deadline.icon}
      <div className="flex-1">
        <div className="font-semibold text-white text-sm">{deadline.project}</div>
        <div className="text-xs text-slate-400">{deadline.type}</div>
      </div>
      <div className="text-xs text-slate-500">{deadline.daysLeft} days left</div>
      <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-400 text-xs font-semibold">{deadline.status}</span>
    </div>
  );
}

function ProgressChart({ percent }) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6 flex flex-col items-center">
      <div className="font-bold text-white mb-2">Project Completion Overview</div>
      <div className="relative w-24 h-24 flex items-center justify-center mb-2">
        <svg width="96" height="96" viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="none" stroke="#374151" strokeWidth="4" />
          <circle
            cx="18" cy="18" r="16"
            fill="none"
            stroke="#10B981"
            strokeWidth="4"
            strokeDasharray={`${percent} ${100 - percent}`}
            strokeDashoffset="0"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-bold text-white text-xl">{percent}%</span>
      </div>
    </div>
  );
}

function ActivityLog({ activity }) {
  return (
    <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-5">
      <div className="font-bold text-white text-lg mb-3">Recent Activity</div>
      <div className="space-y-3">
        {activity.map(a => (
          <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300">
            {a.icon}
            <div className="flex-1">
              <div className="font-semibold text-white text-sm">{a.user}</div>
              <div className="text-xs text-slate-400">{a.action}</div>
            </div>
            <div className="text-xs text-slate-500 whitespace-nowrap">{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardHome() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-0 m-0">
      <div className="w-full h-full flex flex-col gap-8 p-6">
        {/* Section 1: Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(stat => <StatsCard key={stat.label} stat={stat} />)}
        </div>
        {/* Section 2: Recent Alerts */}
        <AlertList alerts={ALERTS} />
        {/* Section 3: Upcoming Deadlines */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-5">
          <div className="font-bold text-white text-lg mb-3">Upcoming Deadlines</div>
          {DEADLINES.map(dl => <DeadlineCard key={dl.id} deadline={dl} />)}
        </div>
        {/* Section 4: Progress Chart */}
        <ProgressChart percent={PROGRESS} />
        {/* Section 5: Activity Log */}
        <ActivityLog activity={ACTIVITY} />
      </div>
    </div>
  );
}