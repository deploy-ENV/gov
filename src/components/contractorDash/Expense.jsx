import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useNavigation } from 'react-router-dom';
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
  Upload,
  Calculator,
  User,
  Plus,
  X,
  UserCircle,
  LogOut,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { setBill ,setActiveTab,recalculateDashMode,} from './dashboardSlice';
// import { useNavigate } from 'react-router-dom';

const Expense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { bill,fundReq } = useSelector(state => state.projectsDashboard);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const activeTab = useSelector(state => state.projectsDashboard.activeTab);
  const [localBills, setLocalBills] = useState([]); 
  const [taskUsage, setTaskUsage] = useState([]);
  const [newTaskNote, setNewTaskNote] = useState({ task: '', usage: '' });
  const [showAddTask, setShowAddTask] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [fundReceived, setFundReceived] = useState(0);
  
  const dashboardMode = useSelector(state => state.projectsDashboard.dashMode)
      useEffect(() => {
        dispatch(recalculateDashMode())
          if (dashboardMode === 'bidding') {
            navigate('/'); 
          }
      }, [dashboardMode, navigate]);
  const hasAcceptedBid = true;

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

  const handleBillUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileMetadata = files.map(file => ({
      name: file.name,
      size: file.size,
      lastModified: file.lastModified,
      id: Date.now() + Math.random() 
    }));
    setLocalBills(prev => [...prev, ...files]); 
    dispatch(setBill([...bill, ...fileMetadata])); 
  };

  const removeBill = (id) => {
    setLocalBills(localBills.filter((_, index) => {
      const metadata = bill.find(b => b.id === id);
      return index !== bill.indexOf(metadata);
    }));
    dispatch(setBill(bill.filter(b => b.id !== id)));
  };

  const addTaskNote = () => {
    if (newTaskNote.task && newTaskNote.usage) {
      setTaskUsage([...taskUsage, { ...newTaskNote, id: Date.now() }]);
      setNewTaskNote({ task: '', usage: '' });
      setShowAddTask(false);
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const removeTaskNote = (id) => {
    setTaskUsage(taskUsage.filter(note => note.id !== id));
  };

  const updateTotals = () => {
    const expenseTotal = bill.reduce((sum, b) => sum + (b.size / 1000), 0); 
    const usageTotal = taskUsage.reduce((sum, note) => sum + parseInt(note.usage || 0), 0);
    setTotalExpense(expenseTotal + usageTotal);
    const totalApprovedAmount = fundReq
    .filter(item => item.status === "approved")
    .reduce((sum, item) => sum + item.totalAmount, 0);
    setFundReceived(totalApprovedAmount);
    // setFundReceived(5000); 
  };

  useEffect(() => {
    updateTotals();
  }, [bill, taskUsage]);

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
              <div key={item.id}>
                <Link to={item.link}>
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
        <div className="absolute bottom-6 left-4 right-4 bg-slate-700/50 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 cursor-pointer"
          onClick={toggleProfileDropdown}>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-slate-900" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Contractor</p>
              <p className="text-xs text-slate-400">contractor@secureportal.com</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
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
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">Expenses</h2>
              <p className="text-slate-400 mt-1">Manage and track project expenses</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search expenses..."
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
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                      <Upload className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Upload Bills / Receipts</h3>
                  </div>
                </div>
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    onChange={handleBillUpload}
                    className="hidden"
                    id="bill-upload"
                  />
                  <label htmlFor="bill-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-slate-400">Click to upload bills or receipts</p>
                  </label>
                </div>
                {bill.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {bill.map((b) => (
                      <div key={b.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg">
                        <span className="text-white">{b.name}</span>
                        <button
                          onClick={() => removeBill(b.id)}
                          className="text-red-400 hover:text-red-500 p-1 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Note Usage per Task</h3>
                  </div>
                  <button
                    onClick={() => setShowAddTask(true)}
                    className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Task Note
                  </button>
                </div>
                <div className="space-y-3">
                  {taskUsage.map((note) => (
                    <div key={note.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div>
                        <p className="text-white font-medium">{note.task}</p>
                        <p className="text-slate-400 text-sm">Usage: ₹{note.usage}</p>
                      </div>
                      <button
                        onClick={() => removeTaskNote(note.id)}
                        className="text-red-400 hover:text-red-500 p-1 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                {showAddTask && (
                  <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
                    <h4 className="text-white font-medium mb-3">Add New Task Note</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Task name"
                        value={newTaskNote.task}
                        onChange={(e) => setNewTaskNote({ ...newTaskNote, task: e.target.value })}
                        className="bg-slate-600/50 border border-slate-500 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      />
                      <input
                        type="number"
                        placeholder="Usage amount (₹)"
                        value={newTaskNote.usage}
                        onChange={(e) => setNewTaskNote({ ...newTaskNote, usage: e.target.value })}
                        className="bg-slate-600/50 border border-slate-500 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={addTaskNote}
                        className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg transition-colors"
                      >
                        Add Note
                      </button>
                      <button
                        onClick={() => setShowAddTask(false)}
                        className="bg-slate-600/50 hover:bg-slate-600/70 text-slate-300 px-4 py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Track Total vs. Fund Received</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Total Expenses</span>
                    <span className="text-emerald-400 font-medium">₹{totalExpense.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Fund Received</span>
                    <span className="text-yellow-400 font-medium">₹{fundReceived.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-slate-600 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold text-lg">Remaining Balance</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        ₹{(fundReceived - totalExpense).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expense;