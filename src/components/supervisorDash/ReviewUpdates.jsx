import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Clock,
  Camera,
  ChevronDown,
  User,
  X,
  UserCircle,
  LogOut,
  CheckCircle,
  XCircle,
  Eye,
  VerifiedIcon,
  ArchiveRestore,
} from 'lucide-react';
import {
  setSubmittedUpdates,
} from './supervisorDashboardSlice';

const UpdatesReview = () => {
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab,setActiveTab] = useState('updates');
  const submittedUpdates = useSelector(state => state.supervisorDashboard.submittedUpdates);
  
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const [enlargedMedia, setEnlargedMedia] = useState(null);

  

  const sidebarItems = [
     { id: 'overview', label: 'Overview', icon: Home, path: '', color: 'text-blue-600' },
     { id: 'projects', label: 'Assigned Project', icon: FileText, path: 'assignedproject', color: 'text-green-600' },
     { id: 'supplier', label: 'Supplier Verification', icon: VerifiedIcon, path: 'supplierverification', color: 'text-purple-600' },
     { id: 'updates', label: 'Updates', icon: Activity, path: 'reviewupdates', color: 'text-amber-600' },
     { id: 'fund', label: 'Fund Requests', icon: DollarSign, path: 'fundrequestsreview', color: 'text-cyan-600' },
     { id: 'history', label: 'Request History', icon: ArchiveRestore, path: 'requesthistory', color: 'text-indigo-600' },
     { id: 'communication', label: 'Communication', icon: Users, path: 'communication', color: 'text-pink-600' },
     { id: 'settings', label: 'Settings', icon: Settings, path: 'settings', color: 'text-gray-600' },
     { id: 'profile', label: 'Profile', icon: UserCircle, path: 'profile', color: 'text-teal-600' }
   ];

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-emerald-400 bg-emerald-400/20';
      case 'pending': return 'text-yellow-400 bg-yellow-400/20';
      case 'draft': return 'text-slate-400 bg-slate-400/20';
      default: return 'text-red-400 bg-red-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Eye className="w-4 h-4" />;
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleUpdateAction = (id, action) => {
    const updatedUpdates = submittedUpdates.map(update =>
      update.id === id ? { ...update, status: action === 'approve' ? 'approved' : 'rejected' } : update
    );
    dispatch(setSubmittedUpdates(updatedUpdates));
  };

  // Simulated photo/video data (replace with actual data from state if available)
  const getMediaForUpdate = (update) => {
    // For this example, we'll simulate 3 photos and 1 video per update
    const photos = Array.from({ length: update.photos }, (_, i) => `/path/to/photo${i + 1}.jpg`);
    const videos = ['/path/to/video.mp4']; // Single video for simplicity
    return { photos, videos };
  };

  const closePopup = () => {
    setSelectedUpdate(null);
    setEnlargedMedia(null);
  };

  const UpdatePopup = ({ update }) => {
    const { photos, videos } = getMediaForUpdate(update);

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-slate-800 p-6 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">Update Details - {update.date}</h3>
            <button onClick={closePopup} className="text-slate-400 hover:text-red-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm text-white mb-4">{update.workDone}</p>
          <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
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

          {/* Photos Section */}
          {photos.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-emerald-400 mb-2">Photos</h4>
              <div className="grid grid-cols-3 gap-2">
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer"
                    onClick={() => setEnlargedMedia({ type: 'photo', src: photo })}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Videos Section */}
          {videos.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-emerald-400 mb-2">Videos</h4>
              <div className="grid grid-cols-1 gap-2">
                {videos.map((video, index) => (
                  <video
                    key={index}
                    className="w-full h-24 object-cover rounded-lg cursor-pointer"
                    onClick={() => setEnlargedMedia({ type: 'video', src: video })}
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))}
              </div>
            </div>
          )}

          {update.status === 'pending' && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  handleUpdateAction(update.id, 'approve');
                  closePopup();
                }}
                className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
              <button
                onClick={() => {
                  handleUpdateAction(update.id, 'reject');
                  closePopup();
                }}
                className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
              >
                <XCircle className="w-4 h-4" />
                Reject
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Enlarged Media Viewer
  const EnlargedMedia = () => {
    if (!enlargedMedia) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-60" onClick={() => setEnlargedMedia(null)}>
        {enlargedMedia.type === 'photo' ? (
          <img
            src={enlargedMedia.src}
            alt="Enlarged"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        ) : (
          <video
            src={enlargedMedia.src}
            controls
            autoPlay
            className="max-w-[90vw] max-h-[90vh] object-contain"
          >
            Your browser does not support the video tag.
          </video>
        )}
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
              <h2 className="text-2xl font-bold text-cyan-400">Updates</h2>
              <p className="text-slate-400 mt-1">Review and manage contractor updates</p>
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

        {/* Updates Section */}
        <div className="p-6">
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <h3 className="text-xl font-bold text-white mb-6">Submitted Updates</h3>
            {submittedUpdates.length > 0 ? (
              <div className="space-y-4">
                {submittedUpdates.map((update) => (
                  <div
                    key={update.id}
                    className="bg-slate-700/30 rounded-lg p-4 cursor-pointer hover:bg-slate-700/50 transition-colors"
                    onClick={() => setSelectedUpdate(update)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-400">{update.date}</span>
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getStatusColor(update.status)}`}>
                        {getStatusIcon(update.status)}
                        <span className="capitalize">{update.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-white mb-2">{update.workDone}</p>
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-2">
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
                    {update.status === 'pending' && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent popup trigger
                            handleUpdateAction(update.id, 'approve');
                          }}
                          className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent popup trigger
                            handleUpdateAction(update.id, 'reject');
                          }}
                          className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No updates submitted yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Update Popup */}
      {selectedUpdate && <UpdatePopup update={selectedUpdate} />}
      {/* Enlarged Media Viewer */}
      {enlargedMedia && <EnlargedMedia />}
    </div>
  );
};

// Update Popup Component
const UpdatePopup = ({ update }) => {
  const { photos, videos } = getMediaForUpdate(update);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Update Details - {update.date}</h3>
          <button onClick={() => closePopup()} className="text-slate-400 hover:text-red-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-white mb-4">{update.workDone}</p>
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
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

        {/* Photos Section */}
        {photos.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-emerald-400 mb-2">Photos</h4>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer"
                  onClick={() => setEnlargedMedia({ type: 'photo', src: photo })}
                />
              ))}
            </div>
          </div>
        )}

        {/* Videos Section */}
        {videos.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-emerald-400 mb-2">Videos</h4>
            <div className="grid grid-cols-1 gap-2">
              {videos.map((video, index) => (
                <video
                  key={index}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer"
                  onClick={() => setEnlargedMedia({ type: 'video', src: video })}
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          </div>
        )}

        {update.status === 'pending' && (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                handleUpdateAction(update.id, 'approve');
                closePopup();
              }}
              className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => {
                handleUpdateAction(update.id, 'reject');
                closePopup();
              }}
              className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              <XCircle className="w-4 h-4" />
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Enlarged Media Viewer Component
const EnlargedMedia = () => {
  if (!enlargedMedia) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-60" onClick={(e) => { e.stopPropagation(); setEnlargedMedia(null); }}>
      {enlargedMedia.type === 'photo' ? (
        <img
          src={enlargedMedia.src}
          alt="Enlarged"
          className="max-w-[90vw] max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()} // Prevent closing on image click
        />
      ) : (
        <video
          src={enlargedMedia.src}
          controls
          autoPlay
          className="max-w-[90vw] max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()} // Prevent closing on video click
        >
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

// Simulated media data function (replace with actual data if available)
const getMediaForUpdate = (update) => {
  // Simulate photos and videos based on update.photos count
  const photos = Array.from({ length: update.photos }, (_, i) => `/path/to/photo${i + 1}.jpg`);
  const videos = ['/path/to/video.mp4']; // Single video for simplicity
  return { photos, videos };
};

// Close popup function (accessible to components)
const closePopup = () => {
  setSelectedUpdate(null);
  setEnlargedMedia(null);
};

export default UpdatesReview;