import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ProjectDetailsPopup from './BiddingDetailsCard';
import Cookies from "js-cookie";
import {
  Shield,
  Home,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  Clock,
  CheckCircle,
  Activity,
  DollarSign,
  User,
  X,
  ArchiveRestore,
  UserCircle,
  LogOut,
  VerifiedIcon,
  Eye,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../services/authService';

const SupervisorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [data,setData] = useState(null) 
    console.log("data:",(data));
    useEffect(() => {
      setData(JSON.parse(Cookies.get("userData")))
    }, []);

  // Update active tab based on URL
  useEffect(() => {
    const path = location.pathname.split('/').pop() || '';
    const tabMap = {
      '': 'overview',
      'assignedproject': 'projects',
      'supplierverification': 'supplier',
      'reviewupdates': 'updates',
      'fundrequestsreview': 'fund',
      'requesthistory': 'history',
      'communication': 'communication',
      'profile': 'profile',
      'settings': 'settings'
    };
    setActiveTab(tabMap[path] || 'overview');
  }, [location]);

  const setActiveTabState = (tab) => {
    setActiveTab(tab);
  };

  const [showMaterials, setShowMaterials] = useState(false);
  const fundReq = useSelector(state => state.supervisorDashboard.fundReq);
  const submittedUpdates = useSelector(state => state.supervisorDashboard.submittedUpdates);
  const currentProject = useSelector(state => state.supervisorDashboard.allotedProject);

  const parseDate = (str) => {
    const [day, month, year] = str.split('/');
    return new Date(`${year}-${month}-${day}`);
  };


  const executionStats = [
    { title: 'Allocated Project', value: currentProject.length, icon: CheckCircle, color: 'from-emerald-400 to-cyan-400' },
    { title: 'Project Progress', value: useSelector(state => state.supervisorDashboard.allotedProject?.progress || 0) + "%", icon: TrendingUp, color: 'from-yellow-400 to-orange-400' },
    { title: 'Updates Submitted', value: useSelector(state => state.supervisorDashboard?.submittedUpdates || [])?.length || "0", icon: FileText, color: 'from-green-400 to-emerald-400' },
    { title: 'Days Remaining', value: (Math.ceil((parseDate(useSelector(state => state.supervisorDashboard.allotedProject?.endDate || "0")) - parseDate(useSelector(state => state.supervisorDashboard.allotedProject?.startDate || "0"))) / (1000 * 60 * 60 * 24))), icon: Clock, color: 'from-purple-400 to-pink-400' },
  ];

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

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const ViewMaterialsPopup = ({ isOpen, onClose }) => {
    const project = useSelector(state => state.supervisorDashboard.allotedProject);

    if (!isOpen || !project) return null;

    const renderDocs = (label, docs) => (
      <div className="mb-4">
        <h4 className="text-white font-semibold mb-2">{label}</h4>
        <ul className="text-sm text-slate-300 list-disc pl-5 space-y-1">
          {docs.map((doc, index) => (
            <li key={index}>
              {doc.name} <span className="text-slate-400">({doc.type}, {doc.size})</span>
            </li>
          ))}
        </ul>
      </div>
    );

    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-slate-800 p-6 rounded-xl w-full max-w-3xl overflow-y-auto max-h-[90vh] border border-slate-600 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Project Materials</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-red-400 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <h4 className="text-white font-semibold mb-2">Required Materials</h4>
            <ul className="text-sm text-slate-300 list-disc pl-5 space-y-1">
              {project.requiredMaterials.map((mat, i) => (
                <li key={i}>{mat}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-white font-semibold mb-2">Estimated Quantities</h4>
            <ul className="text-sm text-slate-300 list-disc pl-5 space-y-1">
              {project.estimatedQuantities.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>

          {/* Documents */}
          <div className="space-y-4">
            {Object.entries(project.documents).map(([section, docs]) =>
              renderDocs(section.charAt(0).toUpperCase() + section.slice(1), docs)
            )}
          </div>
        </div>
      </div>
    );
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
                    <p className="text-sm font-medium text-white">{data?.username }</p>
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
      <div className="flex-1 overflow-auto ">
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">Overview</h2>
              <p className="text-slate-400 mt-1">
                Summary of assigned project, budget, progress, timelines
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

        {/* Stats Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {executionStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
                  <p className="text-slate-400 text-sm">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Project */}
            <div className="lg:col-span-2 bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Project Overview</h3>
              </div>

              <div className="bg-slate-700/30 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-lg">{currentProject.name}</h4>
                      <p className="text-sm text-slate-400">Contractor: {currentProject.contractor}</p>
                      <span className="text-sm text-emerald-400">Current Phase: {currentProject.currentPhase}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-600/30 rounded-lg p-3">
                    <p className="text-xs text-slate-400">Start Date</p>
                    <p className="text-sm font-medium text-white">{useParsedStartDate(currentProject.startDate)}</p>
                  </div>
                  <div className="bg-slate-600/30 rounded-lg p-3">
                    <p className="text-xs text-slate-400">End Date</p>
                    <p className="text-sm font-medium text-white">{useParsedStartDate(currentProject.endDate)}</p>
                  </div>
                </div>

                {currentProject.issues && currentProject.issues.trim() !== "" && (
                  <div className="mb-4">
                    <span className="text-lg text-red-400">Issues: {currentProject.issues}</span>
                  </div>
                )}

                <div className="w-full bg-slate-600 rounded-full h-3 mb-3">
                  <div
                    className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${currentProject.progress}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-300">{currentProject.progress}% Complete</span>
                  <span className="text-sm text-emerald-400">Next: {currentProject.nextPhase}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    className="bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium rounded-lg transition-all shadow-lg shadow-emerald-500/20"
                    onClick={() => navigate("/reviewUpdates")}
                  >
                    View Updates
                  </button>
                  <button
                    className="bg-slate-600/30 hover:bg-slate-600/50 text-slate-300 px-4 py-2 rounded-lg transition-colors"
                    onClick={() => setShowMaterials(true)}
                  >
                    View Materials
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activities</h3>

              {/* Recent Fund Requests */}
              <div className="mb-6">
                <h4 className="text-white font-semibold mb-2">Recent Fund Requests</h4>
                {fundReq.length > 0 ? (
                  fundReq
                    .filter(req => req.status === 'pending')
                    .slice(-2) // Show only the last 2 pending requests
                    .map((req) => (
                      <div key={req.id} className="bg-slate-700/30 rounded-lg p-3 mb-2">
                        <p className="text-sm text-slate-300">Req ID: {req.id} - ₹{req.totalAmount.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">Submitted: {new Date(req.submissionDate).toLocaleString()}</p>
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-slate-400">No recent fund requests.</p>
                )}
                <button
                  className="w-full bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium rounded-lg py-2 mt-2 transition-all shadow-lg shadow-emerald-500/20"
                  onClick={() => navigate('/fundrequestsReview')}
                >
                  View All Fund Requests
                </button>
              </div>

              {/* Recent Updates */}
              <div>
                <h4 className="text-white font-semibold mb-2">Recent Updates</h4>
                {submittedUpdates?.length > 0 ? (
                  submittedUpdates
                    .slice(-2) // Show only the last 2 updates
                    .map((update, index) => (
                      <div key={index} className="bg-slate-700/30 rounded-lg p-3 mb-2">
                        <p className="text-sm text-slate-300">{update.title || `Update ${index + 1}`}</p>
                        <p className="text-xs text-slate-400">Submitted: {new Date(update.date).toLocaleString()}</p>
                      </div>
                    ))
                ) : (
                  <p className="text-sm text-slate-400">No recent updates.</p>
                )}
                <button
                  className="w-full bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium rounded-lg py-2 mt-2 transition-all shadow-lg shadow-emerald-500/20"
                  onClick={() => navigate('/reviewUpdates')}
                >
                  View All Updates
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mt-6">
                <h4 className="text-white font-semibold mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <button
                    className="w-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg py-2 transition-colors"
                    onClick={() => navigate('/fundrequestsReview')}
                  >
                    Review Pending Funds
                  </button>
                  <button
                    className="w-full bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 rounded-lg py-2 transition-colors"
                    onClick={() => navigate('/reviewUpdates')}
                  >
                    Check Updates
                  </button>
                  <button
                    className="w-full bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg py-2 transition-colors"
                    onClick={() => navigate('/communication')}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Materials Popup */}
      {showMaterials && <ViewMaterialsPopup isOpen={true} onClose={() => setShowMaterials(false)} />}
    </div>
  );
};

export default SupervisorDashboard;