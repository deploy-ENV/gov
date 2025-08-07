import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  DollarSign,
  Calendar,
  User,
  Plus,
  X,
  Upload,
  ArrowRight,
  Calculator,
  Briefcase,
  Timer,
  Send,
  UserCircle,
  LogOut,
} from 'lucide-react';
import { useSelector, useDispatch, } from 'react-redux';
import {
  setFundReq,
  setActiveTab,
  recalculateDashMode,
} from './dashboardSlice';
import { useNavigate,useLocation } from 'react-router-dom';

const RequestFund = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = useSelector(state => state.projectsDashboard.activeTab);
  
  const { fundReq } = useSelector(
    state => state.projectsDashboard
  );
  const [tasks, setTasks] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [laborCosts, setLaborCosts] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [newTask, setNewTask] = useState({ description: '', amount: '' });
  const [newLabor, setNewLabor] = useState({ role: '', howMany: '', days: '', dailyRate: '' });
  const [newPhase, setNewPhase] = useState({ phase: '', startDate: '', endDate: '' });
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddLabor, setShowAddLabor] = useState(false);
  const [showAddPhase, setShowAddPhase] = useState(false);
  const [requestNotes, setRequestNotes] = useState('');

  const dashboardMode = useSelector(state => state.projectsDashboard.dashMode)
     
  
  const sidebarItems = [
     { id: 'overview', label: 'Overview', icon: Home, link: "" },
     { id: 'availableprojects', label: 'Available Projects',hidden: dashboardMode === 'execution',  icon: FileText, link: "availableprojects" },
     
     { id: 'updates', label: 'Updates', icon: Activity, hidden: dashboardMode === 'bidding', link: "updates" },
     { id: 'expenses', label: 'Expenses', icon: BarChart3, hidden: dashboardMode === 'bidding', link: "expenses" },
     { id: 'bids', label: 'My Bids', icon: DollarSign, hidden: dashboardMode === 'execution', link: "bids" },
     { id: 'communication', label: 'Communication', hidden: dashboardMode === 'bidding', icon: Users, link: "communication" },
     { id: 'fund', label: 'Request Fund', hidden: dashboardMode === 'bidding', icon: DollarSign, link: "requestFund" },
     { id: 'settings', label: 'Settings', icon: Settings, link: "settings" },
   ];

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const removeLabor = (id) => {
    setLaborCosts(laborCosts.filter(labor => labor.id !== id));
  };

  const removePhase = (id) => {
    setTimeline(timeline.filter(phase => phase.id !== id));
  };

  const addTask = () => {
    if (newTask.description && newTask.amount) {
      setTasks([...tasks, {
        id: Date.now(),
        description: newTask.description,
        amount: parseInt(newTask.amount)
      }]);
      setNewTask({ description: '', amount: '' });
      setShowAddTask(false);
    }
  };

  const addLabor = () => {
    if (newLabor.role && newLabor.days && newLabor.dailyRate && newLabor.howMany) {
      setLaborCosts([...laborCosts, {
        id: Date.now(),
        role: newLabor.role,
        howMany: newLabor.howMany,
        days: parseInt(newLabor.days),
        dailyRate: parseInt(newLabor.dailyRate)
      }]);
      setNewLabor({ role: '', howMany: '', days: '', dailyRate: '' });
      setShowAddLabor(false);
    }
  };

  const addPhase = () => {
    if (newPhase.phase && newPhase.startDate && newPhase.endDate) {
      setTimeline([...timeline, {
        id: Date.now(),
        phase: newPhase.phase,
        startDate: newPhase.startDate,
        endDate: newPhase.endDate
      }]);
      setNewPhase({ phase: '', startDate: '', endDate: '' });
      setShowAddPhase(false);
    }
  };

  const calculateTotal = () => {
    const taskTotal = tasks.reduce((sum, task) => sum + task.amount, 0);
    const laborTotal = laborCosts.reduce((sum, labor) => sum + (labor.days * labor.dailyRate * labor.howMany), 0);
    return taskTotal + laborTotal;
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSubmitRequest = () => {
    if (tasks.length === 0 && laborCosts.length === 0) {
      alert('Please add at least one task or labor cost item');
      return;
    }
    const req = {
      tasks: tasks,
      laborCosts: laborCosts,
      timeline: timeline,
      totalAmount: calculateTotal(),
      notes: requestNotes,
      status:"pending",
    };
    dispatch(setFundReq(req));
    console.log(fundReq);
    alert('Fund request submitted successfully! It will be sent to the Supervisor for verification, then to the PM for disbursement.');
  };

  return (
    <div className="flex h-screen font-sans bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">Request Fund</h2>
              <p className="text-slate-400 mt-1">Submit fund requests for project expenses</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search items..."
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Task Breakdown */}
            <div className="lg:col-span-2 space-y-6">
              {/* Task Breakdown */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Task Breakdown with Amount</h3>
                  </div>
                  <button
                    onClick={() => setShowAddTask(true)}
                    className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Task
                  </button>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div>
                        <p className="text-white font-medium">{task.description}</p>
                        <p className="text-slate-400 text-sm">Task ID: {task.id}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-emerald-400 font-bold">₹{task.amount.toLocaleString()}</p>
                        <button
                          onClick={() => removeTask(task.id)}
                          className="text-red-400 hover:text-red-500 p-1 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Task Form */}
                {showAddTask && (
                  <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
                    <h4 className="text-white font-medium mb-3">Add New Task</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Task description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="bg-slate-600/50 border border-slate-500 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      />
                      <input
                        type="number"
                        placeholder="Amount (₹)"
                        value={newTask.amount}
                        onChange={(e) => setNewTask({ ...newTask, amount: e.target.value })}
                        className="bg-slate-600/50 border border-slate-500 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={addTask}
                        className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg transition-colors"
                      >
                        Add Task
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

              {/* Labor Costs */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Estimated Labor Cost</h3>
                  </div>
                  <button
                    onClick={() => setShowAddLabor(true)}
                    className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Labor
                  </button>
                </div>

                <div className="space-y-3">
                  {laborCosts.map((labor) => (
                    <div key={labor.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div>
                        <p className="text-white font-medium">{labor.role}</p>
                        <p className="text-slate-400 text-sm">{labor.days} days x {labor.howMany} {labor.role}'s × ₹{labor.dailyRate} /day</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-yellow-400 font-bold">₹{(labor.days * labor.dailyRate * labor.howMany).toLocaleString()}</p>
                        <button
                          onClick={() => removeLabor(labor.id)}
                          className="text-red-400 hover:text-red-500 p-1 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Labor Form */}
                {showAddLabor && (
                  <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
                    <h4 className="text-white font-medium mb-3">Add New Labor Cost</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Role/Position"
                        value={newLabor.role}
                        onChange={(e) => setNewLabor({ ...newLabor, role: e.target.value })}
                        className="bg-slate-600/50 border border-slate-500 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      />
                      <input
                        type="number"
                        placeholder="How Many"
                        value={newLabor.howMany}
                        onChange={(e) => setNewLabor({ ...newLabor, howMany: e.target.value })}
                        className="bg-slate-600/50 border border-slate-500 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      />
                      <input
                        type="number"
                        placeholder="Days"
                        value={newLabor.days}
                        onChange={(e) => setNewLabor({ ...newLabor, days: e.target.value })}
                        className="bg-slate-600/50 border border-slate-500 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      />
                      <input
                        type="number"
                        placeholder="Daily Rate (₹)"
                        value={newLabor.dailyRate}
                        onChange={(e) => setNewLabor({ ...newLabor, dailyRate: e.target.value })}
                        className="bg-slate-600/50 border border-slate-500 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={addLabor}
                        className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg transition-colors"
                      >
                        Add Labor
                      </button>
                      <button
                        onClick={() => setShowAddLabor(false)}
                        className="bg-slate-600/50 hover:bg-slate-600/70 text-slate-300 px-4 py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                      <Timer className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Add Timeline</h3>
                  </div>
                  <button
                    onClick={() => setShowAddPhase(true)}
                    className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Phase
                  </button>
                </div>

                <div className="space-y-3">
                  {timeline.map((phase) => (
                    <div key={phase.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div>
                        <p className="text-white font-medium">{phase.phase}</p>
                        <p className="text-slate-400 text-sm">{phase.startDate} to {phase.endDate}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <p className="text-purple-400 text-sm">Phase {phase.id}</p>
                        </div>
                        <button
                          onClick={() => removePhase(phase.id)}
                          className="text-red-400 hover:text-red-500 p-1 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Phase Form */}
                {showAddPhase && (
                  <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
                    <h4 className="text-white font-medium mb-3">Add New Phase</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Phase name"
                        value={newPhase.phase}
                        onChange={(e) => setNewPhase({ ...newPhase, phase: e.target.value })}
                        className="bg-slate-600/50 border border-slate-500 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      />
                      <input
                        type="date"
                        placeholder="Start date"
                        value={newPhase.startDate}
                        onChange={(e) => setNewPhase({ ...newPhase, startDate: e.target.value })}
                        className="bg-slate-600/50 border border-slate-500 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      />
                      <input
                        type="date"
                        placeholder="End date"
                        value={newPhase.endDate}
                        onChange={(e) => setNewPhase({ ...newPhase, endDate: e.target.value })}
                        className="bg-slate-600/50 border border-slate-500 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                      />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={addPhase}
                        className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-4 py-2 rounded-lg transition-colors"
                      >
                        Add Phase
                      </button>
                      <button
                        onClick={() => setShowAddPhase(false)}
                        className="bg-slate-600/50 hover:bg-slate-600/70 text-slate-300 px-4 py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Summary & Submit */}
            <div className="space-y-6">
              {/* Request Summary */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-lg flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Request Summary</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Tasks</span>
                    <span className="text-emerald-400 font-medium">{tasks.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Labor Items</span>
                    <span className="text-yellow-400 font-medium">{laborCosts.length}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-700/30 rounded-lg">
                    <span className="text-slate-300">Timeline Phases</span>
                    <span className="text-purple-400 font-medium">{timeline.length}</span>
                  </div>
                  <div className="border-t border-slate-600 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-bold text-lg">Total Amount</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                        ₹{calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                <div className="space-y-4">
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Request Flow</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-300">Goes to <strong className="text-emerald-400">Supervisor</strong> for verification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-cyan-400" />
                        <span className="text-slate-300">Then to <strong className="text-cyan-400">PM</strong> for disbursement</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmitRequest}
                    disabled={calculateTotal() === 0}
                    className="w-full bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900  shadow-em pilota-emerald-500/20 hover:from-emerald-600 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed  font-bold py-4 px-6 rounded-xl transition-colors duration-500 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-5 h-5" />
                    Submit Fund Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestFund;