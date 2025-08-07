import React, { useState,useEffect } from 'react';
import {
  Calendar,
  Clock,
  Camera,
  Package,
  CheckSquare,
  MessageSquare,
  Upload,
  Save,
  Send,
  Plus,
  X,
  FileText,
  Activity,
  AlertCircle,
  CheckCircle,
  User,
  Settings,
  Home,
  Users,
  BarChart3,
  DollarSign,
  Shield,
  Bell,
  Search,
  ChevronDown,
  UserCircle,
  LogOut,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  setSubmittedUpdates,
  setActiveTab,
  recalculateDashMode,
} from './dashboardSlice';

const Updates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  
  const activeTab = useSelector(state => state.projectsDashboard.activeTab);
  const [updateType, setUpdateType] = useState('daily');
  const dashboardMode = useSelector(state => state.projectsDashboard.dashMode)
      useEffect(() => {
        dispatch(recalculateDashMode())
          if (dashboardMode === 'bidding') {
            navigate('/'); 
          }
      }, [dashboardMode, navigate]);
  const [formData, setFormData] = useState({
    workDone: '',
    hoursWorked: '',
    materialUsage: [{ material: '', quantity: '', unit: 'kg' }],
    photos: [],
    checklist: [],
    comments: ''
  });

  const { submittedUpdates } = useSelector(state => state.projectsDashboard);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home, link: "/" },
    { id: 'projects', label: 'Available Projects', hidden: dashboardMode === 'execution', icon: FileText, link: "/availableprojects" },
    { id: 'updates', label: 'Updates', icon: Activity, hidden: dashboardMode === 'bidding', link: "/updates" },
    { id: 'expenses', label: 'Expenses', icon: BarChart3, hidden: dashboardMode === 'bidding', link: "/expenses" },
    { id: 'bids', label: 'My Bids', icon: DollarSign, hidden: dashboardMode === 'execution', link: "/bids" },
    { id: 'communication', label: 'Communication', hidden: dashboardMode === 'bidding', icon: Users, link: "/communication" },
    { id: 'fund', label: 'Request Fund', hidden: dashboardMode === 'bidding', icon: DollarSign, link: "/requestFund" },
    { id: 'settings', label: 'Settings', icon: Settings, link: "/settings" },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMaterialChange = (index, field, value) => {
    const newMaterials = [...formData.materialUsage];
    newMaterials[index][field] = value;
    setFormData(prev => ({
      ...prev,
      materialUsage: newMaterials
    }));
  };

  const addMaterial = () => {
    setFormData(prev => ({
      ...prev,
      materialUsage: [...prev.materialUsage, { material: '', quantity: '', unit: 'kg' }]
    }));
  };

  const removeMaterial = (index) => {
    setFormData(prev => ({
      ...prev,
      materialUsage: prev.materialUsage.filter((_, i) => i !== index)
    }));
  };

  const handleChecklistChange = (id, completed) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.map(item => 
        item.id === id ? { ...item, completed } : item
      )
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...files]
    }));
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSubmit = (isDraft = false) => {
    const newUpdate = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      type: updateType,
      workDone: formData.workDone,
      hoursWorked: formData.hoursWorked,
      status: isDraft ? 'draft' : 'pending',
      photos: formData.photos.length
    };
    const updatedSubmittedUpdates = [newUpdate, ...submittedUpdates];
    dispatch(setSubmittedUpdates(updatedSubmittedUpdates));
    
    setFormData({
      workDone: '',
      hoursWorked: '',
      materialUsage: [{ material: '', quantity: '', unit: 'kg' }],
      photos: [],
      checklist: formData.checklist.map(item => ({ ...item, completed: false })),
      comments: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-emerald-400 bg-emerald-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'draft': return 'text-slate-400 bg-slate-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'draft': return <FileText className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-screen font-sans bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      {/* <div className="w-72 bg-slate-800/60 backdrop-blur-xl border-r border-slate-700/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-yellow-500/5"></div>

        <div className="flex items-center gap-3 p-6 relative z-10">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-300 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-slate-900" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
            SecurePortal
          </h1>
        </div>

        <nav className="mt-4 px-4 relative z-10">
          {sidebarItems.filter(item => !item.hidden).map((item) => {
            const Icon = item.icon;
            return (
              <Link to={item.link} key={item.id}>
                <button
                  onClick={() => dispatch(setActiveTab(item.id))}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20'
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4 bg-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={toggleProfileDropdown}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-slate-900" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Contractor</p>
              <p className="text-xs text-slate-400">contractor@secureportal.com</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>
          {isProfileOpen && (
            <div className="mt-3 bg-slate-600/50 rounded-lg p-2">
              <Link to="/profile">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-500/50 rounded-md transition-colors">
                  <UserCircle className="w-4 h-4" />
                  Profile
                </button>
              </Link>
              <Link to="/logout">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-red-400/40 text-red-400/90 hover:bg-slate-500/50 rounded-md transition-colors">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div> */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">Updates</h2>
              <p className="text-slate-400 mt-1">Submit daily/weekly project updates</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search updates..."
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Update Form */}
            <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Submit Update</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUpdateType('daily')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      updateType === 'daily'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Daily
                  </button>
                  <button
                    onClick={() => setUpdateType('weekly')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      updateType === 'weekly'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    Weekly
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Work Done */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Work Done
                  </label>
                  <textarea
                    value={formData.workDone}
                    onChange={(e) => handleInputChange('workDone', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                    placeholder="Describe the work completed..."
                  />
                </div>

                {/* Hours Worked */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Hours Worked
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.hoursWorked}
                    onChange={(e) => handleInputChange('hoursWorked', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                    placeholder="8.0"
                  />
                </div>

                {/* Material Usage */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-slate-300">
                      Material Usage
                    </label>
                    <button
                      onClick={addMaterial}
                      className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Material
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.materialUsage.map((material, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <input
                          type="text"
                          value={material.material}
                          onChange={(e) => handleMaterialChange(index, 'material', e.target.value)}
                          className="flex-1 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                          placeholder="Material name"
                        />
                        <input
                          type="number"
                          value={material.quantity}
                          onChange={(e) => handleMaterialChange(index, 'quantity', e.target.value)}
                          className="w-24 px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                          placeholder="Qty"
                        />
                        <select
                          value={material.unit}
                          onChange={(e) => handleMaterialChange(index, 'unit', e.target.value)}
                          className="px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                        >
                          <option value="kg">kg</option>
                          <option value="m">m</option>
                          <option value="m²">m²</option>
                          <option value="m³">m³</option>
                          <option value="pcs">pcs</option>
                          <option value="bags">bags</option>
                        </select>
                        {formData.materialUsage.length > 1 && (
                          <button
                            onClick={() => removeMaterial(index)}
                            className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photos/Videos */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Photos/Videos
                  </label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Camera className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400">Click to upload photos/videos</p>
                    </label>
                  </div>
                  {formData.photos.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative bg-slate-700/50 rounded-lg p-2">
                          <span className="text-xs text-slate-300">{photo.name}</span>
                          <button
                            onClick={() => removePhoto(index)}
                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                          >
                            <X className="w-2 h-2 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Checklist */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Checklist
                  </label>
                  <div className="space-y-2">
                    {formData.checklist.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-2 bg-slate-700/30 rounded-lg">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={(e) => handleChecklistChange(item.id, e.target.checked)}
                          className="w-4 h-4 text-emerald-400 bg-slate-700 border-slate-600 rounded focus:ring-emerald-400/50"
                        />
                        <span className={`text-sm ${item.completed ? 'text-emerald-400' : 'text-slate-300'}`}>
                          {item.item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Optional Comments
                  </label>
                  <textarea
                    value={formData.comments}
                    onChange={(e) => handleInputChange('comments', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                    placeholder="Any additional comments or notes..."
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSubmit(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-600/50 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Draft
                  </button>
                  <button
                    onClick={() => handleSubmit(false)}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium  duration-500 rounded-lg shadow-lg shadow-em pilota-emerald-500/20 hover:from-emerald-600 hover:to-cyan-600 transition-colors"
                    disabled={formData.photos.length === 0 || formData.workDone.trim() === "" || formData.hoursWorked.trim() === ""}
                  >
                    <Send className="w-4 h-4" />
                    Submit Update
                  </button>
                </div>
              </div>
            </div>

            {/* Previous Updates */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-6">Previous Updates</h3>
              <div className="space-y-4">
                {submittedUpdates.map((update) => (
                  <div key={update.id} className="bg-slate-700/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">{update.date}</span>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(update.status)}`}>
                        {getStatusIcon(update.status)}
                        <span className="capitalize">{update.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-white mb-2">{update.workDone}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {update.hoursWorked}h
                      </span>
                      <span className="flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        {update.photos} photos
                      </span>
                      <span className="capitalize">{update.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updates;