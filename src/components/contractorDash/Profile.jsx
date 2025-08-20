import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateProfile, setActiveTab } from './dashboardSlice';
import {
  Shield,
  Home,
  Users,
  FileText,
  Settings,
  Bell,
  Search,
  ChevronDown,
  BarChart3,
  Activity,
  DollarSign,
  User,
  UserCircle,
  LogOut,
  Building,
  Briefcase,
  CreditCard,
  Upload
} from 'lucide-react';
import {
  
  recalculateDashMode,
} from './dashboardSlice';
const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.projectsDashboard.profile);
  const [data,setData] = useState(null) 
      // console.log("data:",(data));
      useEffect(() => {
        setData(JSON.parse(Cookies.get("userData")))
      }, []); 
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [formData, setFormData] = useState({
    Name: data?.name,
    firmName: data?.firmName,
    email:data?.email,
    address:data?.address,
    gst: data?.gst_number,
    gstDocument: data?.gstDocument,
    tradeLicense: data?.tradeLicense,
    tradeLicenseDocument: data?.tradeLicenseDocument,
    epfNo: data?.epfNo,
    epfDocument: data?.epfDocument,
    experience: data?.experience,
    bankAccInfo: { ...data.bankAccInfo }
  });

//   const hasAcceptedBid = myBids.some(bid => bid.status === 'accepted');
  const dashboardMode = useSelector(state => state.projectsDashboard.dashMode)
    useEffect(() => {
      dispatch(recalculateDashMode())
        
    }, [dashboardMode]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (['bankName', 'ifsc', 'accNo'].includes(name)) {
      setFormData({
        ...formData,
        bankAccInfo: { ...formData.bankAccInfo, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          [field]: reader.result
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setIsEditing(false);
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
                  onClick={() => dispatch(setActiveTab(item.id))}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                     'text-slate-300 hover:bg-slate-700/50 hover:text-white'
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
              <p className="text-sm font-medium text-white">Contractor</p>
              <p className="text-xs text-slate-400">contractor@secureportal.com</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </div>
          {isProfileOpen && (
            <div className="flex flex-col gap-3 mt-3 bg-slate-600/50 rounded-lg p-2">
              <Link to="/profile">
                <button 
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-slate-500/50 rounded-md transition-colors"
                  onClick={() => dispatch(setActiveTab(""))}
                >
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
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">Profile Settings</h2>
              <p className="text-slate-400 mt-1">Manage your contractor profile details</p>
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

              {/* GST */}
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-emerald-400" />
                <div className="flex-1">
                  <label className="text-sm text-slate-400">GST Number</label>
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="gst"
                        value={formData.gst}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                        placeholder="Enter GST number"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="application/pdf"
                          name="gstDocument"
                          onChange={(e) => handleFileChange(e, 'gstDocument')}
                          className="hidden"
                          id="gstDocument"
                        />
                        <label
                          htmlFor="gstDocument"
                          className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                        >
                          <Upload className="w-5 h-5" />
                          Upload GST Document
                        </label>
                        <span className="text-sm text-slate-400">
                          {formData.gstDocument ? 'GST Document Uploaded' : 'No file uploaded'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-white mt-1">{formData.gst || 'Not set'}</p>
                      <p className="text-sm text-slate-400">{formData.gstDocument ? 'GST Document Uploaded' : 'No GST document uploaded'}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Trade License */}
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-emerald-400" />
                <div className="flex-1">
                  <label className="text-sm text-slate-400">Trade License</label>
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="tradeLicense"
                        value={formData.tradeLicense}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                        placeholder="Enter trade license number"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="application/pdf"
                          name="tradeLicenseDocument"
                          onChange={(e) => handleFileChange(e, 'tradeLicenseDocument')}
                          className="hidden"
                          id="tradeLicenseDocument"
                        />
                        <label
                          htmlFor="tradeLicenseDocument"
                          className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                        >
                          <Upload className="w-5 h-5" />
                          Upload Trade License Document
                        </label>
                        <span className="text-sm text-slate-400">
                          {formData.tradeLicenseDocument ? 'Trade License Document Uploaded' : 'No file uploaded'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-white mt-1">{formData.tradeLicense || 'Not set'}</p>
                      <p className="text-sm text-slate-400">{formData.tradeLicenseDocument ? 'Trade License Document Uploaded' : 'No Trade License document uploaded'}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* EPF Number */}
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-emerald-400" />
                <div className="flex-1">
                  <label className="text-sm text-slate-400">EPF Number</label>
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="epfNo"
                        value={formData.epfNo}
                        onChange={handleInputChange}
                        className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                        placeholder="Enter EPF number"
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          accept="application/pdf"
                          name="epfDocument"
                          onChange={(e) => handleFileChange(e, 'epfDocument')}
                          className="hidden"
                          id="epfDocument"
                        />
                        <label
                          htmlFor="epfDocument"
                          className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg cursor-pointer transition-colors"
                        >
                          <Upload className="w-5 h-5" />
                          Upload EPF Document
                        </label>
                        <span className="text-sm text-slate-400">
                          {formData.epfDocument ? 'EPF Document Uploaded' : 'No file uploaded'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-white mt-1">{formData.epfNo || 'Not set'}</p>
                      <p className="text-sm text-slate-400">{formData.epfDocument ? 'EPF Document Uploaded' : 'No EPF document uploaded'}</p>
                    </div>
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

              {/* Bank Account Info */}
              <div className="flex items-start gap-4">
                <CreditCard className="w-6 h-6 text-emerald-400" />
                <div className="flex-1">
                  <label className="text-sm text-slate-400">Bank Account Details</label>
                  <div className="mt-2 space-y-3">
                    <div>
                      <label className="text-xs text-slate-400">Bank Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="bankName"
                          value={formData.bankAccInfo.bankName}
                          onChange={handleInputChange}
                          className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                          placeholder="Enter bank name"
                        />
                      ) : (
                        <p className="text-white mt-1">{formData.bankAccInfo.bankName || 'Not set'}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">IFSC Code</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="ifsc"
                          value={formData.bankAccInfo.ifsc}
                          onChange={handleInputChange}
                          className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                          placeholder="Enter IFSC code"
                        />
                      ) : (
                        <p className="text-white mt-1">{formData.bankAccInfo.ifsc || 'Not set'}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs text-slate-400">Account Number</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="accNo"
                          value={formData.bankAccInfo.accNo}
                          onChange={handleInputChange}
                          className="w-full mt-1 p-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                          placeholder="Enter account number"
                        />
                      ) : (
                        <p className="text-white mt-1">{formData.bankAccInfo.accNo || 'Not set'}</p>
                      )}
                    </div>
                  </div>
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
                  className="bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium hover:from-emerald-600 hover:to-cyan-600  shadow-lg shadow-em pilota-emerald-500/20 duration-500  px-6 py-2 rounded-lg transition-colors"
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

export default Profile;