import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Shield,
  Home,
  FileText,
  Activity,
  DollarSign,
  Users,
  Settings,
  Bell,
  Search,
  ChevronDown,
  User,
  UserCircle,
  LogOut,
  CheckCircle,
  XCircle,
  Eye,
  Calculator,
  ArrowRight,
  ChevronUp,
  VerifiedIcon,
  ChevronDown as ChevronDownIcon,
  ArchiveRestore,
} from 'lucide-react';
import {
  setFundReq,
} from './supervisorDashboardSlice';
import { logout } from '../../services/authService';

const RequestFundReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab,setActiveTab] = useState('fund');
  const fundReq = useSelector(state => state.supervisorDashboard.fundReq);
  
  const [expandedReq, setExpandedReq] = useState(null);

  

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'sent to project manager': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-slate-400 bg-slate-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Eye className="w-4 h-4" />;
      case 'sent to project manager': return <Eye className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleFundAction = (id, action) => {
    const updatedReq = fundReq.map(req =>
      req.id === id ? { ...req, status: action === 'sent to project manager' ? 'sent to project manager' : 'rejected' } : req
    );
    dispatch(setFundReq(updatedReq));
    alert(`Fund request ${action === 'sent to project manager' ? 'sent to project manager' : 'rejected'}. It will be sent to the PM for ${action === 'sent to project manager' ? 'disbursement' : 'further action'}.`);
  };

  const toggleDetails = (id) => {
    setExpandedReq(expandedReq === id ? null : id);
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
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link to={`/dashboard/supervisor/${item.path}`} key={item.id}>
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
              <p className="text-sm font-medium text-white">Supervisor</p>
              <p className="text-xs text-slate-400">supervisor@secureportal.com</p>
            </div>
            <ChevronDownIcon className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
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
              <h2 className="text-2xl font-bold text-cyan-400">Fund Requests</h2>
              <p className="text-slate-400 mt-1">Review and manage contractor fund requests</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search requests..."
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

        {/* Content */}
        <div className="p-6">
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Pending Fund Requests</h3>
            </div>

            {fundReq.length > 0 ? (
              fundReq.map((req) => (
                (req.status === 'pending'||req.status ==='sent to project manager') && (
                  <div key={req.id} className="mb-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-white font-medium">Request ID: {req.id}</p>
                        <p className="text-slate-400 text-sm">Submitted: {new Date(req.submissionDate).toLocaleString()}</p>
                      </div>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(req.status)}`}>
                        {getStatusIcon(req.status)}
                        <span className="capitalize">{req.status}</span>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-2">Total Amount: ₹{req.totalAmount.toLocaleString()}</p>
                    {expandedReq === req.id ? (
                      <div>
                        <button
                          onClick={() => toggleDetails(req.id)}
                          className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors ml-2"
                        >
                          <ChevronUp className="w-4 h-4" />
                          Hide Details
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleDetails(req.id)}
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <ChevronDownIcon className="w-4 h-4" />
                        Show Details
                      </button>
                    )}
                    {expandedReq === req.id && (
                      <div className="mt-4 space-y-4">
                        {/* Task Breakdown */}
                        <div>
                          <h4 className="text-white font-medium mb-2">Task Breakdown</h4>
                          {req.tasks.length > 0 ? (
                            <div className="space-y-2">
                              {req.tasks.map((task) => (
                                <div key={task.id} className="flex items-center justify-between p-2 bg-slate-600/20 rounded">
                                  <p className="text-slate-300">{task.description}</p>
                                  <p className="text-emerald-400 font-medium">₹{task.amount.toLocaleString()}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-slate-400">No tasks specified.</p>
                          )}
                        </div>

                        {/* Labor Costs */}
                        <div>
                          <h4 className="text-white font-medium mb-2">Labor Costs</h4>
                          {req.laborCosts.length > 0 ? (
                            <div className="space-y-2">
                              {req.laborCosts.map((labor) => (
                                <div key={labor.id} className="flex items-center justify-between p-2 bg-slate-600/20 rounded">
                                  <p className="text-slate-300">{labor.role} ({labor.howMany} x {labor.days} days x ₹{labor.dailyRate}/day)</p>
                                  <p className="text-yellow-400 font-medium">₹{(labor.days * labor.dailyRate * labor.howMany).toLocaleString()}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-slate-400">No labor costs specified.</p>
                          )}
                        </div>

                        {/* Timeline */}
                        <div>
                          <h4 className="text-white font-medium mb-2">Timeline</h4>
                          {req.timeline.length > 0 ? (
                            <div className="space-y-2">
                              {req.timeline.map((phase) => (
                                <div key={phase.id} className="flex items-center justify-between p-2 bg-slate-600/20 rounded">
                                  <p className="text-slate-300">{phase.phase}</p>
                                  <p className="text-purple-400">{phase.startDate} to {phase.endDate}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-slate-400">No timeline specified.</p>
                          )}
                        </div>

                        {/* Notes */}
                        {req.notes && (
                          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/30">
                            <h4 className="text-white font-medium mb-2">Notes</h4>
                            <p className="text-slate-300">{req.notes}</p>
                          </div>
                        )}

                        {/* Status and Actions */}
                        <div className="flex items-center justify-between">
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(req.status)}`}>
                            {getStatusIcon(req.status)}
                            <span className="capitalize">{req.status}</span>
                          </div>
                          {req.status === 'pending' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleFundAction(req.id, 'sent to project manager')}
                                className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Send to Project Manager
                              </button>
                              <button
                                onClick={() => handleFundAction(req.id, 'reject')}
                                className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                              >
                                <XCircle className="w-4 h-4" />
                                Reject
                              </button>
                            </div>
                          )}
                        </div>

                        
                      </div>
                    )}
                  </div>
                )
              ))
            ) : (
              <p className="text-slate-400">No pending fund requests.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestFundReview;