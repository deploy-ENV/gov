import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
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
  BadgeCheck,
  AlertCircle,
  Package,
  Truck,
  FileImage,
  ExternalLink,
  Plus,
  VerifiedIcon 
} from 'lucide-react';
import { logout } from '../../services/authService';

const SupplierMaterialVerificationPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [suppliers, setSuppliers] = useState([
  // {
  //   id: 1,
  //   name: "Shree BuildTech Suppliers",
  //   contact: "Rajesh Kumar",
  //   email: "rajesh@shreebuildtech.in",
  //   phone: "+91 98765 43210",
  //   items: [
  //     { name: "Portland Cement", delivered: 380, required: 500, unit: "bags", status: "on-time" },
  //     { name: "TMT Steel Bars", delivered: 2400, required: 3000, unit: "kg", status: "late" }
  //   ],
  //   overallStatus: "partial",
  //   deliveryProof: ["invoice_001.pdf", "delivery_challan.jpg"]
  // },
  // {
  //   id: 2,
  //   name: "Triveni Construction Materials",
  //   contact: "Pooja Verma",
  //   email: "pooja@trivenimaterials.in",
  //   phone: "+91 91234 56789",
  //   items: [
  //     { name: "Fly Ash Bricks", delivered: 10000, required: 10000, unit: "pieces", status: "on-time" },
  //     { name: "Coarse Sand", delivered: 20, required: 20, unit: "tons", status: "on-time" }
  //   ],
  //   overallStatus: "completed",
  //   deliveryProof: ["receipt_002.pdf", "photo_delivery.jpg"]
  // },
  // {
  //   id: 3,
  //   name: "Metro Hardware & Electricals",
  //   contact: "Anil Mehra",
  //   email: "anil@metrohardware.in",
  //   phone: "+91 99887 77665",
  //   items: [
  //     { name: "PVC Electrical Conduits", delivered: 0, required: 1000, unit: "meters", status: "missing" }
  //   ],
  //   overallStatus: "pending",
  //   deliveryProof: []
  // }
]);

  const [alternateSuppliers, setAlternateSuppliers] = useState(['Supplier A', 'Supplier B', 'Supplier C']);
  const allotedProject = useSelector(state => state.supervisorDashboard?.allotedProject || { estimatedQuantities: [] });

  const handleAssignAlternate = (supplierId) => {
    console.log(`Assigning alternate supplier for ${supplierId}`);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'on-time':
      case 'completed':
        return 'text-emerald-400 bg-emerald-500/20';
      case 'late':
      case 'partial':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'pending':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-slate-400 bg-slate-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'on-time':
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'late':
      case 'partial':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };
  const [activeTab, setActiveTab] = useState('supplier');
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
                          <p className="text-sm font-medium text-white">Contractor</p>
                          <p className="text-xs text-slate-400">contractor@secureportal.com</p>
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
        <header className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-cyan-400">Supplier Verification</h2>
              <p className="text-slate-400 mt-1">
                Verify supplier materials and delivery status
              </p>
              
            </div>
            <div className="flex items-center gap-4">
                 <button
                            onClick={() => handleAssignAlternate(supplier.id)}
                            className="flex items-center  gap-2 bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-medium hover:brightness-110  shadow-lg shadow-emerald-500/20 px-4 py-2 rounded-lg transition-colors text-sm"
                            >
                            <Plus className="w-4 h-4" />
                            Request Delivery
                            </button>
              <div className="relative">
                
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search suppliers, materials..."
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
          <div className="space-y-6">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                {/* Supplier Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
                      <Package className="w-6 h-6 text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{supplier.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                        <span>Contact: {supplier.contact}</span>
                        <span>•</span>
                        <span>{supplier.email}</span>
                        <span>•</span>
                        <span>{supplier.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(supplier.overallStatus)}`}>
                      {getStatusIcon(supplier.overallStatus)}
                      {supplier.overallStatus.charAt(0).toUpperCase() + supplier.overallStatus.slice(1)}
                    </span>
                    {(supplier.overallStatus === "pending" ||supplier.overallStatus === "late"||supplier.overallStatus === "partial" ) &&
                            <button
                            onClick={() => handleAssignAlternate(supplier.id)}
                            className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 px-4 py-2 rounded-lg transition-colors text-sm"
                            >
                            <Plus className="w-4 h-4" />
                            Assign Alternate
                            </button>
                    }
                  </div>
                </div>

                {/* Materials Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                  {supplier.items.map((item, index) => (
                    <div key={index} className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-white">{item.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(item.status)}`}>
                          {getStatusIcon(item.status)}
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Delivered:</span>
                          <span className="text-white font-medium">{item.delivered} {item.unit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Required:</span>
                          <span className="text-white font-medium">{item.required} {item.unit}</span>
                        </div>
                        <div className="w-full bg-slate-600/50 rounded-full h-2 mt-3">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              item.delivered >= item.required ? 'bg-emerald-500' : 
                              item.delivered > 0 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min((item.delivered / item.required) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          {((item.delivered / item.required) * 100).toFixed(0)}% Complete
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Proof */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-600/50">
                  <div className="flex items-center gap-3">
                    <FileImage className="w-5 h-5 text-slate-400" />
                    <span className="text-slate-400">Delivery Proof:</span>
                    <div className="flex items-center gap-2">
                      {supplier.deliveryProof.length > 0 ? (
                        supplier.deliveryProof.map((proof, index) => (
                          <button
                            key={index}
                            className="flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {proof}
                          </button>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">No documents uploaded</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-400">Last Updated: 2 hours ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierMaterialVerificationPanel;