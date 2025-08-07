import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  X, 
  Shield,
  Home,
  Users,
  Settings,
  Bell,
  Search,
  ChevronDown,
  BarChart3,
  DollarSign,
  Activity,
  User
} from 'lucide-react';
import {
  
  recalculateDashMode,
} from './dashboardSlice';
const MyBids = ({ onProjectSelect }) => {
  const [activeTab, setActiveTab] = useState('bids');
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  const dashboardMode = useSelector(state => state.projectsDashboard.dashMode)
  useEffect(() => {
    dispatch(recalculateDashMode())
      if (dashboardMode === 'execution') {
        navigate('/'); 
      }
  }, [dashboardMode, navigate]);
  const [bids, setBids] = useState([
   
  ]);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home, link: "/" },
    { id: 'projects', label: 'Available Projects', icon: FileText, link: "/availableprojects" },
    { id: 'bids', label: 'My Bids', icon: DollarSign, link: "/bids" },
    // { id: 'communication', label: 'Communication', icon: Users, link: "/communication" },
    { id: 'settings', label: 'Settings', icon: Settings, link: "/settings" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400';
      case 'under_review': return 'text-orange-400';
      case 'rejected': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getBidStatusBg = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-400/20';
      case 'under_review': return 'bg-orange-400/20';
      case 'rejected': return 'bg-red-400/20';
      default: return 'bg-gray-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'under_review': return <AlertTriangle className="w-4 h-4" />;
      case 'rejected': return <X className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleStartProject = (bid) => {
   
    const project = {
      id: bid.id,
      name: bid.projectName,
      status: 'in-progress',
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now
      supervisor: 'John Smith',
      nextMilestone: 'Project Kickoff Meeting',
      budget: bid.bidAmount,
      description: bid.description
    };
    
    if (onProjectSelect) {
      onProjectSelect(project);
    }
  };

  const deleteBid = (bidId) => {
    setBids(bids.filter(bid => bid.id !== bidId));
  };

  const getBidStats = () => {
    const total = bids.length;
    const accepted = bids.filter(bid => bid.status === 'accepted').length;
    const pending = bids.filter(bid => bid.status === 'pending').length;
    const underReview = bids.filter(bid => bid.status === 'under_review').length;
    const rejected = bids.filter(bid => bid.status === 'rejected').length;
    
    return { total, accepted, pending, underReview, rejected };
  };

  const stats = getBidStats();

  return (
    <div className="flex h-screen font-sans bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400 ">My Bids</h2>
              <p className="text-slate-400 mt-1">Track and manage your submitted project bids</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search bids..."
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
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-8 h-8 text-slate-400" />
                <span className="text-2xl font-bold text-white">{stats.total}</span>
              </div>
              <p className="text-slate-400 text-sm">Total Bids</p>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="w-8 h-8 text-green-400" />
                <span className="text-2xl font-bold text-green-400">{stats.accepted}</span>
              </div>
              <p className="text-slate-400 text-sm">Accepted</p>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-8 h-8 text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-400">{stats.pending}</span>
              </div>
              <p className="text-slate-400 text-sm">Pending</p>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-8 h-8 text-orange-400" />
                <span className="text-2xl font-bold text-orange-400">{stats.underReview}</span>
              </div>
              <p className="text-slate-400 text-sm">Under Review</p>
            </div>
            
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
              <div className="flex items-center gap-3 mb-2">
                <X className="w-8 h-8 text-red-400" />
                <span className="text-2xl font-bold text-red-400">{stats.rejected}</span>
              </div>
              <p className="text-slate-400 text-sm">Rejected</p>
            </div>
          </div>

          {/* Bids List */}
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">All Bids</h3>
              <span className="px-3 py-1 bg-slate-700/50 text-slate-300 text-sm rounded-full">
                {bids.length} total
              </span>
            </div>

            <div className="space-y-4">
              {bids.map((bid) => (
                <div key={bid.id} className="bg-slate-700/30 rounded-xl p-6 hover:bg-slate-700/50 transition-all duration-300 border border-slate-600/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-white text-lg">{bid.projectName}</h4>
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getBidStatusBg(bid.status)} ${getStatusColor(bid.status)}`}>
                          {getStatusIcon(bid.status)}
                          <span className="capitalize">{bid.status.replace('_', ' ')}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{bid.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="bg-slate-600/30 rounded-lg p-3">
                          <p className="text-xs text-slate-400">Bid Amount</p>
                          <p className="text-lg font-bold text-emerald-400">{bid.bidAmount}</p>
                        </div>
                        <div className="bg-slate-600/30 rounded-lg p-3">
                          <p className="text-xs text-slate-400">Submitted</p>
                          <p className="text-sm font-medium text-white">{bid.submittedDate}</p>
                        </div>
                        <div className="bg-slate-600/30 rounded-lg p-3">
                          <p className="text-xs text-slate-400">Duration</p>
                          <p className="text-sm font-medium text-white">{bid.estimatedDuration}</p>
                        </div>
                      </div>

                      {bid.status === 'rejected' && bid.rejectionReason && (
                        <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-3 mb-4">
                          <p className="text-xs text-red-400 mb-1">Rejection Reason:</p>
                          <p className="text-sm text-red-300">{bid.rejectionReason}</p>
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={() => deleteBid(bid.id)}
                      className="text-slate-400 hover:text-red-400 transition-colors ml-4"
                      title="Delete bid"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    {bid.status === 'accepted' && (
                      <button
                        onClick={() => handleStartProject(bid)}
                        className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-sm transition-colors font-medium"
                      >
                        Start Project
                      </button>
                    )}
                    
                    <button className="bg-slate-600/30 hover:bg-slate-600/50 text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors">
                      View Proposal
                    </button>
                    
                    {bid.status === 'pending' && (
                      <button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg text-sm transition-colors">
                        Edit Bid
                      </button>
                    )}
                    
                    {bid.status === 'rejected' && (
                      <button className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg text-sm transition-colors">
                        Submit New Bid
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {bids.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-slate-400 mb-2">No bids yet</h3>
                <p className="text-slate-500">Start by submitting your first bid on available projects</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBids;