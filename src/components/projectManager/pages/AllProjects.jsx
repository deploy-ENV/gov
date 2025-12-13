import React, { useContext, useState, useEffect } from 'react';
import { Flag, XCircle, CheckCircle, User,Send , Truck, FileText, Eye, Calendar,Trash2 , DollarSign, Clock, Star, Award, ArrowLeft, Download, MapPin, Phone, Mail, Building, Trophy ,X ,Users ,Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectContext } from '../projectContext';
import Cookies from "js-cookie";
import ProjectDetailsViewer from './ProjectCard';

import { getMyProjects ,deleteProjectById,getNearestSupervisor,finalizeProjectTeam, getNearestSupplier } from '../../../services/projectService';
import { getBidsByProject } from '../../../services/bidService';


const STATUS_STYLES = {
  'BIDDING': 'bg-yellow-400/20 text-yellow-300 text-xs font-semibold rounded-md px-2 py-1',
  'IN_PROGRESS': 'bg-cyan-400/20 text-cyan-300 rounded-md px-2 py-1 text-xs font-semibold',
  'Completed': 'bg-emerald-400/20 text-emerald-300 rounded-md px-2 py-1 text-xs font-semibold',
  'Delayed': 'bg-red-400/20 text-red-300 rounded-md px-2 py-1 text-xs font-semibold',
};

function daysAgo(dateStr) {
  const created = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - created) / (1000 * 60 * 60 * 24));
  return diff === 0 ? 'Today' : `${diff} day${diff > 1 ? 's' : ''} ago`;
}

function ProjectCard({ project, onClick,onDelete,onViewDetails }) {
  const percentUsed = project.budgetTotal ? Math.round((project.budgetUsed / project.budgetTotal) * 100) : 0;
  
  return (
    <motion.div
      className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-3 border border-slate-700/50 shadow-md flex flex-col gap-2 cursor-pointer transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg group text-white"
      
      tabIndex={0}
      aria-label={`View details for project ${project.title}`}
    >
     
      <div className="relative h-32 w-full rounded-lg overflow-hidden bg-slate-700 mb-2"
      
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
        <div><span className="font-semibold text-white">Contractor:</span> {project.assignedContractorId || <span className="italic text-slate-500">Not Assigned</span>}</div>
        <div><span className="font-semibold text-white">Supervisor:</span> {project.assignedSupervisorId || <span className="italic text-slate-500">Not Assigned</span>}</div>
      </div>
      {/* <div className="mt-2">
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
      </div> */}
      <div className="flex gap-2 pt-2">
          <button 
            onClick={() => onViewDetails(project)}
            className="flex items-center gap-1 px-3 py-2 bg-cyan-500/15 text-cyan-300 rounded-lg hover:bg-cyan-500/25 transition-all text-xs font-medium border border-cyan-500/30 flex-1 justify-center"
          >
            <Eye size={14} />
            View Details
          </button>

          {project.status === 'BIDDING' && (
            <button 
              onClick={() => onClick(project)}
              className="flex items-center gap-1 px-3 py-2 bg-emerald-500/15 text-emerald-300 rounded-lg hover:bg-emerald-500/25 transition-all text-xs font-medium border border-emerald-500/30 flex-1 justify-center"
            >
              
              View Bids
            </button>
          )}
         
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



function SupplierCatalogModal({ supplier, onClose }) {
  // Use mock data for now, assume a real API call would populate this
  const catalog = supplier?.materialsSupplied; 

  console.log(supplier);
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded hover:bg-slate-700/50"
        >
          <X className="w-6 h-6 text-slate-400" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            {supplier.name}'s Material Catalog
          </h1>
          <p className="text-slate-400">Materials supplied by {supplier.category}</p>
        </div>

        {/* Catalog List */}
        <div className="max-h-96 overflow-y-auto pr-2 space-y-3">
          {catalog.length === 0 ? (
             <div className="text-center py-8 text-slate-500">No materials listed in catalog.</div>
          ) : (
            catalog.map(material => (
              <div 
                key={material} 
                className={`flex items-center justify-between p-4 rounded-lg transition-all bg-slate-700/40 border border-slate-600/50 hover:bg-slate-600/50 cursor-pointer`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-white">{material}</span>
                  
                </div>
               
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

// Supervisor & Suppliers Selection Modal
function SupervisorSelectionModal({ bid, project, onClose, onConfirm }) {
  const [step, setStep] = useState(1); // 1 for supervisor, 2 for suppliers
  const [selectedSupervisor, setSelectedSupervisor] = useState('');
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [confirming, setConfirming] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedCatalogSupplier, setSelectedCatalogSupplier] = useState(null);
  const zipcode = project?.location
  const contractorId = bid?.contractorId
  const projectId = bid?.projectId
  console.log(bid);
  console.log(selectedSuppliers);
  
  const handleFetch = async () => {
    try {
      const supervisorData = await getNearestSupervisor(zipcode);
      setSupervisors(supervisorData);
      // Fetch suppliers as well - replace with actual API call
      const dummySuppliers = await getNearestSupplier(zipcode);
      setSuppliers(dummySuppliers);
    } catch (err) {
      console.error(err.message || "Failed to fetch data");
    }
  };
  
  useEffect(() => {
    handleFetch();
  }, []);

  console.log(suppliers)

  const getSupplier = (id) => suppliers.find(s => s.id === id);
  const handleSupplierToggle = (supplierId) => {
    setSelectedSuppliers(prev =>
      prev.includes(supplierId)
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleViewCatalog = (e, supplier) => {
    e.stopPropagation(); // Stop the card's click event (toggle selection)
    setSelectedCatalogSupplier(supplier);
  };
  const handleFinalize = async () => {
    try {
      setConfirming(true);
      const data = await finalizeProjectTeam(projectId, contractorId, selectedSupervisor,selectedSuppliers);
      alert("✅ Project finalized successfully!");
      console.log("Response:", data);
    } catch (err) {
      alert("❌ Error finalizing project!");
      console.error(err);
    } finally {
      setConfirming(false);
      onClose();
    }
  };

  const contractorName = bid.contractorName || bid.contractor_name || 'Unknown Contractor';
  const bidAmount = bid.bidAmount || bid.bid_amount || bid.amount || 0;
  const selectedSupplierNames = suppliers
    .filter(s => selectedSuppliers.includes(s.id))
    .map(s => s.name);

  return (
    <>
    
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
            {step === 1 ? 'Assign Supervisor' : 'Select Suppliers'}
          </h1>
          <p className="text-slate-400">
            {step === 1 
              ? 'Complete the project assignment process' 
              : 'Choose suppliers for the project'}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-6">
          <div className={`flex-1 h-2 rounded-full transition-all ${step === 1 ? 'bg-emerald-400' : 'bg-slate-600'}`}></div>
          <div className={`flex-1 h-2 rounded-full transition-all ${step === 2 ? 'bg-emerald-400' : 'bg-slate-600'}`}></div>
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

        {/* Step 1: Supervisor Selection */}
        {step === 1 && (
          <div className="mb-6">
            <label className="text-sm font-medium text-white flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-emerald-400" />
              Select Project Supervisor
            </label>
            
            {supervisors.length === 0 ? (
              <div className="text-center py-8 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <User className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <p className="text-slate-400">No supervisors available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
                {supervisors.map(supervisor => (
                  <div
                    key={supervisor.id}
                    onClick={() => setSelectedSupervisor(supervisor.id)}
                    className={`
                      relative bg-slate-700/40 rounded-lg p-4 border-2 cursor-pointer transition-all
                      ${selectedSupervisor === supervisor.id 
                        ? 'border-emerald-400 bg-emerald-400/10 shadow-lg shadow-emerald-400/20' 
                        : 'border-slate-600/50 hover:border-cyan-400/50 hover:bg-slate-700/60'
                      }
                    `}
                  >
                    {/* Selection Indicator */}
                    {selectedSupervisor === supervisor.id && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                      </div>
                    )}
                    
                    {/* Supervisor Avatar */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{supervisor.username}</h4>
                        <p className="text-xs text-slate-400">Supervisor ID: {supervisor.id}</p>
                      </div>
                    </div>
                    
                    {/* Additional Info */}
                    <div className="space-y-2 text-xs">
                      {supervisor.email && (
                        <div className="flex items-center gap-2 text-slate-300">
                          <Mail className="w-3 h-3 text-cyan-400" />
                          <span className="truncate">{supervisor.email}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-slate-300">
                        <Award className="w-3 h-3 text-purple-400" />
                        <span>{supervisor.experience || 0} years experience</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Suppliers Selection */}
        {step === 2 && (
          <div className="mb-6">
            <label className="text-sm font-medium text-white flex items-center gap-2 mb-4">
              <Truck className="w-4 h-4 text-emerald-400" />
              Select Suppliers (You can select multiple)
            </label>
            
            {suppliers.length === 0 ? (
              <div className="text-center py-8 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <Truck className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <p className="text-slate-400">No suppliers available</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {suppliers.map(supplier => (
                  <div
                    key={supplier.id}
                    onClick={() => handleSupplierToggle(supplier.id)}
                    className={`
                      relative bg-slate-700/40 rounded-lg p-4 border-2 cursor-pointer transition-all
                      ${selectedSuppliers.includes(supplier.id)
                        ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20' 
                        : 'border-slate-600/50 hover:border-cyan-400/50 hover:bg-slate-700/60'
                      }
                    `}
                  >
                    {/* Selection Indicator */}
                    <div className="absolute top-3 right-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        selectedSuppliers.includes(supplier.id)
                          ? 'bg-cyan-400 border-cyan-400'
                          : 'border-slate-400'
                      }`}>
                        {selectedSuppliers.includes(supplier.id) && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                    
                    {/* Supplier Info */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                        <Truck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{supplier.name}</h4>
                        <p className="text-xs text-slate-400">{supplier.category}</p>
                      </div>
                    </div>
                    
                    {/* Additional Info */}
                    <div className="flex gap-2 items-center text-xs mt-2">
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star size={12} fill="currentColor" />
                        {supplier.rating}
                      </div>
                      <div className="flex items-center gap-1 text-slate-300">
                        <Phone size={12} />
                        {supplier.phone}
                      </div>
                      <button
                          onClick={(e) => handleViewCatalog(e, supplier)}
                          className="flex items-center gap-1 px-2 py-1 bg-purple-500/15 text-purple-300 rounded hover:bg-purple-500/25 transition-all text-xs font-medium border border-purple-500/30"
                        >
                          <Eye size={12} />
                          View Catalog
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Selected Suppliers Summary */}
            {selectedSuppliers.length > 0 && (
              <div className="mt-4 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                <p className="text-xs text-cyan-300 font-medium mb-2">Selected Suppliers: {selectedSuppliers.length}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSupplierNames.map(name => (
                    <span key={name} className="inline-block bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded text-xs">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4">
          {step === 2 && (
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition"
            >
              Back
            </button>
          )}
          
          {step === 1 ? (
            <button
              onClick={() => setStep(2)}
              disabled={!selectedSupervisor || confirming}
              className="flex-1 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold py-3 px-6 rounded-lg hover:from-emerald-500 hover:to-cyan-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {confirming ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Next: Select Suppliers
                </>
              )}
            </button>
          ) : (
            <button 
              onClick={handleFinalize}
              disabled={selectedSuppliers.length === 0 || confirming}
              className="flex-1 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold py-3 px-6 rounded-lg hover:from-emerald-500 hover:to-cyan-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {confirming ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                  Finalizing...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Finalize Assignment
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
    {selectedCatalogSupplier && (
        <SupplierCatalogModal
          supplier={selectedCatalogSupplier}
          onClose={() => setSelectedCatalogSupplier(null)}
        />
      )}
    </>
  );
}


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

        {/* Contractor Info Card */}
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

        {/* Bid Form */}
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

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition"
            >
              Close
            </button>
            
            {project.status === 'On Bidding' && (
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

          {project.status === 'BIDDING' && (
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
        setBids([]);
      }
    } catch (err) {
      console.error('Error fetching bids:', err);
      setError('Failed to load bids. Please try again.');
      setBids([]);
    } finally {
      setLoading(false);
    }
  };

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
    setSelectedBid(null);
    setShowSupervisorModal(true);
  };

  const handleSupervisorAssignment = () => {
    const updatedProject = {
      ...project,
      status: 'Ongoing',
      contractor: acceptingBid.contractorName,
      budgetUsed: acceptingBid.bidAmount
    };

    if (onProjectUpdate) {
      onProjectUpdate(updatedProject);
    }

    setShowSupervisorModal(false);
    setAcceptingBid(null);
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

      {/* Supervisor & Suppliers Selection Modal */}
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

export default function AllProjects() {
  const { hardcodedProjects } = useContext(ProjectContext);
  const [dynamicProjects, setDynamicProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewProjectDetails, setViewProjectDetails] = useState(false);
  const [viewProjectBids, setViewProjectBids] = useState(false); 
  const [viewBidDetails, setViewBidDetails] = useState(false);
  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setViewProjectDetails(false);
    setViewProjectBids(true);
  };

  const handleViewBids = (project) => {
    setSelectedProject(project);
    setViewProjectBids(true);
    setViewProjectDetails(false);
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setViewProjectDetails(false);
    setViewProjectBids(false);
  };

  const handleProjectUpdate = (updatedProject) => {
    setDynamicProjects(prev =>
      prev.map(p =>
        p.id === updatedProject.id ? updatedProject : p
      )
    );
    setSelectedProject(updatedProject);
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setViewProjectDetails(!viewProjectDetails);
  }
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
        setDynamicProjects(projects);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if(selectedProject && viewBidDetails) {
    return (
      <BidDetailsModal
        bid={selectedBid}
        project={selectedProject}
        onClose={() => setSelectedBid(null)}
        onAcceptBid={handleAcceptBid}
      />
    )
  }

  if (selectedProject && viewProjectBids) {
    return (
      <ProjectBidsView 
        project={selectedProject} 
        onBack={handleBackToProjects}
        onProjectUpdate={handleProjectUpdate}
      />
    );
  }

  if (selectedProject && viewProjectDetails) {
    return (
      <ProjectDetailsViewer 
        projectData={selectedProject} 
        onBack={handleBackToProjects} 
        onViewBids={() => handleViewBids(selectedProject)} 
      />
    );
  }

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
              onClick={handleViewBids}
              onDelete={handleDeleteProject}
              onViewDetails={handleViewDetails}
            />
          ))}
          {(hardcodedProjects.length + dynamicProjects.length) === 0 && (
            <div className="col-span-full text-center text-slate-400 py-12">
              No projects found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}