import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from "js-cookie";
import {
  Shield,
  Home,
  FileText,
  Activity,
  VerifiedIcon,
  DollarSign,
  Users,
  Settings,
  Bell,
  Search,
  ChevronDown,
  User,
  UserCircle,
  LogOut,
  Download,
  ArchiveRestore,
  RefreshCcw,
  X,
  Save
} from 'lucide-react';
import { logout } from '../../services/authService';


const updateProjectPhase = (newPhase) => ({
  type: 'supervisorDashboard/updateProjectPhase',
  payload: newPhase
});

const AssignedProject = () => {
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [showChangePhase, setShowChangePhase] = useState(false);
  const [newPhase, setNewPhase] = useState('');
  const currentProject = useSelector(state => state.supervisorDashboard.allotedProject);
  const [data,setData] = useState(null) 
    // console.log("data:",(data));
    useEffect(() => {
      setData(JSON.parse(Cookies.get("userData")))
    }, []); 

  const parseDate = (str) => {
    const [day, month, year] = str.split('/');
    return new Date(`${year}-${month}-${day}`);
  };

  function useParsedStartDate(date) {
    if (!date) return null;

    try {
      const [day, month, year] = date.split('/');
      const newDate = new Date(`${year}-${month}-${day}`);
      const formattedDate = newDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      return String(formattedDate);
    } catch (e) {
      console.error("Invalid startDate format:", date);
      return null;
    }
  }

const daysRemaining = currentProject.length != 0 ? Math.ceil((parseDate(currentProject.endDate) - parseDate(currentProject.startDate)) / (1000 * 60 * 60 * 24)) : 0;

 const sidebarItems = [
     { id: 'overview', label: 'Overview', icon: Home, path: '', color: 'text-blue-600' },
     { id: 'projects', label: 'Assigned Project', icon: FileText, path: 'assignedproject', color: 'text-green-600' },
     { id: 'supplier', label: 'Supplier Verification', icon: VerifiedIcon, path: 'supplierverification', color: 'text-purple-600' },
     { id: 'updates', label: 'Updates', icon: Activity, path: 'reviewupdates', color: 'text-amber-600' },
     { id: 'fund', label: 'Fund Requests', icon: DollarSign, path: 'fundrequestsreview', color: 'text-cyan-600' },
     { id: 'history', label: 'Request History', icon: ArchiveRestore, path: 'requesthistory', color: 'text-indigo-600' },
     { id: 'communication', label: 'Communication', icon: Users, path: 'communication', color: 'text-pink-600' },
     { id: 'settings', label: 'Settings', icon: Settings, path: 'settings', color: 'text-gray-600' },
     
   ];

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  

  
  const handleDownload = (name, type) => {
    const url = '#'; 
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.${type}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

 console.log("currentProject:",currentProject);
  const handleSavePhase = async () => {
  if (newPhase.trim()) {
    try {
      dispatch(updateProjectPhase(newPhase));
      setShowChangePhase(false);
      setNewPhase('');
    } catch (error) {
      console.error('Failed to update phase:', error);
    }
  }
};
  
  const handleCancelPhase = () => {
    setShowChangePhase(false);
    setNewPhase('');
  };

  return (
    <div className="flex h-screen font-sans bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
            <div className="w-72 bg-slate-800/60 backdrop-blur-xl border-r border-slate-700/50 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-yellow-500/5"></div>
            
                    {/* Logo */}
                    <div className="flex items-center gap-3 p-6 relative z-10">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-300 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-slate-900" />
                      </div>
                      <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">
                        SecurePortal
                      </h1>
                    </div>
            
                    {/* Navigation */}
                    <nav className="mt-4 px-4 relative z-10">
                              {sidebarItems.filter(item => !item.hidden).map((item) => {
                                const Icon = item.icon;
                                return (
                                  <div key={item.id}>
                                    <Link to={`/dashboard/supervisor/${item.path}`}>
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
                                  </div>
                                );
                              })}
                        </nav>
            
                    {/* User Profile */}
                    <div className="absolute bottom-6 left-4 right-4 bg-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
                      <div 
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={toggleProfileDropdown}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-slate-900" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{data?.username}</p>
                          <p className="text-xs text-slate-400">{data?.email}</p>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                      </div>
                      {isProfileOpen && (
                        <div className="mt-3 bg-slate-600/50 rounded-lg p-2 flex flex-col gap-3">
                          <Link to="/profile">
                            <button 
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-500/50 rounded-md transition-colors"
                              onClick={() => dispatch(setActiveTab(""))}
                            >
                              <UserCircle className="w-4 h-4" />
                              Profile
                            </button>
                          </Link>
                          <Link >
                            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-red-400/40 text-red-400/90 hover:bg-slate-500/50 rounded-md transition-colors"
                            onClick={logout}
                            >
                              <LogOut className="w-4 h-4" />
                              Logout
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">Assigned Project</h2>
              <p className="text-slate-400 mt-1">
                Details of your current project assignment
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search materials, updates..."
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

        {/* Project Details */}
        <div className="p-6">
          {currentProject?.name ? (
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">{currentProject.name}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Project Details</h4>
                  <p className="text-sm text-slate-300 mb-2">{currentProject.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-slate-400">Department</p>
                      <p className="text-sm text-white">{currentProject.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Zone</p>
                      <p className="text-sm text-white">{currentProject.zone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Region</p>
                      <p className="text-sm text-white">{currentProject.region}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Budget</p>
                      <p className="text-sm text-emerald-400">{currentProject.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Start Date</p>
                      <p className="text-sm text-white">{useParsedStartDate(currentProject.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">End Date</p>
                      <p className="text-sm text-white">{useParsedStartDate(currentProject.endDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Days Remaining</p>
                      <p className="text-sm text-white">{daysRemaining}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Status</h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-slate-400">Current Phase</p>
                      <p className="text-sm text-emerald-400">{currentProject.currentPhase}</p>
                      {showChangePhase ? (
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="text"
                            value={newPhase}
                            onChange={(e) => setNewPhase(e.target.value)}
                            placeholder="Enter new phase"
                            className="flex-1 px-3 py-2 bg-slate-600/50 border border-slate-500 rounded-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-sm"
                          />
                          <button
                            onClick={handleSavePhase}
                            className="p-2 bg-emerald-400/15 text-emerald-400 hover:text-emerald-300 rounded-sm transition-colors"
                            disabled={!newPhase.trim()}
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleCancelPhase}
                            className="p-2 bg-red-400/15 text-red-400 hover:text-red-300 rounded-sm transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowChangePhase(true)}
                          className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 bg-emerald-400/15 p-2 rounded-sm mt-2"
                        >
                          <RefreshCcw className="w-4 h-4" /> Change Phase
                        </button>
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Next Phase</p>
                      <p className="text-sm text-emerald-400">{currentProject.nextPhase}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Contractor Requirements</p>
                      <ul className="text-sm text-slate-300 list-disc pl-5">
                        {currentProject?.contractorRequirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="mt-6 bg-slate-700/30 rounded-lg p-4">
                <h4 className="font-medium text-white mb-2">Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(currentProject.documents).map(([section, docs]) => (
                    <div key={section} className='divide-y p-4'>
                      <h5 className="text-sm font-semibold text-emerald-400 mb-2">{section.charAt(0).toUpperCase() + section.slice(1)}</h5>
                      <ul className="text-sm text-slate-300 space-y-2">
                        {docs.map((doc, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span>{doc.name} ({doc.type}, {doc.size})</span>
                            <button
                              onClick={() => handleDownload(doc.name, doc.type.split('/')[1] || 'pdf')}
                              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 bg-emerald-400/15 p-2 rounded-sm"
                            >
                              <Download className="w-4 h-4" /> Download
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-12 border border-slate-700/50 text-center">
              <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No Project Assigned</h3>
              <p className="text-slate-400">You don't have any project assigned yet. Check back later or contact your administrator.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignedProject;