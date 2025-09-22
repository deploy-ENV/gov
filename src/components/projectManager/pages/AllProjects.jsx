import React, { useContext, useState, useEffect } from 'react';
import { Flag, XCircle, CheckCircle, User,Send , Truck, FileText, Eye, Calendar,Trash2 , DollarSign, Clock, Star, Award, ArrowLeft, Download, MapPin, Phone, Mail, Building, Trophy ,X ,Users ,Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectContext } from '../projectContext';
import Cookies from "js-cookie";

import { getMyProjects ,deleteProjectById,getNearestSupervisor } from '../../../services/projectService';
import { getBidsByProject } from '../../../services/bidService';


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

function ProjectCard({ project, onClick,onDelete }) {
  const percentUsed = project.budgetTotal ? Math.round((project.budgetUsed / project.budgetTotal) * 100) : 0;
  
  return (
    <motion.div
      className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50 shadow-md flex flex-col gap-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg group text-white"
      
      tabIndex={0}
      aria-label={`View details for project ${project.title}`}
    >
     
      <div className="relative h-32 w-full rounded-lg overflow-hidden bg-slate-700 mb-2"
      onClick={() => onClick(project)}
      >
        <img
          src={project.thumbnail || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80'}
          alt="Project Thumbnail"
          className="object-cover w-full h-full group-hover:opacity-90 transition"
        />
        {project.flagged && (
          <Flag className="absolute top-2 right-2 text-red-400 bg-white rounded-full p-1 w-6 h-6 shadow" />
        )}
      </div>
      <div className="flex items-center gap-2 justify-between mb-1">
        <h3 className="font-bold text-base text-cyan-400 truncate" title={project.title}>{project.title}</h3>
        <span className={STATUS_STYLES[project.status]}>{project.status}</span>
      </div>
      <div className="text-xs text-slate-300 space-y-1">
        <div><span className="font-semibold text-white">Contractor:</span> {project.contractor || <span className="italic text-slate-500">Not Assigned</span>}</div>
        <div><span className="font-semibold text-white">Supervisor:</span> {project.supervisor || <span className="italic text-slate-500">Not Assigned</span>}</div>
      </div>
      <div className="mt-2">
        <div className="flex justify-between text-xs mb-1 text-slate-400">
          <span>Budget Used</span>
          <span>{percentUsed}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
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
         <button
          onClick={() => onDelete(project.id)}
          className="p-1 rounded-full bg-slate-700/70 hover:bg-red-500/20 transition"
          >
          <Trash2 className="w-4 h-4 text-red-400" />
        </button>
      </div>
    </motion.div>
  );
}

// Supervisor Selection Modal
function SupervisorSelectionModal({ bid, project, onClose, onConfirm }) {
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [supervisors, setSupervisors] = useState([]);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getNearestSupervisor(zone);
      setSupervisors(data);
    } catch (err) {
      setError(err.message || "Failed to fetch supervisors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  // Dummy supervisors data - replace with actual API call
  const DUMMY_SUPERVISORS = [
    { id: 1, name: 'Rajesh Kumar', experience: 8, region: 'North', rating: 4.7, phone: '+91-9876543210' },
    { id: 2, name: 'Priya Sharma', experience: 6, region: 'South', rating: 4.5, phone: '+91-9876543211' },
    { id: 3, name: 'Amit Singh', experience: 10, region: 'East', rating: 4.8, phone: '+91-9876543212' },
    { id: 4, name: 'Sunita Patel', experience: 5, region: 'West', rating: 4.3, phone: '+91-9876543213' },
    { id: 5, name: 'Vikram Gupta', experience: 7, region: 'Central', rating: 4.6, phone: '+91-9876543214' }
  ];

  const handleConfirmAssignment = async () => {
    if (!selectedSupervisor) return;
    
    setConfirming(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const supervisor = DUMMY_SUPERVISORS.find(s => s.id === Number(selectedSupervisor));
      onConfirm({
        bid,
        supervisor,
        project
      });
      setConfirming(false);
    }, 1000);
  };

  const contractorName = bid.contractorName || bid.contractor_name || 'Unknown Contractor';
  const bidAmount = bid.bidAmount || bid.bid_amount || bid.amount || 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded hover:bg-slate-700/50"
        >
          <X className="w-6 h-6 text-slate-400" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Assign Supervisor
          </h1>
          <p className="text-slate-400">Complete the project assignment process</p>
        </div>

        {/* Assignment Summary */}
        <div className="bg-slate-700/30 rounded-xl p-4 mb-6 border border-slate-600/30">
          <h3 className="text-lg font-bold text-white mb-3">Assignment Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Project:</span>
              <p className="text-white font-medium">{project.title}</p>
            </div>
            <div>
              <span className="text-slate-400">Selected Contractor:</span>
              <p className="text-emerald-400 font-medium">{contractorName}</p>
            </div>
            <div>
              <span className="text-slate-400">Bid Amount:</span>
              <p className="text-white font-medium">₹{bidAmount.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-slate-400">Timeline:</span>
              <p className="text-white font-medium">{bid.timeline || bid.duration || 'TBD'} days</p>
            </div>
          </div>
        </div>

        {/* Supervisor Selection */}
        <div className="mb-6">
          <label className="text-sm font-medium text-white flex items-center gap-2 mb-3">
            <User className="w-4 h-4 text-emerald-400" />
            Select Project Supervisor
          </label>
          <select
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3 focus:outline-none focus:border-cyan-400 transition"
            value={selectedSupervisor}
            onChange={e => setSelectedSupervisor(e.target.value)}
            disabled={supervisors.length === 0} // disable if no supervisors
          >
            {supervisors.length === 0 ? (
              <option value="" disabled>
                No supervisors available
              </option>
            ) : (
              <>
                <option value="" disabled>
                  Choose a supervisor...
                </option>
                {supervisors.map(supervisor => (
                  <option key={supervisor.id} value={supervisor.id}>
                    {supervisor.name} - {supervisor.experience} yrs exp (★{supervisor.rating})
                  </option>
                ))}
              </>
            )}
          </select>
        </div>


        {/* Selected Supervisor Details */}
        {selectedSupervisor && (
          <div className="bg-slate-700/30 rounded-xl p-4 mb-6 border border-slate-600/30">
            {(() => {
              const supervisor = DUMMY_SUPERVISORS.find(s => s.id === Number(selectedSupervisor));
              return supervisor ? (
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Selected Supervisor Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-400">Name:</span>
                      <span className="text-white font-medium">{supervisor.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-400" />
                      <span className="text-slate-400">Experience:</span>
                      <span className="text-white font-medium">{supervisor.experience} years</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-slate-400">Rating:</span>
                      <span className="text-white font-medium">{supervisor.rating}/5</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-400" />
                      <span className="text-slate-400">Contact:</span>
                      <span className="text-white font-medium">{supervisor.phone}</span>
                    </div>
                  </div>
                </div>
              ) : null;
            })()}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition"
            disabled={confirming}
          >
            Cancel
          </button>
          
          <button 
            onClick={handleConfirmAssignment}
            disabled={!selectedSupervisor || confirming}
            className="flex-1 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold py-3 px-6 rounded-lg hover:from-emerald-500 hover:to-cyan-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {confirming ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                Assigning...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                Confirm Assignment
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Bid Details Modal
// Redesigned BidDetailsModal with BiddingFormCard styling
// BidDetailsModal with exact same structure as BiddingFormCard
function BidDetailsModal({ bid, project, onClose, onAcceptBid }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date not available';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  console.log(project);
  const getCompetitiveLevel = (amount) => {
    if (!amount) return { level: 'Unknown', color: 'text-slate-400', bg: 'bg-slate-500/10', icon: '❓' };
    if (amount < 120000) return { level: 'Highly Competitive', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: '🔥' };
    if (amount < 150000) return { level: 'Competitive', color: 'text-yellow-400', bg: 'bg-yellow-500/10', icon: '⚡' };
    return { level: 'Standard', color: 'text-slate-400', bg: 'bg-slate-500/10', icon: '📋' };
  };

  const contractorName = bid.contractorName || bid.contractor_name || 'Unknown Contractor';
  const bidAmount = bid.bidAmount || bid.bid_amount || bid.amount || 0;
  const timeline = bid.timeline || bid.duration || bid.timelineEstimate || 'TBD';
  const experience = bid.experience || bid.years_experience || 'N/A';
  const rating = bid.rating || bid.contractor_rating || 4.0;
  const description = bid.description || bid.proposalText || 'No description provided';
  const submittedAt = bid.submittedAt || bid.submitted_at || bid.created_at || new Date().toISOString();
  const competitive = getCompetitiveLevel(bidAmount);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded hover:bg-slate-700/50"
        >
          <X className="w-6 h-6 text-slate-400" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-1">
            Bid Details
          </h1>
          <p className="text-slate-400">Review contractor's proposal for this project</p>
        </div>

        {/* Contractor Info Card - Same structure as Project Info Card */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Contractor Information</h3>
              <p className="text-sm text-slate-400">Submitted bid details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase">Contractor Name</span>
              </div>
              <p className="text-sm font-medium text-white">{contractorName}</p>
            </div>
           
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase">Bid Amount</span>
              </div>
              <p className="text-sm font-medium text-white">₹{bidAmount.toLocaleString()}</p>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase">Timeline</span>
              </div>
              <p className="text-sm font-medium text-white">{timeline} days</p>
            </div>

          

            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase">Submitted At</span>
              </div>
              <p className="text-sm font-medium text-white">{formatDate(submittedAt)}</p>
            </div>
          </div>
        </div>

        {/* Bid Form - Same structure as BiddingFormCard form */}
        <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 space-y-6">
          {/* Basic Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Time */}
            <div>
              <label className="text-sm font-medium text-white flex gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Estimated Project Time
              </label>
              <div className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3">
                {timeline} days
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="text-sm font-medium text-white flex gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Bid Amount
              </label>
              <div className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3">
                ₹{bidAmount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Workers */}
          <div>
            <label className="text-sm font-medium text-white flex gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Number of Workers
            </label>
            <div className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3">
              {bid.workers || 'Not specified'}
            </div>
          </div>

          {/* Work Plan */}
          <div>
            <label className="text-sm font-medium text-white flex gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Work Plan Description
            </label>
            <div className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3 min-h-[100px]">
              {description}
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="text-sm font-medium text-white flex gap-2">
              <User className="w-4 h-4 text-emerald-400" />
              Experience Justification
            </label>
            <div className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3 min-h-[75px]">
              {experience} years of experience in similar projects
            </div>
          </div>

          {/* Technical Documents Section */}
          <div className="bg-slate-700/20 rounded-xl p-6 border border-slate-600/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Technical Documents</h3>
                <p className="text-sm text-slate-400">Submitted technical documentation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Document Display Fields */}
              {[
                { label: "Enlistment Certificate", field: "enlistment" },
                { label: "EPF Registration", field: "epf" },
                { label: "GST Certificate", field: "gst" },
                { label: "Company Related Documents", field: "companyDocs" },
                { label: "Demand Draft", field: "demandDraft" },
                { label: "Application Form", field: "application" }
              ].map(({ label, field }) => (
                <div key={field}>
                  <label className="text-sm font-medium text-white flex gap-2">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    {label}
                  </label>
                  <div className="mt-2 bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                    {bid[field] ? (
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        <div>
                          <p className="text-sm font-medium text-white">Document uploaded</p>
                          <p className="text-xs text-slate-400">Available for review</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-slate-500">
                        <X className="w-5 h-5" />
                        <p className="text-sm">Not provided</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Documents Section */}
          <div className="bg-slate-700/20 rounded-xl p-6 border border-slate-600/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Financial Documents</h3>
                <p className="text-sm text-slate-400">Submitted financial documentation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="text-sm font-medium text-white flex gap-2">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  Bill of Quantities (BOQ)
                </label>
                <div className="mt-2 bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                  {bid.boq || bid.proposal ? (
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-emerald-400" />
                      <div>
                        <p className="text-sm font-medium text-white">BOQ Document uploaded</p>
                        <p className="text-xs text-slate-400">Available for download</p>
                      </div>
                      {bid.proposal && (
                        <a 
                          href={`/${bid.proposal}`} 
                          download
                          className="ml-auto inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/15 text-emerald-300 rounded-lg hover:bg-emerald-500/25 transition-all text-xs font-medium border border-emerald-500/30"
                        >
                          <Download size={12} />
                          Download
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-slate-500">
                      <X className="w-5 h-5" />
                      <p className="text-sm">Not provided</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
         
          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition"
            >
              Close
            </button>
            
            {project.status === 'BIDDING' && (
              <button 
                onClick={() => onAcceptBid && onAcceptBid(bid)}
                className="flex-1 bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-semibold py-3 px-6 rounded-lg hover:from-emerald-500 hover:to-cyan-500 transition"
              >
                <Send className="inline-block mr-2 w-5 h-5" />
                Accept This Bid
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact Bid Card Component
function BidCard({ bid, index, project, onViewDetails, onAcceptBid }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date not available';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCompetitiveLevel = (amount) => {
    if (!amount) return { level: 'Unknown', color: 'text-slate-400', bg: 'bg-slate-500/10' };
    if (amount < 120000) return { level: 'Highly Competitive', color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
    if (amount < 150000) return { level: 'Competitive', color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
    return { level: 'Standard', color: 'text-slate-400', bg: 'bg-slate-500/10' };
  };

  const competitive = getCompetitiveLevel(bid.bidAmount);
  
  const contractorName = bid.contractorName || bid.contractor_name || 'Unknown Contractor';
  const bidAmount = bid.bidAmount || bid.bid_amount || bid.amount || 0;
  const timeline = bid.timeline || bid.duration || bid.timelineEstimate || 'TBD';
  const experience = bid.experience || bid.years_experience || 'N/A';
  const rating = bid.rating || bid.contractor_rating || 4.0;
  const description = bid.description || bid.proposalText || 'No description provided';
  const submittedAt = bid.submittedAt || bid.submitted_at || bid.created_at || new Date().toISOString();

  return (
    <motion.div
      className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-600/40 shadow-lg overflow-hidden hover:border-cyan-400/50 transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
      onClick={() => onViewDetails(bid)}
    >
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-cyan-600/10 to-blue-600/10 p-4 border-b border-slate-600/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-bold text-lg text-white">{contractorName}</h4>
              <div className="flex items-center gap-3 text-xs">
                <span className="flex items-center gap-1 text-yellow-400">
                  <Star size={12} fill="currentColor" />
                  {rating}
                </span>
                <span className="flex items-center gap-1 text-purple-400">
                  <Award size={12} />
                  {experience} yrs
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-400">₹{bidAmount.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Compact Body */}
      <div className="p-4 space-y-3">
        {/* Key Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock size={14} className="text-cyan-400" />
              <span className="text-cyan-400 text-xs font-medium">Timeline</span>
            </div>
            <div className="text-lg font-bold text-white">{timeline}</div>
            <div className="text-xs text-slate-400">days</div>
          </div>
          
          <div className="bg-slate-700/30 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar size={14} className="text-purple-400" />
              <span className="text-purple-400 text-xs font-medium">Submitted</span>
            </div>
            <div className="text-sm font-bold text-white">
              {formatDate(submittedAt)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(bid);
            }}
            className="flex items-center gap-1 px-3 py-2 bg-cyan-500/15 text-cyan-300 rounded-lg hover:bg-cyan-500/25 transition-all text-xs font-medium border border-cyan-500/30 flex-1 justify-center"
          >
            <Eye size={14} />
            View Details
          </button>

          {project.status === 'On Bidding' && (
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAcceptBid && onAcceptBid(bid);
              }}
              className="flex items-center gap-1 px-3 py-2 bg-emerald-500/15 text-emerald-300 rounded-lg hover:bg-emerald-500/25 transition-all text-xs font-medium border border-emerald-500/30 flex-1 justify-center"
            >
              <CheckCircle size={14} />
              Accept Bid
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Full Page Project Bids View
function ProjectBidsView({ project, onBack, onProjectUpdate }) {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBid, setSelectedBid] = useState(null);
  const [showSupervisorModal, setShowSupervisorModal] = useState(false);
  const [acceptingBid, setAcceptingBid] = useState(null);

  const fetchProjectBids = async (projectId) => {
    try {
      setLoading(true);
      setError(null);
      
      const bidsData = await getBidsByProject(projectId);
      console.log('Fetched bids:', bidsData);
      
      if (bidsData && Array.isArray(bidsData) && bidsData.length > 0) {
        setBids(bidsData);
      } else {
        // Use dummy data if no bids found
        setBids(getDummyBids());
      }
    } catch (err) {
      console.error('Error fetching bids:', err);
      setError('Failed to load bids. Please try again.');
      // Show dummy data on error for demo purposes
      setBids(getDummyBids());
    } finally {
      setLoading(false);
    }
  };

  const getDummyBids = () => [
   
  ];

  useEffect(() => {
    if (project?.id) {
      fetchProjectBids(project.id);
    }
  }, [project]);

  const handleViewBidDetails = (bid) => {
    setSelectedBid(bid);
  };

  const handleAcceptBid = (bid) => {
    setAcceptingBid(bid);
    setSelectedBid(null); // Close bid details modal
    setShowSupervisorModal(true); // Show supervisor selection modal
  };

  const handleSupervisorAssignment = (assignmentData) => {
    // Update project with new assignment
    const updatedProject = {
      ...project,
      status: 'Ongoing',
      contractor: assignmentData.bid.contractorName,
      supervisor: assignmentData.supervisor.name,
      budgetUsed: assignmentData.bid.bidAmount
    };

    // Call parent update function if available
    if (onProjectUpdate) {
      onProjectUpdate(updatedProject);
    }

    // Close modals
    setShowSupervisorModal(false);
    setAcceptingBid(null);

    // Show success message or redirect
    console.log('Project assigned successfully:', assignmentData);
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 font-sans text-white">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-slate-300 hover:text-white border border-slate-600/50"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </button>
        
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-cyan-400 mb-2">
            {project.title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            <span className={STATUS_STYLES[project.status]}>{project.status}</span>
            <span className="flex items-center gap-1 bg-slate-700/50 rounded px-3 py-1">
              <DollarSign size={14} className="text-emerald-400" />
              Budget: ₹{project.totalBudget?.toLocaleString() || 0}
            </span>
            {project.deadline && (
              <span className="flex items-center gap-1 bg-slate-700/50 rounded px-3 py-1">
                <Calendar size={14} className="text-purple-400" />
                {project.deadline}
              </span>
            )}
            {project.zone && (
              <span className="flex items-center gap-1 bg-slate-700/50 rounded px-3 py-1">
                📍 {project.zone} Zone
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bids Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-white">
            Received Bids
          </h3>
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg px-4 py-2">
            <span className="text-cyan-300 font-semibold">
              {loading ? '...' : bids.length} {bids.length === 1 ? 'Bid' : 'Bids'}
            </span>
          </div>
        </div>

        {loading && (
          <div className="text-center text-slate-400 py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-6"></div>
            <p className="text-lg">Loading bids...</p>
          </div>
        )}

        {!loading && !error && Array.isArray(bids) && bids.length === 0 && (
          <div className="text-center text-slate-400 py-16 bg-slate-800/20 rounded-xl">
            <Eye size={64} className="mx-auto mb-6 opacity-50" />
            <p className="text-2xl mb-4">No bids submitted yet</p>
            <p className="text-slate-500">Bids will appear here once contractors submit their proposals.</p>
          </div>
        )}

        {!loading && Array.isArray(bids) && bids.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {bids.map((bid, index) => (
              <BidCard 
                key={bid.id || index}
                bid={bid}
                index={index}
                project={project}
                onViewDetails={handleViewBidDetails}
                onAcceptBid={handleAcceptBid}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bid Details Modal */}
      {selectedBid && (
        <BidDetailsModal
          bid={selectedBid}
          project={project}
          onClose={() => setSelectedBid(null)}
          onAcceptBid={handleAcceptBid}
        />
      )}

      {/* Supervisor Selection Modal */}
      {showSupervisorModal && acceptingBid && (
        <SupervisorSelectionModal
          bid={acceptingBid}
          project={project}
          onClose={() => {
            setShowSupervisorModal(false);
            setAcceptingBid(null);
          }}
          onConfirm={handleSupervisorAssignment}
        />
      )}
    </div>
  );
}

function OnBiddingModal({ project, onClose, onAssign }) {
  const [step, setStep] = useState(0);
  const [assignedContractor, setAssignedContractor] = useState(null);
  const [autoSupplier, setAutoSupplier] = useState(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [confirming, setConfirming] = useState(false);

  const DUMMY_BIDS = [];
  const DUMMY_SUPPLIERS = [];
  const DUMMY_SUPERVISORS = [];

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
          className="bg-slate-800/90 text-white rounded-xl border border-slate-700/50 shadow-xl p-6 max-w-2xl w-full relative overflow-y-auto max-h-[90vh]"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
        >
          <button className="absolute top-4 right-4 text-slate-400 hover:text-red-400" onClick={onClose}><XCircle size={24} /></button>
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
  const { hardcodedProjects } = useContext(ProjectContext);
  const [dynamicProjects, setDynamicProjects] = useState([]);
  const [modalProject, setModalProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null); // For full page bids view
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAssign = ({ contractor, supplier, supervisor }) => {
    if (modalProject) {
      setDynamicProjects(prev =>
        prev.map(p =>
          p.id === modalProject.id
            ? { ...p, status: "Ongoing", contractor, supplier, supervisor }
            : p
        )
      );
    }
    setModalProject(null);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project); // Show full page bids view instead of modal
  };

  const handleBackToProjects = () => {
    setSelectedProject(null); // Return to projects list
  };

  const handleProjectUpdate = (updatedProject) => {
    setDynamicProjects(prev =>
      prev.map(p =>
        p.id === updatedProject.id ? updatedProject : p
      )
    );
    setSelectedProject(updatedProject); // Update the selected project as well
  };

  const handleDeleteProject = async (projectId) => {
      try {
      await deleteProjectById(projectId);
      setDynamicProjects(prev => prev.filter(p => p.id !== projectId));
      } catch (err) {
      console.error("Failed to delete project", err);
      }
    };
  
  const userData = JSON.parse(Cookies.get("userData"));

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projects = await getMyProjects(userData.id);
        console.log("projects", projects);
        setDynamicProjects(projects);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // If a project is selected, show the full page bids view
  if (selectedProject) {
    return (
      <ProjectBidsView 
        project={selectedProject} 
        onBack={handleBackToProjects}
        onProjectUpdate={handleProjectUpdate}
      />
    );
  }

  // Otherwise show the projects list
  return (
    <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 font-sans text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cyan-400">All My Projects</h2>
      </div>

      {loading && (
        <div className="text-center text-slate-400 py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          Loading projects...
        </div>
      )}

      {error && (
        <div className="text-center text-red-400 py-12">
          Failed to load projects: {error.message || String(error)}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {dynamicProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleProjectClick}
              onDelete={handleDeleteProject}
            />
          ))}
          {hardcodedProjects.length + dynamicProjects.length === 0 && (
            <div className="col-span-full text-center text-slate-400 py-12">
              No projects found.
            </div>
          )}
        </div>
      )}

      {modalProject && (
        <OnBiddingModal
          project={modalProject}
          onClose={() => setModalProject(null)}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
}

