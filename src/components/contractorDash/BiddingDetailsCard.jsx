import React, { useState,useEffect  } from 'react';
import { useDispatch } from 'react-redux';
import { closeViewDetails, showBiddingForm } from './dashboardSlice';
import { 
  X, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  FileText, 
  Users, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Download,
  Eye,
  Building,
  Briefcase,
  Settings,
  Upload
} from 'lucide-react';
import api from '../../services/api';
import { div } from 'framer-motion/client';

const ProjectDetailsPopup = ({ isOpen, onClose, projectId,onInterested }) => {
  const dispatch = useDispatch();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeDocumentTab, setActiveDocumentTab] = useState('legal');
    // const [showBiddingForm,setShowBiddingForm] = useState(false)
    console.log(projectId);
    useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;
      
      setLoading(true);
      try {
        const response = await api.get(`/projects/${projectId}`);
        setProjectData(response.data);
      } catch (error) {
        console.error('Error fetching project details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchProject();
    }
  }, [projectId, isOpen]);

  if (!isOpen) return null;
  // if (loading) {
  // return (
  //   <div className="fixed inset-0 bg-black/50 flex items-center justify-center text-white text-lg">
  //     Loading project details...
  //   </div>
  // );
  // }
  console.log("projectdata",projectData);
  
  if (!projectData) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center text-red-400 text-lg">
        Failed to load project data.
      </div>
    );
  }
  
  
  console.log(projectData);
  

  const documentTabs = [
    { id: 'legal', label: 'Legal Papers', icon: Shield, color: 'text-emerald-400' },
    { id: 'blueprints', label: 'Blueprints', icon: FileText, color: 'text-cyan-400' },
    { id: 'boq', label: 'BOQ', icon: DollarSign, color: 'text-yellow-400' },
    { id: 'safety', label: 'Safety & Compliance', icon: AlertCircle, color: 'text-red-400' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="flex flex-col bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{projectData.name}</h2>
              <p className="text-slate-400">Project ID: #{projectData.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-8">
              {/* Basic Info */}
              <div className="bg-slate-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Basic Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-600/30 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">Department</p>
                    <p className="text-sm font-medium text-white">{projectData.departmentId}</p>
                  </div>
                  <div className="bg-slate-600/30 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">Location</p>
                    <div className='flex gap-2'>
                      <p className="text-sm font-medium text-green-300">Street:</p>
                      <p className="text-sm font-medium text-white">{projectData?.location?.street}</p>
                    </div>
                    <div className='flex gap-2'>
                      <p className="text-sm font-medium text-green-300">City:</p>
                      <p className="text-sm font-medium text-white">{projectData?.location?.city}</p>
                    </div>
                    <div className='flex gap-2'>
                      <p className="text-sm font-medium text-green-300">State:</p>
                      <p className="text-sm font-medium text-white">{projectData?.location?.state}</p>
                    </div>
                    <div className='flex gap-2'>
                      <p className="text-sm font-medium text-green-300">Country:</p>
                      <p className="text-sm font-medium text-white">{projectData?.location?.country}</p>
                    </div>
                    <div className='flex gap-2'>
                      <p className="text-sm font-medium text-green-300">ZipCode:</p>
                      <p className="text-sm font-medium text-white">{projectData?.location?.zipCode}</p>
                    </div>
                    
                    
                  </div>
                </div>
                
                <div className="bg-slate-600/30 rounded-lg p-4">
                  <p className="text-xs text-slate-400 mb-2">Project Description</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{projectData.description}</p>
                </div>
              </div>

              {/* Timeline & Budget */}
              <div className="bg-slate-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Timeline & Budget</h3>
                </div>
                <div className='mb-3 flex flex-col gap-4'>
                  {projectData.progressSteps.map((phase, index) => (
                    <div key={index} className="bg-slate-600/30 rounded-lg p-4">
                      <p className="text-xs text-slate-400 mb-1">Phase {index + 1}</p>
                      <p className="text-sm font-medium text-white">Title: {phase.title}</p>
                      <p className="text-sm font-medium text-white">Description: {phase.description}</p>
                      <p className="text-sm font-medium text-white">Due Date: {phase.dueDate}</p>
                     
                    </div>
                  ))

                  }
                </div>                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-600/30 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">Project Deadline</p>
                    <p className="text-sm font-medium text-white">{projectData.deadline}</p>
                  </div>
                  <div className="bg-slate-600/30 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">Expected Start Date</p>
                    <p className="text-sm font-medium text-white">{projectData.expectedStartDate}</p>
                  </div>
                  <div className="bg-slate-600/30 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">Bid Submission Deadline</p>
                    <p className="text-sm font-medium text-red-400">{projectData.bidSubmissionDeadline}</p>
                  </div>
                  <div className="bg-slate-600/30 rounded-lg p-4">
                    <p className="text-xs text-slate-400 mb-1">Total Budget</p>
                    <p className="text-sm font-medium text-emerald-400">{projectData.totalBudget}</p>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-slate-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Requirements</h3>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Contractor Requirements</h4>
                    <div className="space-y-2">
                     
                        <div  className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{projectData?.contractorRequirements}</span>
                        </div> 
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Required Materials</h4>
                    <div className="space-y-2">
                      {projectData?.requiredMaterials ?
                      <div>
                        {projectData?.requiredMaterials.map((material, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Settings className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{material}</span>
                        </div>
                      ))}
                      </div>
                      :
                      <div>
                        <span className='text-rose-500'>No Dta</span>
                      </div>
                      }
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-3">Estimated Quantities</h4>
                    <div className="space-y-2">
                      {projectData?.estimatedQuantities ?
                      <div>
                        {projectData?.estimatedQuantities.map((material, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Settings className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{material}</span>
                        </div>
                      ))}
                      </div>
                      :
                      <div>
                        <span className='text-rose-500'>No Dta</span>
                      </div>
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* ai supplier Information */}
              {/* <div className="bg-slate-700/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Additional Information</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${projectData.aiSupplierMatch ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                      <span className="text-sm text-slate-300">AI Supplier Match</span>
                    </div>
                    <span className={`text-sm ${projectData.aiSupplierMatch ? 'text-emerald-400' : 'text-red-400'}`}>
                      {projectData.aiSupplierMatch ? 'Available' : 'Not Available'}
                    </span>
                  </div>
                  
                  {projectData.comments && (
                    <div className="bg-slate-600/30 rounded-lg p-4">
                      <p className="text-xs text-slate-400 mb-2">Comments / Notes</p>
                      <p className="text-sm text-slate-300 leading-relaxed">{projectData.comments}</p>
                    </div>
                  )}
                </div>
              </div> */}
            </div>
          </div>

          {/* Documents Sidebar */}
          <div className="w-80 bg-slate-700/30 border-l border-slate-700/50 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-lg flex items-center justify-center">
                <Upload className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Document Uploads</h3>
            </div>

            {/* Document Tabs */}
            {/* <div className="space-y-1 mb-6">
              {documentTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDocumentTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                      activeDocumentTab === tab.id
                        ? 'bg-slate-600/50 text-white'
                        : 'text-slate-400 hover:bg-slate-600/30 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${tab.color}`} />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div> */}

            {/* Document List */}
            {/* <div className="space-y-2">
              {projectData.documents[activeDocumentTab]?.map((doc, index) => (
                <div key={index} className="bg-slate-600/30 rounded-lg p-3 hover:bg-slate-600/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white truncate">{doc.name}</span>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-slate-500/30 rounded">
                        <Eye className="w-3 h-3 text-slate-400" />
                      </button>
                      <button className="p-1 hover:bg-slate-500/30 rounded">
                        <Download className="w-3 h-3 text-slate-400" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{doc.type}</span>
                    <span className="text-xs text-slate-400">{doc.size}</span>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-300">{projectData.bidsCount} bids submitted</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400">{projectData.timeLeft} remaining</span>
              </div> */}
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-600/30 hover:bg-slate-600/50 text-slate-300 rounded-lg transition-colors"
              >
                Close
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 text-slate-900 font-medium rounded-lg transition-all"
              onClick={onInterested}
              >
                Interested To  Bid
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
  );
};



export default ProjectDetailsPopup;