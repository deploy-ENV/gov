import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { uploadDocument } from '../../services/documentService';
import {
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Clock,
  Upload,
  CheckCircle,
  AlertTriangle,
  Building,
  User,
  PenTool,
  Paperclip,
  Send,
  X,
  File,
  Trash2
} from 'lucide-react';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
const BiddingFormCard = ({ projectId, show, onClose }) => {
  const [formData, setFormData] = useState({
    projectTime: '',
    budget: '',
    workers: '',
    workPlan: '',
    experience: '',
    // Technical Documents
    enlistment: null,
    epf: null,
    gst: null,
    companyDocs: null,
    demandDraft: null,
    application: null,
    // Financial Documents
    boq: null
  });
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data,setData] = useState(null) 
    useEffect(() => {
      setData(JSON.parse(Cookies.get("userData")))
    }, []);
  const contractorId = data?.id;
  const contractorName = data?.username;
  console.log("contractorId",data);

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

    if (show) {
      fetchProject();
    }
  }, [projectId, show]);
  console.log("projectData",projectData);
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleFileRemove = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: null
    }));
  };

  // File Upload Component
  const FileUploadField = ({ label, field, required = false, accept = "*/*" }) => {
    const file = formData[field];
    
    return (
      <div>
        <label className="text-sm font-medium text-white flex gap-2">
          <Upload className="w-4 h-4 text-emerald-400" />
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        
        {!file ? (
          <div className="mt-2">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-600 border-dashed rounded-lg cursor-pointer bg-slate-700/30 hover:bg-slate-700/50 transition">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-3 text-slate-400" />
                <p className="mb-2 text-sm text-slate-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-slate-500">PDF, DOC, DOCX, JPG, PNG (MAX. 10MB)</p>
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept={accept}
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile) {
                     uploadDocument(e.target.files[0],"Contractor",projectId,label,contractorId,"Contractor");
                  }
                }}
              />
            </label>
          </div>
        ) : (
          <div className="mt-2 bg-slate-700/50 border border-slate-600 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-sm font-medium text-white">{file.name}</p>
                  <p className="text-xs text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleFileRemove(field)}
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-600/50 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Conditional returns after all hooks
  if (!show) return null;
  
  // Show loading state while fetching project data
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
          <div className="text-white text-center">Loading project details...</div>
        </div>
      </div>
    );
  }
  
  if (!projectData) return null;

  console.log(projectData);

  const handleSubmit = async () => {
    try {
      // Create FormData for file uploads
      const submitData = {
        projectId: projectData.id,
        contractorId: contractorId,
        contractorName: contractorName,
        bidAmount: formData.budget,
        timelineEstimate: formData.projectTime,
        // workers: formData.workers,
        materialsPlan: formData.workPlan,
        proposalText: formData.experience
      };
      
      // Add basic form data
      // submitData.append('projectId', projectData.id);
      // submitData.append('contractorId', contractorId);
      // submitData.append('contractorName', contractorName);
      // submitData.append('bidAmount', Number(formData.budget));
      // submitData.append('timelineEstimate', formData.projectTime);
      // // submitData.append('workers', Number(formData.workers));
      // submitData.append('materialsPlan', formData.workPlan);
      // submitData.append('proposalText', formData.experience);
      console.log(submitData);
      
      
      // Add file uploads
      // const fileFields = ['enlistment', 'epf', 'gst', 'companyDocs', 'demandDraft', 'application', 'boq'];
      // fileFields.forEach(field => {
      //   if (formData[field]) {
      //     submitData.append(field, formData[field]);
      //   }
      // });

      const response = await api.post('/bids', submitData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Bid submitted successfully:', response.data);
      onClose();
    } catch (error) {
      console.error('Error submitting bid:', error);
      alert('Bid submission failed. Please check your input.');
    }
  };

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
            Bidding Form
          </h1>
          <p className="text-slate-400">Submit your bid for this project</p>
        </div>

        {/* Project Info Card */}
        <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Project Information</h3>
              <p className="text-sm text-slate-400">Auto-filled from selected project</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase">Title</span>
              </div>
              <p className="text-sm font-medium text-white">{projectData.title}</p>
            </div>
           
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase">Department</span>
              </div>
              <p className="text-sm font-medium text-white">{projectData.departmentId}</p>
            </div>
             <div className="bg-slate-700/30 rounded-lg p-4 col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase">Location</span>
              </div>
              <div className="bg-slate-600/30 rounded-lg p-4">
                                  
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
          </div>
        </div>

        {/* Bidding Form */}
        <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50 space-y-6">
          {/* Basic Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Time */}
            <div>
              <label className="text-sm font-medium text-white flex gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                Estimated Project Time <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3 placeholder-slate-400"
                placeholder="e.g., 3 months or 45 days"
                value={formData.projectTime}
                onChange={(e) => handleInputChange('projectTime', e.target.value)}
              />
            </div>

            {/* Budget */}
            <div>
              <label className="text-sm font-medium text-white flex gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                Estimated Budget <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3 placeholder-slate-400"
                placeholder="Enter your bid amount"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
              />
            </div>
          </div>

          {/* Workers */}
          <div>
            <label className="text-sm font-medium text-white flex gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              Number of Workers <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3 placeholder-slate-400"
              placeholder="e.g., 15"
              value={formData.workers}
              onChange={(e) => handleInputChange('workers', e.target.value)}
            />
          </div>

          {/* Work Plan */}
          <div>
            <label className="text-sm font-medium text-white flex gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Work Plan Description <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={4}
              className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3 placeholder-slate-400"
              placeholder="Describe your work plan..."
              value={formData.workPlan}
              onChange={(e) => handleInputChange('workPlan', e.target.value)}
            />
          </div>

          {/* Experience */}
          <div>
            <label className="text-sm font-medium text-white flex gap-2">
              <User className="w-4 h-4 text-emerald-400" />
              Experience Justification <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={3}
              className="mt-2 w-full bg-slate-700/50 border border-slate-600 rounded-lg text-white px-4 py-3 placeholder-slate-400"
              placeholder="Briefly describe similar work done"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
            />
          </div>

          {/* Technical Documents Section */}
          <div className="bg-slate-700/20 rounded-xl p-6 border border-slate-600/30">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Technical Documents</h3>
                <p className="text-sm text-slate-400">Upload required technical documentation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUploadField 
                label="Enlistment Certificate" 
                field="enlistment" 
                required={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <FileUploadField 
                label="EPF Registration" 
                field="epf" 
                required={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <FileUploadField 
                label="GST Certificate" 
                field="gst" 
                required={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <FileUploadField 
                label="Company Related Documents" 
                field="companyDocs" 
                required={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <FileUploadField 
                label="Demand Draft" 
                field="demandDraft" 
                required={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <FileUploadField 
                label="Application Form" 
                field="application" 
                required={true}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
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
                <p className="text-sm text-slate-400">Upload financial documentation</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <FileUploadField 
                label="Bill of Quantities (BOQ)" 
                field="boq" 
                required={true}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-semibold py-3 px-6 rounded-lg hover:from-emerald-500 hover:to-cyan-500 transition"
            >
              <Send className="inline-block mr-2 w-5 h-5" />
              Submit Bid
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600/50 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiddingFormCard;