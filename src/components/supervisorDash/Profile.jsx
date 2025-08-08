import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProfile} from './supervisorDashboardSlice';
import {
  Shield,
  Home,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Activity,
  DollarSign,
  User,
  UserCircle,
  LogOut,
  Building,
  Briefcase,
  VerifiedIcon,
  ArchiveRestore
} from 'lucide-react';
import { logout } from '../../services/authService';

const ProfileSupervisor = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.supervisorDashboard.profile);
  const [activeTab, setActiveTab] = useState('');
  
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [formData, setFormData] = useState({
    Name: profile.Name || '',
    firmName: profile.firmName || '',
    state: profile.state || '',
    region: profile.region || '',
    experience: profile.experience || ''
  });

  useEffect(() => {
    setActiveTab('settings');
  }, [activeTab]);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: Home, link: "/" },
    { id: 'projects', label: 'Assigned Project', icon: FileText, link: "/assignedproject" },
    { id: 'supplier', label: 'Supplier Verification', icon: VerifiedIcon, link: "/supplierVerification" },
    { id: 'updates', label: 'Updates', icon: Activity, link: "/reviewUpdates" },
    { id: 'fund', label: 'Fund Requests', icon: DollarSign, link: "/fundrequestsReview" },
    { id: 'history', label: 'Request History', icon: ArchiveRestore, link: "/requestHistory" },
    { id: 'communication', label: 'Communication', icon: Users, link: "/communication" },
    { id: 'settings', label: 'Settings', icon: Settings, link: "/settingsSupervisor" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
  try {
    
    // await api.updateSupervisorProfile(formData);
    dispatch(updateProfile(formData));
    setIsEditing(false);
  } catch (error) {
    console.error('Failed to save profile:', error);
    alert('Failed to save profile. Please try again.');
  }
};

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
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
              <Link to={item.link} key={item.id}>
                <button
                  onClick={() => (setActiveTab(item.id))}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                    item.id === 'settings'
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
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>
          {isProfileOpen && (
            <div className="flex flex-col gap-3 mt-3 bg-slate-600/50 rounded-lg p-2">
              <Link to="/profile">
                <button 
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-500/50 rounded-md transition-colors"
                  onClick={() => (setActiveTab(""))}
                >
                  <UserCircle className="w-4 h-4" />
                  Profile
                </button>
              </Link>
              <Link to="/logout">
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
              <h2 className="text-2xl font-bold text-cyan-400">Profile Settings</h2>
              <p className="text-slate-400 mt-1">Manage your supervisor profile details</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search profile..."
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

        {/* Profile Content */}
        <div className="p-6">
          <div className="max-w-2xl mx-auto bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="space-y-6">
              {/* Name */}
              <div className="flex items-center gap-4">
                <User className="w-6 h-6 text-emerald-400" />
                <div className="flex-1">
                  <label className="text-sm text-slate-400">Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="Name"
                      value={formData.Name}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <p className="text-white mt-1">{formData.Name || 'Not set'}</p>
                  )}
                </div>
              </div>

              {/* Firm Name */}
              <div className="flex items-center gap-4">
                <Building className="w-6 h-6 text-emerald-400" />
                <div className="flex-1">
                  <label className="text-sm text-slate-400">Firm Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="firmName"
                      value={formData.firmName}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      placeholder="Enter firm name"
                    />
                  ) : (
                    <p className="text-white mt-1">{formData.firmName || 'Not set'}</p>
                  )}
                </div>
              </div>

              {/* State */}
              <div className="flex items-center gap-4">
                <FileText className="w-6 h-6 text-emerald-400" />
                <div className="flex-1">
                  <label className="text-sm text-slate-400">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      placeholder="Enter state"
                    />
                  ) : (
                    <p className="text-white mt-1">{formData.state || 'Not set'}</p>
                  )}
                </div>
              </div>

              {/* Region */}
              <div className="flex items-center gap-4">
                <FileText className="w-6 h-6 text-emerald-400" />
                <div className="flex-1">
                  <label className="text-sm text-slate-400">Region</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      placeholder="Enter region"
                    />
                  ) : (
                    <p className="text-white mt-1">{formData.region || 'Not set'}</p>
                  )}
                </div>
              </div>

              {/* Experience */}
              <div className="flex items-center gap-4">
                <Briefcase className="w-6 h-6 text-emerald-400" />
                <div className="flex-1">
                  <label className="text-sm text-slate-400">Years of Experience</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      placeholder="Enter years of experience"
                    />
                  ) : (
                    <p className="text-white mt-1">{formData.experience || 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-6 py-2 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-slate-600/30 hover:bg-slate-600/50 text-slate-300 px-6 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/20 duration-500 px-6 py-2 rounded-lg transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSupervisor;