import React, { useState } from 'react';
import { Download, Eye, BadgeCheck, ChevronDown, User, FileText, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DUMMY_BIDS = [
  // {
  //   id: 1,
  //   name: 'Amit Sharma',
  //   profile: 'https://randomuser.me/api/portraits/men/32.jpg',
  //   budget: 1200000,
  //   budgetPercent: 80,
  //   timeline: 45,
  //   proposal: 'proposal-amit.pdf',
  //   materials: 'Cement, Steel, Bricks',
  //   experienceMatch: 87,
  //   experienceLevel: 'Senior',
  //   license: 'Class A',
  //   justification: '10+ years in public works, handled similar scale projects.',
  // },
  // {
  //   id: 2,
  //   name: 'Priya Verma',
  //   profile: 'https://randomuser.me/api/portraits/women/44.jpg',
  //   budget: 1100000,
  //   budgetPercent: 73,
  //   timeline: 50,
  //   proposal: 'proposal-priya.pdf',
  //   materials: 'Cement, Steel, Sand',
  //   experienceMatch: 92,
  //   experienceLevel: 'Expert',
  //   license: 'Class B',
  //   justification: 'Award-winning contractor, high client satisfaction.',
  // },
  // {
  //   id: 3,
  //   name: 'Rakesh Singh',
  //   profile: 'https://randomuser.me/api/portraits/men/65.jpg',
  //   budget: 1350000,
  //   budgetPercent: 90,
  //   timeline: 40,
  //   proposal: 'proposal-rakesh.pdf',
  //   materials: 'Cement, Steel, Tiles',
  //   experienceMatch: 78,
  //   experienceLevel: 'Intermediate',
  //   license: 'Class C',
  //   justification: 'Solid track record, good references.',
  // },
];

const EXPERIENCE_LEVELS = ['All', 'Expert', 'Senior', 'Intermediate'];
const LICENSE_TYPES = ['All', 'Class A', 'Class B', 'Class C'];
const SORT_OPTIONS = [
  { label: 'Budget (Low to High)', value: 'budget' },
  { label: 'Timeline (Short to Long)', value: 'timeline' },
  { label: 'Experience Match %', value: 'match' },
];

export function BidsTable({ bids, onView, onAssign, assignedId, sort, setSort, filter, setFilter }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4 overflow-x-auto">
      <div className="flex flex-wrap gap-4 mb-4 items-center justify-between">
        <div className="flex gap-2 items-center">
          <label className="font-medium text-primary">Sort by:</label>
          <select
            className="glass px-2 py-1 rounded border border-accent/30 text-primary"
            value={sort}
            onChange={e => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-medium text-primary">Experience:</label>
          <select
            className="glass px-2 py-1 rounded border border-accent/30 text-primary"
            value={filter.exp}
            onChange={e => setFilter(f => ({ ...f, exp: e.target.value }))}
          >
            {EXPERIENCE_LEVELS.map(lvl => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
          <label className="font-medium text-primary ml-4">License:</label>
          <select
            className="glass px-2 py-1 rounded border border-accent/30 text-primary"
            value={filter.lic}
            onChange={e => setFilter(f => ({ ...f, lic: e.target.value }))}
          >
            {LICENSE_TYPES.map(lvl => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-[#F7F9FC] text-primary">
            <th className="py-2 px-3 text-left font-semibold">Contractor</th>
            <th className="py-2 px-3 text-left font-semibold">Budget Usage</th>
            <th className="py-2 px-3 text-left font-semibold">Timeline</th>
            <th className="py-2 px-3 text-left font-semibold">Proposal</th>
            <th className="py-2 px-3 text-left font-semibold">Materials Plan</th>
            <th className="py-2 px-3 text-left font-semibold">Experience Match</th>
            <th className="py-2 px-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bids.map(bid => (
            <BidRow
              key={bid.id}
              bid={bid}
              onView={() => onView(bid)}
              onAssign={() => onAssign(bid)}
              assigned={assignedId === bid.id}
              disabled={assignedId && assignedId !== bid.id}
            />
          ))}
        </tbody>
      </table>
      {bids.length === 0 && <div className="text-center text-secondary py-8">No bids found.</div>}
    </div>
  );
}

export function BidRow({ bid, onView, onAssign, assigned, disabled }) {
  return (
    <tr className="border-b last:border-0">
      <td className="py-5 px-3 flex items-center gap-4 min-w-[200px]">
        <img src={bid.profile} alt={bid.name} className="w-14 h-14 rounded-full object-cover border border-accent" />
        <div className="flex flex-col">
          <div className="font-bold text-lg text-primary whitespace-nowrap">{bid.name}</div>
          <div className="text-sm text-secondary">
            {bid.experienceLevel}<br />
            {bid.license}
          </div>
        </div>
      </td>
      <td className="py-3 px-3">
        <span className="font-medium text-primary">₹{bid.budget.toLocaleString()}</span>
        <span className="ml-2 text-xs text-secondary">({bid.budgetPercent}% of total)</span>
      </td>
      <td className="py-3 px-3">
        <span className="font-medium text-primary">{bid.timeline} days</span>
      </td>
      <td className="py-3 px-3">
        <a href={`/${bid.proposal}`} download className="flex items-center gap-1 text-accent hover:underline">
          <FileText size={16} /> Download
        </a>
      </td>
      <td className="py-3 px-3">
        <span className="text-primary text-xs mr-2">{bid.materials}</span>
        <button type="button" className="text-accent underline text-xs" onClick={onView}>View</button>
      </td>
      <td className="py-3 px-3">
        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs">
          <BadgeCheck size={14} /> {bid.experienceMatch}% match
        </span>
      </td>
      <td className="py-3 px-3">
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-1 rounded bg-primary text-white text-xs font-semibold shadow-card hover:bg-primary/90 transition disabled:opacity-50"
            onClick={onView}
            disabled={false}
          >
            View Full Bid
          </button>
          <button
            type="button"
            className={`px-3 py-1 rounded bg-accent text-white text-xs font-semibold shadow-card hover:bg-accent/90 transition disabled:opacity-50 ${assigned ? 'bg-success' : ''}`}
            onClick={onAssign}
            disabled={disabled || assigned}
          >
            {assigned ? 'Contractor Assigned' : 'Assign Contractor'}
          </button>
        </div>
      </td>
    </tr>
  );
}

export function BidModal({ open, bid, onClose }) {
  if (!open || !bid) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl p-8 max-w-lg w-full shadow-card relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <button className="absolute top-3 right-3 text-secondary hover:text-error" onClick={onClose}><XCircle size={24} /></button>
          <div className="flex items-center gap-4 mb-4">
            <img src={bid.profile} alt={bid.name} className="w-12 h-12 rounded-full border border-accent" />
            <div>
              <div className="font-bold text-lg text-primary">{bid.name}</div>
              <div className="text-xs text-secondary">{bid.experienceLevel} • {bid.license}</div>
            </div>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-primary">Proposal: </span>
            <a href={`/${bid.proposal}`} download className="text-accent underline flex items-center gap-1"><FileText size={16} /> Download</a>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-primary">Timeline: </span>
            <span className="text-secondary">{bid.timeline} days</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-primary">Budget: </span>
            <span className="text-secondary">₹{bid.budget.toLocaleString()} ({bid.budgetPercent}% of total)</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-primary">Materials Plan: </span>
            <span className="text-secondary">{bid.materials}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-primary">Experience Match: </span>
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/10 text-accent font-semibold text-xs">
              <BadgeCheck size={14} /> {bid.experienceMatch}% match
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold text-primary">Justification: </span>
            <span className="text-secondary">{bid.justification}</span>
          </div>
          <div className="flex justify-end">
            <button className="px-5 py-2 rounded bg-border text-primary font-semibold shadow-card hover:bg-accent/10 transition" onClick={onClose}>Close</button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function AssignModal({ open, contractor, onConfirm, onCancel }) {
  if (!open || !contractor) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl p-8 max-w-md w-full shadow-card relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          <div className="font-bold text-lg text-primary mb-2">Confirm Assignment</div>
          <div className="text-secondary mb-6">Are you sure you want to assign <span className="font-semibold text-primary">{contractor.name}</span> to this project? This will lock bidding.</div>
          <div className="flex justify-end gap-3">
            <button className="px-5 py-2 rounded bg-border text-primary font-semibold shadow-card hover:bg-accent/10 transition" onClick={onCancel}>Cancel</button>
            <button className="px-5 py-2 rounded bg-success text-white font-semibold shadow-card hover:bg-success/90 transition flex items-center gap-1" onClick={onConfirm}>
              <CheckCircle size={18} /> Confirm
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ViewBids() {
  const [bids, setBids] = useState(DUMMY_BIDS);
  const [sort, setSort] = useState('budget');
  const [filter, setFilter] = useState({ exp: 'All', lic: 'All' });
  const [viewBid, setViewBid] = useState(null);
  const [assigning, setAssigning] = useState(null);
  const [assignedId, setAssignedId] = useState(null);
  const [message, setMessage] = useState('');

  // Sorting and filtering logic
  const filtered = bids.filter(bid =>
    (filter.exp === 'All' || bid.experienceLevel === filter.exp) &&
    (filter.lic === 'All' || bid.license === filter.lic)
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'budget') return a.budget - b.budget;
    if (sort === 'timeline') return a.timeline - b.timeline;
    if (sort === 'match') return b.experienceMatch - a.experienceMatch;
    return 0;
  });

  const handleAssign = (bid) => {
    setAssigning(bid);
  };
  const confirmAssign = () => {
    setAssignedId(assigning.id);
    setAssigning(null);
    setMessage('Contractor Assigned');
    setTimeout(() => setMessage(''), 2000);
    // Simulate transition to next panel after 2s
    // (You can add navigation logic here if needed)
  };

  return (
    <div className="h-full w-full bg-[#F7F9FC] p-0 m-0">
      <div className="w-full h-full">
        <BidsTable
          bids={sorted}
          onView={setViewBid}
          onAssign={handleAssign}
          assignedId={assignedId}
          sort={sort}
          setSort={setSort}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <BidModal open={!!viewBid} bid={viewBid} onClose={() => setViewBid(null)} />
      <AssignModal open={!!assigning} contractor={assigning} onConfirm={confirmAssign} onCancel={() => setAssigning(null)} />
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="fixed left-1/2 -translate-x-1/2 bottom-8 bg-primary text-white px-6 py-3 rounded-xl shadow-card flex items-center gap-2 z-50"
          >
            <CheckCircle className="text-success" size={24} />
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 