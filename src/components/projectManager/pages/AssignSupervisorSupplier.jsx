import React, { useState, useEffect } from 'react';
import { Loader2, Truck, User, CheckCircle, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DUMMY_SUPPLIERS = [
  
];

const DUMMY_SUPERVISORS = [
 
];

const PROJECT_ZONE = 'North';
const MATERIALS = ['Cement', 'Steel', 'Bricks'];

function SupplierCard({ supplier, selected, onSelect, disabled, material }) {
  return (
    <div
      className={`rounded-xl border-2 p-4 bg-white shadow-card flex flex-col gap-2 transition-all duration-200
        ${selected ? 'border-accent ring-2 ring-accent/30' : 'border-border'}
        ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <Truck className="text-accent" size={20} />
        <span className="font-semibold text-primary text-base">{supplier.name}</span>
      </div>
      <div className="text-sm text-secondary">Material: <span className="font-medium text-primary">{material}</span></div>
      <div className="text-sm text-secondary">Distance: <span className="font-medium">{supplier.distance} km</span></div>
      <div className="text-sm text-secondary">Pricing: <span className="font-medium">₹{supplier.pricing[material]} /unit</span></div>
      <div className="text-sm text-secondary">ETA: <span className="font-medium">{supplier.eta}</span></div>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="radio"
          name={`supplier-${material}`}
          checked={selected}
          onChange={onSelect}
          disabled={disabled}
          className="accent-accent w-4 h-4"
        />
        <span className="text-xs text-secondary">Select Supplier</span>
      </div>
    </div>
  );
}

function SupervisorCard({ supervisor, selected, onSelect, disabled }) {
  return (
    <div
      className={`rounded-xl border-2 p-4 bg-white shadow-card flex flex-col gap-2 transition-all duration-200
        ${selected ? 'border-primary ring-2 ring-primary/30' : 'border-border'}
        ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <User className="text-primary" size={20} />
        <span className="font-semibold text-primary text-base">{supervisor.name}</span>
      </div>
      <div className="text-sm text-secondary">Experience: <span className="font-medium">{supervisor.experience} completed projects</span></div>
      <div className="text-sm text-secondary">Status: <span className={`font-medium ${supervisor.status === 'Available' ? 'text-success' : 'text-warning'}`}>{supervisor.status}</span></div>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="radio"
          name="supervisor"
          checked={selected}
          onChange={onSelect}
          disabled={disabled}
          className="accent-primary w-4 h-4"
        />
        <span className="text-xs text-secondary">Assign</span>
      </div>
    </div>
  );
}

function AssignmentPanel() {
  // Supplier selection state: { Cement: supplierId, Steel: supplierId, ... }
  const [supplierLoading, setSupplierLoading] = useState(true);
  const [supplierSelection, setSupplierSelection] = useState({});
  const [supplierFinalized, setSupplierFinalized] = useState(false);
  const [supplierToast, setSupplierToast] = useState(false);

  // Supervisor selection state
  const [supervisorSelection, setSupervisorSelection] = useState(null);
  const [supervisorFinalized, setSupervisorFinalized] = useState(false);
  const [supervisorToast, setSupervisorToast] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSupplierLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Filter suppliers by material
  const suppliersByMaterial = MATERIALS.reduce((acc, mat) => {
    acc[mat] = DUMMY_SUPPLIERS.filter(s => s.materials.includes(mat));
    return acc;
  }, {});

  // Supervisors in project zone
  const supervisors = DUMMY_SUPERVISORS.filter(s => s.zone === PROJECT_ZONE);

  // Supplier selection logic
  const handleSupplierSelect = (material, supplierId) => {
    if (supplierFinalized) return;
    setSupplierSelection(sel => ({ ...sel, [material]: supplierId }));
  };
  const finalizeSuppliers = () => {
    setSupplierFinalized(true);
    setSupplierToast(true);
    setTimeout(() => setSupplierToast(false), 2000);
  };

  // Supervisor selection logic
  const handleSupervisorSelect = (id) => {
    if (supervisorFinalized) return;
    setSupervisorSelection(id);
  };
  const finalizeSupervisor = () => {
    setSupervisorFinalized(true);
    setSupervisorToast(true);
    setTimeout(() => setSupervisorToast(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full">
      {/* Supplier Auto-Fetch Section */}
      <div className="flex-1 bg-[#F7F9FC] rounded-xl p-6 shadow-card flex flex-col min-w-[320px]">
        <div className="text-lg font-bold text-primary mb-4">Auto-Fetched Suppliers</div>
        {supplierLoading ? (
          <div className="flex flex-col items-center justify-center flex-1 py-12">
            <Loader2 className="animate-spin text-accent mb-2" size={32} />
            <span className="text-accent font-medium">Fetching verified suppliers…</span>
          </div>
        ) : (
          <div className="space-y-6 flex-1">
            {MATERIALS.map(mat => (
              <div key={mat} className="mb-2">
                <div className="font-semibold text-primary mb-2">{mat}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {suppliersByMaterial[mat].map(supplier => (
                    <SupplierCard
                      key={supplier.id}
                      supplier={supplier}
                      material={mat}
                      selected={supplierSelection[mat] === supplier.id}
                      onSelect={() => handleSupplierSelect(mat, supplier.id)}
                      disabled={supplierFinalized}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-6 text-xs text-secondary text-center">Supervisor must select one supplier per material</div>
        <button
          className="mt-6 px-6 py-2 rounded-lg bg-accent text-white font-semibold shadow-card hover:scale-105 transition disabled:opacity-50"
          disabled={supplierFinalized || MATERIALS.some(mat => !supplierSelection[mat])}
          onClick={finalizeSuppliers}
        >
          Finalize Selection
        </button>
      </div>
      {/* Supervisor Assignment Section */}
      <div className="flex-1 bg-[#F7F9FC] rounded-xl p-6 shadow-card flex flex-col min-w-[320px]">
        <div className="text-lg font-bold text-primary mb-4">Assign Project Supervisor</div>
        <div className="space-y-4 flex-1">
          {supervisors.map(sup => (
            <SupervisorCard
              key={sup.id}
              supervisor={sup}
              selected={supervisorSelection === sup.id}
              onSelect={() => handleSupervisorSelect(sup.id)}
              disabled={supervisorFinalized || sup.status !== 'Available'}
            />
          ))}
        </div>
        <button
          className="mt-6 px-6 py-2 rounded-lg bg-primary text-white font-semibold shadow-card hover:scale-105 transition disabled:opacity-50"
          disabled={supervisorFinalized || !supervisorSelection}
          onClick={finalizeSupervisor}
        >
          Assign Supervisor
        </button>
      </div>
      {/* Toasts */}
      <AnimatePresence>
        {supplierToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="fixed left-1/2 -translate-x-1/2 bottom-8 bg-accent text-white px-6 py-3 rounded-xl shadow-card flex items-center gap-2 z-50"
          >
            <CheckCircle className="text-success" size={24} />
            <span>Suppliers finalized successfully!</span>
          </motion.div>
        )}
        {supervisorToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="fixed left-1/2 -translate-x-1/2 bottom-8 bg-primary text-white px-6 py-3 rounded-xl shadow-card flex items-center gap-2 z-50"
          >
            <CheckCircle className="text-success" size={24} />
            <span>Supervisor assigned</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AssignSupervisorSupplier() {
  return (
    <div className="h-full w-full bg-[#F7F9FC] p-0 m-0 flex items-center justify-center">
      <div className="w-full h-full">
        <AssignmentPanel />
      </div>
    </div>
  );
} 