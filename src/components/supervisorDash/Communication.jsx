import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Home,
  Users,
  FileText,
  Settings,
  VerifiedIcon,
  Activity,
  DollarSign,
  ArchiveRestore,
  User,
  ChevronDown,
  Plus,
  Search,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  Paperclip,
  Smile,
  Send,
  File,
  UserCircle 
} from 'lucide-react'
import { logout } from '../../services/authService';
const SupervisorCommunications = () => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('communication');
  const [selectedContact, setSelectedContact] = useState('pm');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const messagesEndRef = useRef(null);

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

  const contacts = [
    // {
    //   id: 'pm',
    //   name: 'Project Manager',
    //   email: 'pm@secureportal.com',
    //   role: 'Project Manager',
    //   status: 'online',
    //   avatar: 'PM',
    //   lastSeen: 'Active now',
    //   unreadCount: 3
    // },
    // {
    //   id: 'contractor',
    //   name: 'John Construction Co.',
    //   email: 'john@constructionco.com',
    //   role: 'Contractor',
    //   status: 'offline',
    //   avatar: 'JC',
    //   lastSeen: '2 hours ago',
    //   unreadCount: 1
    // },
    // {
    //   id: 'supplier',
    //   name: 'John traders Co.',
    //   email: 'john@traders.com',
    //   role: 'Supplier',
    //   status: 'offline',
    //   avatar: 'SP',
    //   lastSeen: '2 hours ago',
    //   unreadCount: 1
    // },
  ];

  const [conversations, setConversations] = useState({
    // pm: [
    //   {
    //     id: 1,
    //     sender: 'pm',
    //     message: 'Hi, I need an update on the current project phase. Can you provide the latest progress report?',
    //     timestamp: '2025-01-15T10:30:00Z',
    //     status: 'read',
    //     type: 'text'
    //   },
    //   {
    //     id: 2,
    //     sender: 'supervisor',
    //     message: 'Sure, I will send the progress report by end of day. The current phase is 65% complete.',
    //     timestamp: '2025-01-15T10:45:00Z',
    //     status: 'delivered',
    //     type: 'text'
    //   },
    //   {
    //     id: 3,
    //     sender: 'pm',
    //     message: 'Great! Also, there are some budget concerns regarding the next phase. Can we schedule a meeting?',
    //     timestamp: '2025-01-15T11:00:00Z',
    //     status: 'read',
    //     type: 'text'
    //   },
    //   {
    //     id: 4,
    //     sender: 'pm',
    //     message: 'I have attached the budget analysis document for your review.',
    //     timestamp: '2025-01-15T11:15:00Z',
    //     status: 'unread',
    //     type: 'file',
    //     fileName: 'budget-analysis.pdf',
    //     fileSize: '2.3 MB'
    //   }
    // ],
    // contractor: [
    //   {
    //     id: 1,
    //     sender: 'contractor',
    //     message: 'Hello, we need approval for the additional materials request for Phase 2.',
    //     timestamp: '2025-01-15T09:00:00Z',
    //     status: 'read',
    //     type: 'text'
    //   },
    //   {
    //     id: 2,
    //     sender: 'supervisor',
    //     message: 'I have reviewed your request. Can you provide more details about the specific materials needed?',
    //     timestamp: '2025-01-15T09:30:00Z',
    //     status: 'delivered',
    //     type: 'text'
    //   },
    //   {
    //     id: 3,
    //     sender: 'contractor',
    //     message: 'We need additional steel reinforcement bars and concrete mix. The quantities are in the attached document.',
    //     timestamp: '2025-01-15T14:00:00Z',
    //     status: 'unread',
    //     type: 'file',
    //     fileName: 'material-requirements.xlsx',
    //     fileSize: '1.8 MB'
    //   }
    // ]
  });

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'supervisor',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      status: 'sent',
      type: 'text'
    };

    setConversations(prev => ({
      ...prev,
      [selectedContact]: [...prev[selectedContact], newMessage]
    }));
    
    setMessage('');
    
    
    setTimeout(() => {
      setConversations(prev => ({
        ...prev,
        [selectedContact]: prev[selectedContact].map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      }));
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversations, selectedContact]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-slate-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-slate-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-emerald-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const currentContact = contacts.find(c => c.id === selectedContact);
  const currentMessages = conversations[selectedContact] || [];

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
                  onClick={() => setActiveTab(item.id)}
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
                  onClick={() => setActiveTab('')}
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
      <div className="flex-1 flex overflow-hidden">
        {/* Contacts Sidebar */}
        <div className="w-80 bg-slate-800/30 backdrop-blur-sm border-r border-slate-700/50 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-cyan-400">Communications</h2>
              <button 
                onClick={() => setShowNewMessageModal(true)}
                className="p-2 bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-700/50 text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('unread')}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedFilter === 'unread'
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-700/50 text-slate-400 hover:text-white'
                }`}
              >
                Unread
              </button>
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact.id)}
                className={`p-4 border-b border-slate-700/30 cursor-pointer transition-all duration-200 hover:bg-slate-700/30 ${
                  selectedContact === contact.id ? 'bg-slate-700/50 border-l-4 border-l-emerald-400' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-medium text-sm ${
                      contact.role === 'Project Manager' 
                        ? 'bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-900'
                        : 'bg-gradient-to-br from-yellow-400 to-orange-400 text-slate-900'
                    }`}>
                      {contact.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                      contact.status === 'online' ? 'bg-emerald-400' : 'bg-slate-500'
                    }`}></div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white truncate">{contact.name}</h3>
                      {contact.unreadCount > 0 && (
                        <span className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {contact.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 truncate">{contact.role}</p>
                    <p className="text-xs text-slate-500">{contact.lastSeen}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm ${
                    currentContact?.role === 'Project Manager' 
                      ? 'bg-gradient-to-br from-emerald-400 to-cyan-400 text-slate-900'
                      : 'bg-gradient-to-br from-yellow-400 to-orange-400 text-slate-900'
                  }`}>
                    {currentContact?.avatar}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-800 ${
                    currentContact?.status === 'online' ? 'bg-emerald-400' : 'bg-slate-500'
                  }`}></div>
                </div>
                <div>
                  <h3 className="font-medium text-white">{currentContact?.name}</h3>
                  <p className="text-sm text-slate-400">{currentContact?.role} • {currentContact?.lastSeen}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                  <Phone className="w-5 h-5 text-slate-300" />
                </button>
                <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                  <Video className="w-5 h-5 text-slate-300" />
                </button>
                <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                  <MoreVertical className="w-5 h-5 text-slate-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((msg, index) => {
              const isOwnMessage = msg.sender === 'supervisor';
              const showDate = index === 0 || formatDate(msg.timestamp) !== formatDate(currentMessages[index - 1].timestamp);

              return (
                <div key={msg.id}>
                  {showDate && (
                    <div className="flex justify-center my-4">
                      <span className="bg-slate-700/50 text-slate-400 text-xs px-3 py-1 rounded-full">
                        {formatDate(msg.timestamp)}
                      </span>
                    </div>
                  )}
                  
                  <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                      {msg.type === 'text' ? (
                        <div className={`p-3 rounded-2xl ${
                          isOwnMessage 
                            ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900' 
                            : 'bg-slate-700/50 text-white'
                        }`}>
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      ) : (
                        <div className={`p-3 rounded-2xl border ${
                          isOwnMessage 
                            ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 border-emerald-300' 
                            : 'bg-slate-700/50 text-white border-slate-600'
                        }`}>
                          <div className="flex items-center gap-2">
                            <File className="w-5 h-5" />
                            <div>
                              <p className="text-sm font-medium">{msg.fileName}</p>
                              <p className="text-xs opacity-70">{msg.fileSize}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className={`flex items-center gap-1 mt-1 ${
                        isOwnMessage ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className="text-xs text-slate-400">{formatTime(msg.timestamp)}</span>
                        {isOwnMessage && getStatusIcon(msg.status)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-slate-800/30 backdrop-blur-sm border-t border-slate-700/50 p-4">
            <div className="flex items-end gap-3">
              <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                <Paperclip className="w-5 h-5 text-slate-300" />
              </button>
              
              <div className="flex-1 bg-slate-700/50 rounded-lg border border-slate-600 focus-within:border-emerald-400/50">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full p-3 bg-transparent text-white placeholder-slate-400 resize-none focus:outline-none max-h-32"
                  rows={1}
                />
              </div>
              
              <button className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors">
                <Smile className="w-5 h-5 text-slate-300" />
              </button>
              
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="p-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SupervisorCommunications;