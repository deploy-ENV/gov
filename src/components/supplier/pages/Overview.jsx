import React, { useState } from "react";
import { ClipboardList, Truck, CreditCard, Home, Calendar, PackageCheck, ArrowRight, X, Package, Archive, Search, Bell, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Projects Active",
    value: 0,
    icon: Home,
    badge: "+1 today",
    color: "from-emerald-400 to-cyan-400",
  },
  {
    label: "Orders Received",
    value: 0,
    icon: ClipboardList,
    badge: "+2 today",
    color: "from-green-400 to-emerald-400",
  },
  {
    label: "Deliveries Completed",
    value: 0,
    icon: Truck,
    badge: "+1 today",
    color: "from-emerald-400 to-cyan-400",
  },
  {
    label: "Payments Received",
    value: 0,
    icon: CreditCard,
    badge: "+0 today",
    color: "from-green-400 to-emerald-400",
  },
];

const project = {
  name: "",
  materials: [],
  lastDelivery: "",
  progress: 60,
  status: "",
  statusColor: "bg-emerald-400",
};

const upcomingDelivery = {
  project: "",
  due: "",
  items: [],
  countdown: "",
};

export default function Overview() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">Overview</h2>
              <p className="text-slate-400 mt-1">Summary of projects, orders, and deliveries</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects, materials..."
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                />
              </div>
              <button className="relative p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                <Bell className="w-5 h-5 text-slate-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((card, idx) => (
              <div key={card.label} className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{card.value}</h3>
                <p className="text-slate-400 text-sm">{card.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Project Summary</h3>
              </div>
              <div className="bg-slate-700/30 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
                      <Home className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-lg">{project.name}</h4>
                      <p className="text-sm text-slate-400">Last Delivery: {project.lastDelivery}</p>
                      <span className="text-sm text-emerald-400">Status: {project.status}</span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-3 mb-3">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-300">{project.progress}% Complete</span>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium px-4 py-2 rounded-lg transition-all shadow-lg shadow-emerald-500/20"
                    onClick={openModal}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-6">Upcoming Delivery</h3>
              <div className="bg-slate-700/30 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
                    <Truck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white text-lg">{upcomingDelivery.project}</h4>
                    <p className="text-sm text-slate-400">Due: {upcomingDelivery.due}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">Items</h4>
                  <ul className="text-sm text-slate-300 list-disc pl-5 space-y-1">
                    {upcomingDelivery.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-emerald-400">{upcomingDelivery.countdown}</span>
                  <button className="bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium px-4 py-2 rounded-lg transition-all shadow-lg shadow-emerald-500/20">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div className="relative z-10 w-full max-w-xl mx-4 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg flex items-center justify-center">
                  <Home className="w-4 h-4 text-slate-300" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Project Details</h2>
                  <p className="text-xs text-slate-400">Complete project information</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition-colors"
              >
                <X className="w-4 h-4 text-slate-300" />
              </button>
            </div>
            <div className="p-0">
              <div className="bg-slate-700/30 rounded-xl p-4 md:p-5 w-full max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <div className="text-xl font-bold text-white mb-2">{project.name}</div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.materials.map((mat) => (
                        <span key={mat} className="px-3 py-0.5 rounded-full bg-emerald-800/80 text-emerald-100 text-xs font-semibold">{mat}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg width="64" height="64" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="#2A334A" strokeWidth="7" />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="#10B981"
                          strokeWidth="7"
                          strokeDasharray={2 * Math.PI * 28}
                          strokeDashoffset={2 * Math.PI * 28 * (1 - project.progress / 100)}
                          strokeLinecap="round"
                          style={{ transition: 'stroke-dashoffset 0.6s' }}
                        />
                        <text x="32" y="40" textAnchor="middle" className="fill-white font-bold text-base">{project.progress}%</text>
                      </svg>
                    </div>
                    <span className="mt-0.5 px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold">{project.progress}% Complete</span>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-lg">
                  <table className="min-w-full text-left text-white text-sm">
                    <thead>
                      <tr className="bg-slate-800/50 text-slate-200 text-xs">
                        <th className="px-3 py-2 font-semibold">Date</th>
                        <th className="px-3 py-2 font-semibold">Item</th>
                        <th className="px-3 py-2 font-semibold">Quantity</th>
                        <th className="px-3 py-2 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700/50">
                        <td className="px-3 py-2">
                          <span className="inline-block rounded bg-slate-800/70 text-xs px-2 py-0.5 text-white font-semibold">12 May 2025</span>
                        </td>
                        <td className="px-3 py-2 flex items-center gap-2">
                          <Package className="w-4 h-4 text-emerald-300" /> Cement
                        </td>
                        <td className="px-3 py-2">200 bags</td>
                        <td className="px-3 py-2">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-200 font-semibold text-xs">Delivered</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 py-2">
                          <span className="inline-block rounded bg-slate-800/70 text-xs px-2 py-0.5 text-white font-semibold">15 May 2025</span>
                        </td>
                        <td className="px-3 py-2 flex items-center gap-2">
                          <svg className="w-4 h-4 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="7" width="18" height="4" rx="1" fill="currentColor"/><rect x="3" y="13" width="7.5" height="4" rx="1" fill="currentColor"/><rect x="13.5" y="13" width="7.5" height="4" rx="1" fill="currentColor"/></svg>
                          Bricks
                        </td>
                        <td className="px-3 py-2">500 pcs</td>
                        <td className="px-3 py-2">
                          <span className="px-2 py-0.5 rounded-full bg-amber-800/80 text-amber-200 font-semibold text-xs">Pending</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-5">
                  <button className="flex items-center gap-2 px-5 py-1.5 rounded-lg bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-semibold text-base shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-emerald-400">
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-5 h-5 text-slate-900 opacity-90' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='1.5'><circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='1.5' fill='none'/><path strokeLinecap='round' strokeLinejoin='round' d='M12 16h.01M12 8v2a2 2 0 002 2h0a2 2 0 00-2 2v0' /></svg>
                    Request Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}