import React, { useState } from "react";
import {
  Building,
  CreditCard,
  CalendarClock,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Eye,
  Printer,
  Download,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ProgressBar from "../components/ProgressBar";
import ViewDetailsModal from "../components/ViewDetailsModal";
import jsPDF from "jspdf";

const mockPayments = [
  // {
  //   id: 1,
  //   project: "Municipal Infrastructure Upgrade",
  //   deliveryId: "DEL-001",
  //   amount: 35000,
  //   status: "Paid",
  //   lastPayment: "2025-05-20",
  //   invoice: "invoice_DEL-001.pdf",
  //   stage: 3,
  //   received: 35000,
  //   total: 35000,
  // },
  // {
  //   id: 2,
  //   project: "Bridge Construction",
  //   deliveryId: "DEL-002",
  //   amount: 55000,
  //   status: "Pending",
  //   lastPayment: "2025-05-18",
  //   invoice: "invoice_DEL-002.pdf",
  //   stage: 2,
  //   received: 40000,
  //   total: 55000,
  // },
  // {
  //   id: 3,
  //   project: "School Renovation",
  //   deliveryId: "DEL-003",
  //   amount: 12000,
  //   status: "On Hold",
  //   lastPayment: "2025-05-10",
  //   invoice: "invoice_DEL-003.pdf",
  //   stage: 1,
  //   received: 0,
  //   total: 12000,
  // },
];

const statusConfig = {
  Paid: {
    color: "bg-emerald-400/20 text-emerald-400",
    icon: CheckCircle,
    label: "Paid",
  },
  Pending: {
    color: "bg-yellow-400/20 text-yellow-400",
    icon: Clock,
    label: "Pending",
  },
  "On Hold": {
    color: "bg-red-400/20 text-red-400",
    icon: AlertTriangle,
    label: "On Hold",
  },
};

const stageSteps = [
  { label: "Invoice Submitted", icon: FileText },
  { label: "Processing", icon: Clock },
  { label: "Paid", icon: CheckCircle },
];

const projects = [
  "All Projects",
  ...Array.from(new Set(mockPayments.map((p) => p.project))),
];

export default function FundTracker() {
  const [filterProject, setFilterProject] = useState("All Projects");
  const [filterStatus, setFilterStatus] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [sort, setSort] = useState("Newest First");
  const [showFilters, setShowFilters] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Filtering logic
  let filtered = mockPayments.filter((p) =>
    (filterProject === "All Projects" || p.project === filterProject) &&
    (filterStatus.length === 0 || filterStatus.includes(p.status)) &&
    (!dateRange.start || p.lastPayment >= dateRange.start) &&
    (!dateRange.end || p.lastPayment <= dateRange.end)
  );
  if (sort === "Amount High → Low") filtered = [...filtered].sort((a, b) => b.amount - a.amount);
  else filtered = [...filtered].sort((a, b) => b.lastPayment.localeCompare(a.lastPayment));

  // Summary
  const totalBalance = mockPayments.reduce((sum, p) => sum + (p.status === "Paid" ? p.amount : 0), 0);
  const pendingAmount = mockPayments.reduce((sum, p) => sum + (p.status === "Pending" ? p.amount : 0), 0);

  // Print handler
  const handlePrint = (payment) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html><head><title>Invoice - ${payment.deliveryId}</title>
      <style>
        body { font-family: 'Inter', sans-serif; background: #0f172a; color: #e2e8f0; margin: 0; padding: 2rem; }
        .header { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; color: #f8fafc; }
        .section { margin-bottom: 1rem; }
        .label { font-weight: 600; color: #e2e8f0; }
        .badge { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.9rem; }
        .paid { background: rgba(16, 185, 129, 0.2); color: #10b981; }
        .pending { background: rgba(250, 204, 21, 0.2); color: #facc15; }
        .hold { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
      </style></head><body>
      <div class='header'>Official Invoice</div>
      <div class='section'><span class='label'>Project:</span> ${payment.project}</div>
      <div class='section'><span class='label'>Delivery ID:</span> ${payment.deliveryId}</div>
      <div class='section'><span class='label'>Date:</span> ${payment.lastPayment}</div>
      <div class='section'><span class='label'>Status:</span> <span class='badge ${payment.status === "Paid" ? "paid" : payment.status === "Pending" ? "pending" : "hold"}'>${payment.status}</span></div>
      <div class='section'><span class='label'>Amount:</span> ₹${payment.amount.toLocaleString()}</div>
      <div class='section'><span class='label'>Received:</span> ₹${payment.received.toLocaleString()} / ₹${payment.total.toLocaleString()}</div>
      <div class='section'><span class='label'>Stage:</span> ${payment.stage}</div>
      <div class='section'><span class='label'>Invoice File:</span> ${payment.invoice}</div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // PDF Download handler
  const handleDownload = (payment) => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 297, 'F');
    doc.setFont('helvetica');
    doc.setFontSize(18);
    doc.setTextColor(248, 250, 252);
    doc.text('Delivery Payment Receipt', 14, 18);
    doc.setFontSize(12);
    doc.setTextColor(226, 232, 240);
    doc.text(`Project: ${payment.project}`, 14, 32);
    doc.text(`Delivery ID: ${payment.deliveryId}`, 14, 40);
    doc.text(`Date: ${payment.lastPayment}`, 14, 48);
    doc.setTextColor(
      payment.status === "Paid" ? 16 : payment.status === "Pending" ? 250 : 239,
      payment.status === "Paid" ? 185 : payment.status === "Pending" ? 204 : 68,
      payment.status === "Paid" ? 129 : payment.status === "Pending" ? 21 : 68
    );
    doc.text(`Status: ${payment.status}`, 14, 56);
    doc.setTextColor(226, 232, 240);
    doc.text(`Amount: ₹${payment.amount.toLocaleString()}`, 14, 64);
    doc.text(`Received: ₹${payment.received.toLocaleString()} / ₹${payment.total.toLocaleString()}`, 14, 72);
    doc.text(`Stage: ${payment.stage}`, 14, 80);
    doc.text(`Invoice File: ${payment.invoice}`, 14, 88);
    doc.save(`PaymentReceipt_${payment.deliveryId}.pdf`);
  };

  return (
    <div className="p-6 md:p-8 font-sans min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Floating Summary Bar */}
      <div className="rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-md px-8 py-5 mb-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-lg">
        <div className="flex items-center gap-3 font-bold text-white text-xl">
          <CreditCard className="w-6 h-6 text-emerald-400" />
          Total Balance:
          <span className="ml-2 text-emerald-400">₹{totalBalance.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-3 font-bold text-white text-xl">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          Pending Amount:
          <span className="ml-2 text-yellow-400">₹{pendingAmount.toLocaleString()}</span>
        </div>
      </div>
      {/* Filter Panel */}
      <div className="rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-md px-8 py-4 mb-8 flex flex-wrap gap-4 items-center min-h-[64px] text-base">
        {/* Project Filter */}
        <div className="flex items-center gap-1">
          <Building className="w-4 h-4 text-emerald-400" />
          <label className="text-slate-300 text-xs whitespace-nowrap">Project:</label>
          <select
            className="px-2 py-1 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-xs"
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
          >
            {projects.map((proj) => (
              <option key={proj} className="bg-slate-700 text-white">{proj}</option>
            ))}
          </select>
        </div>
        {/* Status Filter as Dropdown */}
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 text-yellow-400" />
          <label className="text-slate-300 text-xs whitespace-nowrap">Status:</label>
          <select
            className="px-2 py-1 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-xs"
            value={filterStatus[0] || "All"}
            onChange={e => setFilterStatus(e.target.value === "All" ? [] : [e.target.value])}
          >
            <option className="bg-slate-700 text-white">All</option>
            {Object.keys(statusConfig).map((status) => (
              <option key={status} className="bg-slate-700 text-white">{status}</option>
            ))}
          </select>
        </div>
        {/* Date Range */}
        <div className="flex items-center gap-1">
          <CalendarClock className="w-4 h-4 text-cyan-400" />
          <label className="text-slate-300 text-xs whitespace-nowrap">Date:</label>
          <input
            type="date"
            className="px-2 py-1 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-xs"
            value={dateRange.start}
            onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
          />
          <span className="text-slate-300">to</span>
          <input
            type="date"
            className="px-2 py-1 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-xs"
            value={dateRange.end}
            onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
          />
        </div>
        {/* Sort */}
        <div className="flex items-center gap-1 ml-auto">
          <ChevronDown className="w-4 h-4 text-slate-300" />
          <span className="text-slate-300 text-xs">Sort:</span>
          <select
            className="px-2 py-1 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-xs"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option className="bg-slate-700 text-white">Newest First</option>
            <option className="bg-slate-700 text-white">Amount High → Low</option>
          </select>
        </div>
      </div>
      {/* Payment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((payment) => {
          const status = statusConfig[payment.status];
          return (
            <div
              key={payment.id}
              className="relative rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-md p-4 flex flex-col gap-3 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20 hover:border-emerald-400/50 group text-sm"
              tabIndex={0}
              aria-label={`Payment for ${payment.project}`}
            >
              {/* Top Row: Project, Delivery, Amount, Date, Invoice */}
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <div className="flex items-center gap-1 min-w-0">
                  <Building className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="truncate font-semibold text-white text-sm" title={payment.project}>{payment.project}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-700/50 text-xs text-slate-300 font-semibold">
                    <CreditCard className="w-3 h-3 text-emerald-400" />
                    ₹{payment.amount.toLocaleString()}
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-700/50 text-xs text-slate-300 font-semibold">
                    <FileText className="w-3 h-3 text-cyan-400" />
                    <a href={`/${payment.invoice}`} download className="hover:underline">Invoice</a>
                  </span>
                </div>
              </div>
              {/* Delivery ID, Date, Status */}
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-700/50 text-xs text-slate-300 font-semibold">
                    <span>Delivery ID:</span> {payment.deliveryId}
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-700/50 text-xs text-slate-300 font-semibold">
                    <CalendarClock className="w-3 h-3 text-cyan-400" />
                    {payment.lastPayment}
                  </span>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${status.color} border border-slate-600/50 transition-all duration-300`}>
                  <status.icon className="w-3 h-3" /> {status.label}
                </span>
              </div>
              {/* Payment Progress Bar */}
              <ProgressBar
                value={payment.received}
                max={payment.total}
                label="Payment Progress"
                tooltip={`Payment Progress: ${Math.round((payment.received / payment.total) * 100)}% (₹${payment.received.toLocaleString()} / ₹${payment.total.toLocaleString()})`}
              />
              {/* Payment Stage Tracker */}
              <div className="flex items-center gap-2 mt-1">
                {stageSteps.map((step, idx) => {
                  const active = payment.stage > idx;
                  return (
                    <div key={step.label} className="flex flex-col items-center group/step">
                      <div
                        className={`w-6 h-6 flex items-center justify-center rounded-full border-2 ${active ? "border-emerald-400 bg-emerald-400/20" : "border-slate-700 bg-slate-800/40"}`}
                        title={step.label}
                        aria-label={step.label}
                      >
                        <step.icon className={`w-3 h-3 ${active ? "text-emerald-400" : "text-slate-400"}`} />
                      </div>
                      <span className="mt-0.5 text-[11px] text-slate-300 group-hover/step:text-white transition">{step.label}</span>
                    </div>
                  );
                })}
              </div>
              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-1">
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  aria-label="View Details"
                  onClick={() => { setModalData(payment); setModalOpen(true); }}
                >
                  <Eye className="w-3 h-3" /> View
                </button>
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-700/50 text-slate-200 hover:bg-slate-600/50 transition-all text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  aria-label="Print Invoice"
                  onClick={() => handlePrint(payment)}
                >
                  <Printer className="w-3 h-3 text-slate-300" /> Print
                </button>
                <button
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  aria-label="Download Invoice"
                  onClick={() => handleDownload(payment)}
                >
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* View Details Modal */}
      <ViewDetailsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        data={modalData}
        type="payment"
      />
    </div>
  );
}