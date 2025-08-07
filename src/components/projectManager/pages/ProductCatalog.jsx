import React, { useState } from "react";
import { Plus, Search, Edit, Trash2, Package, X, UploadCloud, Image as ImageIcon, Clock, TrendingUp, AlertCircle, CheckCircle, Filter, RotateCcw, Building, Package as PackageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ProductCard } from "../components/catalog";
import { Toast, Tooltip } from "../components/shared";

const categories = ["All", "Cement", "Steel", "Bricks", "Pipes"];
const stockStatuses = ["All", "In Stock", "Low Stock"];

const initialProducts = [
  {
    id: 1,
    name: "Portland Cement",
    unit: "Tons",
    price: 2000,
    status: "In Stock",
    category: "Cement",
    updated: "2h ago",
    fullTimestamp: "2025-01-15 14:30",
    sold: 45,
    lastWeek: 12,
    isNew: true,
  },
  {
    id: 2,
    name: "TMT Steel Bars",
    unit: "Kgs",
    price: 65,
    status: "Low Stock",
    category: "Steel",
    updated: "1d ago",
    fullTimestamp: "2025-01-14 09:15",
    sold: 120,
    lastWeek: 38,
    isNew: false,
  },
  {
    id: 3,
    name: "Red Bricks",
    unit: "Boxes",
    price: 500,
    status: "In Stock",
    category: "Bricks",
    updated: "3h ago",
    fullTimestamp: "2025-01-15 11:45",
    sold: 89,
    lastWeek: 25,
    isNew: false,
  },
  {
    id: 4,
    name: "Concrete Pipes",
    unit: "Units",
    price: 1200,
    status: "In Stock",
    category: "Pipes",
    updated: "5h ago",
    fullTimestamp: "2025-01-15 08:20",
    sold: 23,
    lastWeek: 7,
    isNew: true,
  },
];

function getUpdateBadgeColor(timeAgo) {
  if (timeAgo.includes('h') && parseInt(timeAgo) <= 1) return "bg-emerald-400/20 text-emerald-400";
  if (timeAgo.includes('h') || timeAgo.includes('d') && parseInt(timeAgo) <= 1) return "bg-cyan-400/20 text-cyan-400";
  return "bg-yellow-400/20 text-yellow-400";
}

export default function ProductCatalog() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [stock, setStock] = useState("All");
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    unit: "Tons",
    price: "",
    status: "In Stock",
    icon: null,
  });
  const [addError, setAddError] = useState("");
  const [toast, setToast] = useState(null);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    const matchesStock = stock === "All" || p.status === stock;
    return matchesSearch && matchesCategory && matchesStock;
  });

  // Calculate metrics
  const totalProducts = products.length;
  const avgPrice = Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length);
  const lowStockItems = products.filter(p => p.status === "Low Stock").length;

  // Edit Handlers
  const openEdit = (product) => setEditModal(product);
  const closeEdit = () => setEditModal(null);
  const handleEditChange = (e) => {
    setEditModal({ ...editModal, [e.target.name]: e.target.value });
  };
  const saveEdit = (e) => {
    e.preventDefault();
    setProducts((prev) => prev.map((p) => (p.id === editModal.id ? { ...editModal, updated: "now" } : p)));
    setToast("Product updated");
    closeEdit();
  };

  // Delete Handlers
  const openDelete = (product) => setDeleteModal(product);
  const closeDelete = () => setDeleteModal(null);
  const confirmDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteModal.id));
    setToast("Product deleted");
    closeDelete();
  };

  // Add Handlers
  const openAdd = () => {
    setAddForm({ name: "", unit: "Tons", price: "", status: "In Stock", icon: null });
    setAddError("");
    setAddModal(true);
  };
  const closeAdd = () => setAddModal(false);
  const handleAddChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "icon") {
      setAddForm((f) => ({ ...f, icon: files[0] }));
    } else {
      setAddForm((f) => ({ ...f, [name]: value }));
    }
  };
  const submitAdd = (e) => {
    e.preventDefault();
    if (!addForm.name.trim() || !addForm.unit || !addForm.price || !addForm.status) {
      setAddError("All fields except icon are required.");
      return;
    }
    setProducts((prev) => [
      {
        id: Date.now(),
        name: addForm.name,
        unit: addForm.unit,
        price: addForm.price,
        status: addForm.status,
        category: "Other",
        updated: "now",
        icon: addForm.icon || null,
        sold: 0,
        lastWeek: 0,
        isNew: true,
      },
      ...prev,
    ]);
    setToast("Product added successfully");
    closeAdd();
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setStock("All");
  };

  return (
    <div className="p-6 md:p-8 font-sans overflow-x-hidden ">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h2 className="text-2xl font-bold text-cyan-400">Product Catalog</h2>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </span>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800/40 backdrop-blur-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 border border-slate-700/50"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search products"
            />
          </div>
          <button
            className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold flex items-center gap-2 shadow hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-emerald-400"
            onClick={openAdd}
          >
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-400" />
            <label className="text-slate-400 text-sm whitespace-nowrap">Category:</label>
            <select
              className="px-3 py-1.5 rounded-lg bg-slate-800/40 backdrop-blur-sm text-white border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-sm"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(c => <option key={c} className="bg-slate-800 text-white">{c}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <PackageIcon className="w-4 h-4 text-emerald-400" />
            <label className="text-slate-400 text-sm whitespace-nowrap">Stock:</label>
            <select
              className="px-3 py-1.5 rounded-lg bg-slate-800/40 backdrop-blur-sm text-white border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 text-sm"
              value={stock}
              onChange={e => setStock(e.target.value)}
            >
              {stockStatuses.map(s => <option key={s} className="bg-slate-800 text-white">{s}</option>)}
            </select>
          </div>
          <Tooltip content="Reset all filters">
            <button
              onClick={resetFilters}
              className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 transition"
            >
              <RotateCcw className="w-4 h-4 text-slate-300" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-full">
        {filtered.map(product => (
          <motion.div
            key={product.id}
            whileHover={{ scale: 1.02, boxShadow: "0 8px 32px 0 rgba(45, 212, 191, 0.15)" }}
            className="relative rounded-2xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 shadow-md p-6 flex flex-col gap-3 transition-all min-h-[240px] group"
            tabIndex={0}
            aria-label={product.name}
          >
            {/* New/Low Stock Indicator */}
            {product.isNew && (
              <div className="absolute top-3 left-3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            )}
            {product.status === "Low Stock" && (
              <div className="absolute top-3 left-3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            )}

            {/* Last Updated Badge */}
            <div className="absolute top-3 right-3">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shadow-sm ${getUpdateBadgeColor(product.updated)}`}>
                <Clock className="w-3 h-3" />
                {product.updated}
              </span>
            </div>

            {/* Product Icon */}
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-700/50 mb-2">
              <Package className="w-7 h-7 text-slate-300" />
            </div>

            <div className="text-lg font-bold text-white mb-1">{product.name}</div>
            
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span className="bg-slate-700/50 px-2 py-0.5 rounded-full">{product.unit}</span>
              <span className="ml-2 text-emerald-400 font-semibold">₹{product.price} <span className="text-xs font-normal text-slate-400">/ {product.unit.toLowerCase()}</span></span>
            </div>

            {/* Mini Stats */}
            <div className="text-xs text-slate-400">
              Sold: {product.sold} | Last Week: {product.lastWeek}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className={`px-3 py-0.5 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1 ${
                product.status === "In Stock" 
                  ? "bg-emerald-400/20 text-emerald-400" 
                  : "bg-yellow-400/20 text-yellow-400"
              }`}>
                {product.status === "In Stock" ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                {product.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <button 
                className="p-2 rounded-full bg-slate-700/50 hover:bg-cyan-400/20 transition" 
                aria-label="Edit product" 
                onClick={() => openEdit(product)}
              >
                <Edit className="w-4 h-4 text-cyan-400" />
              </button>
              <button 
                className="p-2 rounded-full bg-slate-700/50 hover:bg-red-400/20 transition" 
                aria-label="Delete product" 
                onClick={() => openDelete(product)}
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-slate-400 py-12">No products found.</div>
        )}
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[6px]" onClick={closeEdit} />
          <motion.form
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onSubmit={saveEdit}
            className="relative z-10 w-full max-w-md mx-auto rounded-xl bg-slate-800/40 backdrop-blur-sm shadow-2xl border border-slate-700/50 p-8"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Edit Product</h3>
              <button type="button" onClick={closeEdit} className="text-slate-400 hover:text-red-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1">Name</label>
                <input
                  className="w-full px-3 py-2 rounded bg-slate-800/40 backdrop-blur-sm text-white border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  name="name"
                  value={editModal.name}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Unit</label>
                <input
                  className="w-full px-3 py-2 rounded bg-slate-800/40 backdrop-blur-sm text-white border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  name="unit"
                  value={editModal.unit}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Price</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 rounded bg-slate-800/40 backdrop-blur-sm text-white border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  name="price"
                  value={editModal.price}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Stock Status</label>
                <select
                  className="w-full px-3 py-2 rounded bg-slate-800/40 backdrop-blur-sm text-white border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  name="status"
                  value={editModal.status}
                  onChange={handleEditChange}
                  required
                >
                  <option>In Stock</option>
                  <option>Low Stock</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-8">
              <button type="button" className="px-4 py-2 rounded bg-slate-700/50 text-slate-300 hover:bg-slate-600/50" onClick={closeEdit}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold shadow hover:scale-105 transition-transform">Save Changes</button>
            </div>
          </motion.form>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[6px]" onClick={closeDelete} />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative z-10 w-full max-w-md mx-auto rounded-xl bg-slate-800/40 backdrop-blur-sm shadow-2xl border border-slate-700/50 p-8"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Delete Product?</h3>
              <button type="button" onClick={closeDelete} className="text-slate-400 hover:text-red-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="mb-6 text-slate-400">Are you sure you want to delete <span className="font-semibold text-white">{deleteModal.name}</span>?</div>
            <div className="flex justify-end gap-2">
              <button type="button" className="px-4 py-2 rounded bg-slate-700/50 text-slate-300 hover:bg-slate-600/50" onClick={closeDelete}>Cancel</button>
              <button type="button" className="px-4 py-2 rounded bg-gradient-to-r from-red-400 to-yellow-400 text-slate-900 font-semibold shadow hover:scale-105 transition-transform" onClick={confirmDelete}>Delete</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Product Modal */}
      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[6px]" onClick={closeAdd} />
          <motion.form
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onSubmit={submitAdd}
            className="relative z-10 w-full max-w-md mx-auto rounded-xl bg-slate-800/40 backdrop-blur-sm shadow-2xl border border-slate-700/50 p-8"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Add New Product</h3>
              <button type="button" onClick={closeAdd} className="text-slate-400 hover:text-red-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1">Product Name</label>
                <input
                  className="w-full px-3 py-2 rounded bg-slate-800/40 backdrop-blur-sm text-white border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  name="name"
                  value={addForm.name}
                  onChange={handleAddChange}
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Unit</label>
                <select
                  className="w-full px-3 py-2 rounded bg-slate-800/40 backdrop-blur-sm text-white border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  name="unit"
                  value={addForm.unit}
                  onChange={handleAddChange}
                  required
                >
                  <option>Tons</option>
                  <option>Kgs</option>
                  <option>Boxes</option>
                  <option>Units</option>
                  <option>Bags</option>
                  <option>Liters</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Price per unit</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 rounded bg-slate-800/40 backdrop-blur-sm text-white border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  name="price"
                  value={addForm.price}
                  onChange={handleAddChange}
                  required
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Stock Status</label>
                <select
                  className="w-full px-3 py-2 rounded bg-slate-800/40 backdrop-blur-sm text-white border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  name="status"
                  value={addForm.status}
                  onChange={handleAddChange}
                  required
                >
                  <option>In Stock</option>
                  <option>Low Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Product Icon (optional)</label>
                <label
                  htmlFor="icon-upload"
                  className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-700/50 rounded-lg cursor-pointer bg-slate-800/40 backdrop-blur-sm hover:border-emerald-400/50 transition group focus-within:border-emerald-400/50"
                  tabIndex={0}
                >
                  {addForm.icon ? (
                    <>
                      <img
                        src={URL.createObjectURL(addForm.icon)}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded mb-1 mt-2 shadow"
                      />
                      <span className="text-xs text-emerald-400">{addForm.icon.name}</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-emerald-400 mb-1" />
                      <span className="text-xs text-slate-400 group-hover:text-emerald-400">Drag & drop or click to upload</span>
                    </>
                  )}
                  <input
                    id="icon-upload"
                    type="file"
                    name="icon"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAddChange}
                  />
                </label>
              </div>
              {addError && <div className="text-red-400 text-sm mt-2">{addError}</div>}
            </div>
            <div className="flex justify-end gap-2 mt-8">
              <button type="button" className="px-4 py-2 rounded bg-slate-700/50 text-slate-300 hover:bg-slate-600/50" onClick={closeAdd}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-900 font-semibold shadow hover:scale-105 transition-transform">Add Product</button>
            </div>
          </motion.form>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}