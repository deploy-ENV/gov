import React, { useContext, useState } from 'react';
import { Flag, XCircle, CheckCircle, User, Truck, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectContext } from '../projectContext';

const STATUS_STYLES = {
  'On Bidding': 'bg-yellow-400/20 text-yellow-300 text-xs font-semibold rounded-md px-2 py-1',
  'Ongoing': 'bg-cyan-400/20 text-cyan-300 rounded-md px-2 py-1 text-xs font-semibold',
  'Completed': 'bg-emerald-400/20 text-emerald-300 rounded-md px-2 py-1 text-xs font-semibold',
  'Delayed': 'bg-red-400/20 text-red-300 rounded-md px-2 py-1 text-xs font-semibold',
};

function daysAgo(dateStr) {
  const created = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - created) / (1000 * 60 * 60 * 24));
  return diff === 0 ? 'Today' : `${diff} day${diff > 1 ? 's' : ''} ago`;
}

function ProjectCard({ project, onClick }) {
  const percentUsed = project.budgetTotal ? Math.round((project.budgetUsed / project.budgetTotal) * 100) : 0;

  return (
    <motion.div
      className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/50 shadow-md flex flex-col gap-2 cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl group text-white"
      onClick={() => onClick(project)}
      tabIndex={0}
      aria-label={`View details for project ${project.title}`}
    >
      <div className="relative h-40 w-full rounded-xl overflow-hidden bg-slate-700 mb-2">
        <img
          src={project.thumbnail || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'}
          alt="Project Thumbnail"
          className="object-cover w-full h-full group-hover:opacity-90 transition"
        />
        {project.flagged && (
          <Flag className="absolute top-2 right-2 text-red-400 bg-white rounded-full p-1 w-7 h-7 shadow" />
        )}
      </div>
      <div className="flex items-center gap-2 justify-between mb-1">
        <h3 className="font-bold text-lg text-cyan-400 truncate" title={project.title}>{project.title}</h3>
        <span className={STATUS_STYLES[project.status]}>{project.status}</span>
      </div>
      <div className="text-sm text-slate-300 flex flex-col gap-1">
        <span><span className="font-semibold text-white">Contractor:</span> {project.contractor || <span className="italic text-slate-500">Not Assigned</span>}</span>
        <span><span className="font-semibold text-white">Supervisor:</span> {project.supervisor || <span className="italic text-slate-500">Not Assigned</span>}</span>
      </div>
      <div className="mt-2">
        <div className="flex justify-between text-xs mb-1 text-slate-400">
          <span>Budget Used</span>
          <span>{percentUsed}%</span>
        </div>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-400 rounded-full transition-all" style={{ width: `${percentUsed}%` }} />
        </div>
        <div className="flex justify-between text-xs mt-1 text-slate-300">
          <span className="text-emerald-400 font-semibold">₹{project.budgetUsed?.toLocaleString?.() || 0}</span>
          <span>/ ₹{project.budgetTotal?.toLocaleString?.() || 0}</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs mt-2 text-slate-500">
        <span>{project.startDate || (project.createdAt && daysAgo(project.createdAt))}</span>
        <span>|</span>
        <span>{project.deadline || (project.zone && `${project.zone} Zone`)}</span>
      </div>
    </motion.div>
  );
}

function OnBiddingModal({ project, onClose, onAssign }) {
  const [step, setStep] = useState(0);
  const [assignedContractor, setAssignedContractor] = useState(null);
  const [autoSupplier, setAutoSupplier] = useState(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [confirming, setConfirming] = useState(false);

  const DUMMY_BIDS = [
    { id: 1, name: 'BuildTech India Pvt. Ltd.', amount: 4500000, duration: 120, proposal: 'proposal-buildtech.pdf' },
    { id: 2, name: 'CementPro Infra', amount: 4700000, duration: 110, proposal: 'proposal-cementpro.pdf' },
  ];

  const DUMMY_SUPPLIERS = [
    { id: 1, name: 'ShreeBuild Co.', zone: 'East' },
    { id: 2, name: 'CementPro Ltd.', zone: 'West' },
    { id: 3, name: 'SteelMart', zone: 'North' },
  ];

  const DUMMY_SUPERVISORS = [
    { id: 1, name: 'Amit Kumar', region: 'East', experience: 8 },
    { id: 2, name: 'Priya Singh', region: 'West', experience: 5 },
    { id: 3, name: 'Rakesh Verma', region: 'East', experience: 3 },
  ];

  const getNearestSupplier = (zone) => DUMMY_SUPPLIERS.find(s => s.zone === zone) || DUMMY_SUPPLIERS[0];

  const handleAssignContractor = (bid) => {
    setAssignedContractor(bid);
    setStep(1);
    setTimeout(() => setAutoSupplier(getNearestSupplier(project.zone)), 400);
  };

  const handleConfirmSupervisor = () => {
    setConfirming(true);
    setTimeout(() => {
      onAssign({
        contractor: assignedContractor.name,
        supplier: autoSupplier.name,
        supervisor: DUMMY_SUPERVISORS.find(s => s.id === Number(selectedSupervisor))?.name || '',
      });
      setConfirming(false);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-slate-800/90 text-white rounded-2xl border border-slate-700/50 shadow-xl p-6 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="absolute top-4 right-4 text-slate-400 hover:text-red-400" onClick={onClose}><XCircle size={28} /></button>
          <div className="flex gap-4 mb-6 border-b border-slate-600 pb-2">
            <button className={`font-semibold px-2 pb-1 border-b-2 ${step === 0 ? 'border-yellow-400 text-yellow-300' : 'border-transparent text-white/50'}`} onClick={() => setStep(0)}>1. View Bids</button>
            <button className={`font-semibold px-2 pb-1 border-b-2 ${step === 1 ? 'border-cyan-400 text-cyan-300' : 'border-transparent text-white/50'}`} disabled={!assignedContractor} onClick={() => assignedContractor && setStep(1)}>2. Auto Supplier</button>
            <button className={`font-semibold px-2 pb-1 border-b-2 ${step === 2 ? 'border-emerald-400 text-emerald-300' : 'border-transparent text-white/50'}`} disabled={!autoSupplier} onClick={() => autoSupplier && setStep(2)}>3. Assign Supervisor</button>
          </div>
          <div className="space-y-6">
            {step === 0 && DUMMY_BIDS.map(bid => (
              <div key={bid.id} className="bg-slate-700/40 rounded-xl p-4 border border-slate-600 shadow space-y-2">
                <div className="font-bold text-lg flex items-center gap-2"><User size={18} />{bid.name}</div>
                <div className="text-sm flex items-center gap-1"><FileText size={16} /> Proposal: <a href={`/${bid.proposal}`} className="underline text-cyan-400 hover:text-cyan-300" download>Download</a></div>
                <div className="text-sm">Bid Amount: <span className="font-semibold text-emerald-400">₹{bid.amount.toLocaleString()}</span></div>
                <div className="text-sm">Timeline: <span className="font-semibold text-cyan-400">{bid.duration} days</span></div>
                <button
                  className="mt-3 px-4 py-2 rounded-lg bg-yellow-400/20 text-yellow-300 font-semibold hover:bg-yellow-400/30 transition"
                  onClick={() => handleAssignContractor(bid)}
                >
                  <CheckCircle className="inline mr-1 text-green-300" size={18} /> Assign Contractor
                </button>
              </div>
            ))}
            {step === 1 && autoSupplier && (
              <div className="text-center text-emerald-300 font-semibold">
                <Truck className="inline-block mr-1" /> Auto-selected Supplier: {autoSupplier.name} ({autoSupplier.zone})
                <button className="block mt-4 mx-auto px-4 py-2 bg-cyan-400 text-slate-900 rounded-lg font-bold hover:brightness-110" onClick={() => setStep(2)}>
                  Next: Assign Supervisor
                </button>
              </div>
            )}
            {step === 2 && (
              <div className="flex flex-col gap-4">
                <label className="text-white font-semibold">Select Supervisor</label>
                <select
                  className="px-3 py-2 rounded-lg bg-slate-700 text-white"
                  value={selectedSupervisor}
                  onChange={e => setSelectedSupervisor(e.target.value)}
                >
                  <option value="" disabled>Select supervisor…</option>
                  {DUMMY_SUPERVISORS.filter(s => s.region === project.zone).map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.experience} yrs)</option>
                  ))}
                </select>
                <button
                  className="px-5 py-2 rounded bg-emerald-400 text-slate-900 font-bold shadow hover:brightness-110 transition disabled:opacity-50"
                  disabled={!selectedSupervisor || confirming}
                  onClick={handleConfirmSupervisor}
                >
                  <CheckCircle className="inline mr-1" size={18} /> Confirm Assignment
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function AllProjects() {
  const { hardcodedProjects, dynamicProjects } = useContext(ProjectContext);
  const [modalProject, setModalProject] = useState(null);

  const handleAssign = ({ contractor, supplier, supervisor }) => {
    if (modalProject) {
      modalProject.status = 'Ongoing';
      modalProject.contractor = contractor;
      modalProject.supplier = supplier;
      modalProject.supervisor = supervisor;
    }
    setModalProject(null);
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 font-sans text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-400">All My Projects</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hardcodedProjects.map(project => (
          <ProjectCard key={project.id} project={project} onClick={() => {}} />
        ))}
        {dynamicProjects.map(project => (
          <ProjectCard key={project.id} project={project} onClick={p => p.status === 'On Bidding' ? setModalProject(p) : null} />
        ))}
        {hardcodedProjects.length + dynamicProjects.length === 0 && (
          <div className="col-span-full text-center text-slate-400 py-12">No projects found.</div>
        )}
      </div>
      {modalProject && (
        <OnBiddingModal project={modalProject} onClose={() => setModalProject(null)} onAssign={handleAssign} />
      )}
    </div>
  );
}
