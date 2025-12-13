import React, { useEffect, useState } from "react";
import { Plus, Search, Edit, Trash2, Package, X, CheckCircle, XCircle, ShoppingBag } from "lucide-react";
import Cookies from "js-cookie";
import { addProduct } from "../../../services/productService";
const initialProducts = [
  {
    id: 1,
    name: "Portland Cement",
    desp: "High-quality cement suitable for all construction needs. Premium grade with excellent binding properties.",
    price: 2000,
    available: true,
  },
  {
    id: 2,
    name: "TMT Steel Bars",
    desp: "Corrosion-resistant steel bars for reinforced concrete structures. Grade Fe500D with superior strength.",
    price: 65,
    available: false,
  },
  {
    id: 3,
    name: "Red Bricks",
    desp: "First-class red bricks with uniform size and shape. Perfect for wall construction and durability.",
    price: 500,
    available: true,
  },
  {
    id: 4,
    name: "Concrete Pipes",
    desp: "Heavy-duty concrete pipes for drainage and sewage systems. Reinforced for long-lasting performance.",
    price: 1200,
    available: true,
  },
];

export default function ProductCatalog() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [editModal, setEditModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [data,setData] = useState(null);
  
  const [addForm, setAddForm] = useState({
    name: "",
    desp: "",
    price: "",
    available: true,
  });
  const [addError, setAddError] = useState("");
  const [toast, setToast] = useState(null);
  useEffect(() => {
    const userDataCookie = Cookies.get("userData");
        if (userDataCookie) {
          setData(JSON.parse(userDataCookie));
        }
    const storedProducts = JSON.parse(Cookies.get("userData")).catalogProducts || JSON.parse(Cookies.get("catalogProducts"));
    if (storedProducts) {
      setProducts(storedProducts);
    }
  },[])
  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                         p.desp.toLowerCase().includes(search.toLowerCase());
    const matchesAvailability = availabilityFilter === "All" || 
                               (availabilityFilter === "Available" && p.available) ||
                               (availabilityFilter === "Unavailable" && !p.available);
    return matchesSearch && matchesAvailability;
  });

  const totalProducts = products.length;
  const availableProducts = products.filter(p => p.available).length;
  const avgPrice = products.length > 0 
    ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length) 
    : 0;

  const openEdit = (product) => setEditModal(product);
  const closeEdit = () => setEditModal(null);
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditModal({ 
      ...editModal, 
      [name]: type === "checkbox" ? checked : value 
    });
  };
  const saveEdit = (e) => {
    e.preventDefault();
    setProducts((prev) => prev.map((p) => (p.id === editModal.id ? editModal : p)));
    setToast("Product updated successfully");
    closeEdit();
  };

  const openDelete = (product) => setDeleteModal(product);
  const closeDelete = () => setDeleteModal(null);
  const confirmDelete = () => {
    setProducts((prev) => prev.filter((p) => p.id !== deleteModal.id));
    setToast("Product deleted successfully");
    closeDelete();
  };

  const openAdd = () => {
    setAddForm({ name: "", desp: "", price: "", available: true });
    setAddError("");
    setAddModal(true);
  };
  const closeAdd = () => setAddModal(false);
  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddForm((f) => ({ 
      ...f, 
      [name]: type === "checkbox" ? checked : value 
    }));
  };
  const submitAdd = async(e) => {
    e.preventDefault();
    if (!addForm.name.trim() || !addForm.desp.trim() || !addForm.price) {
      setAddError("Name, description, and price are required.");
      return;
    }
    setProducts((prev) => [
      {
        id: Date.now(),
        name: addForm.name,
        desp: addForm.desp,
        price: parseFloat(addForm.price),
        available: addForm.available,
      },
      ...prev,
    ]);
    try{
            const response = await addProduct(data.id,
            {
              
              name: addForm.name,
              desp: addForm.desp,
              price: parseFloat(addForm.price),
              available: addForm.available,
            }
          );
    setToast("Product added successfully");
            
            console.log(response);
          }catch(e){
            console.log("add product error",e);
            
          }
    closeAdd();
  };

  const Toast = ({ message, onClose }) => {
    React.useEffect(() => {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }, [onClose]);

    return (
      <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-lg shadow-xl animate-slide-up">
        {message}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 font-sans p-6 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Product Catalog</h1>
            <p className="text-slate-400">Manage your product inventory</p>
          </div>
          <button
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all"
            onClick={openAdd}
          >
            <Plus className="w-5 h-5" /> Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-400/20 to-cyan-400/20">
                <ShoppingBag className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Products</p>
                <p className="text-2xl font-bold text-white">{totalProducts}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-400/20 to-emerald-400/20">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Available</p>
                <p className="text-2xl font-bold text-white">{availableProducts}</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-400/20 to-orange-400/20">
                <Package className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Avg Price</p>
                <p className="text-2xl font-bold text-white">₹{avgPrice}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search products by name or description..."
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              value={availabilityFilter}
              onChange={e => setAvailabilityFilter(e.target.value)}
            >
              <option>All</option>
              <option>Available</option>
              <option>Unavailable</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <div
              key={product.id}
              className="relative rounded-xl bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-6 hover:shadow-xl hover:shadow-emerald-500/10 transition-all group"
            >
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  product.available 
                    ? "bg-emerald-400/20 text-emerald-400" 
                    : "bg-red-400/20 text-red-400"
                }`}>
                  {product.available ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      Available
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3" />
                      Unavailable
                    </>
                  )}
                </span>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 flex-shrink-0">
                  <Package className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-white mb-1 truncate">{product.name}</h3>
                  <p className="text-2xl font-bold text-emerald-400">₹{product.price}</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm mb-4 line-clamp-2">{product.desp}</p>

              <div className="flex gap-2 pt-4 border-t border-slate-700/50">
                <button 
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-cyan-400/20 text-cyan-400 font-medium transition flex items-center justify-center gap-2" 
                  onClick={() => openEdit(product)}
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button 
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-700/50 hover:bg-red-400/20 text-red-400 font-medium transition flex items-center justify-center gap-2" 
                  onClick={() => openDelete(product)}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-slate-400 py-16">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">No products found</p>
              <p className="text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeEdit} />
          <form
            onSubmit={saveEdit}
            className="relative z-10 w-full max-w-lg rounded-xl bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Edit Product</h3>
              <button type="button" onClick={closeEdit} className="text-slate-400 hover:text-white transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2 font-medium">Product Name</label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  name="name"
                  value={editModal.name}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2 font-medium">Description</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 resize-none"
                  name="desp"
                  value={editModal.desp}
                  onChange={handleEditChange}
                  rows={3}
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2 font-medium">Price (₹)</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  name="price"
                  value={editModal.price}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="edit-available"
                  name="available"
                  checked={editModal.available}
                  onChange={handleEditChange}
                  className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-2 focus:ring-emerald-400/50"
                />
                <label htmlFor="edit-available" className="text-slate-300 font-medium">Product is available</label>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button type="button" className="px-6 py-3 rounded-lg bg-slate-700/50 text-slate-200 hover:bg-slate-600/50 font-medium transition" onClick={closeEdit}>
                Cancel
              </button>
              <button type="submit" className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-semibold shadow-lg hover:brightness-110 transition">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeDelete} />
          <div className="relative z-10 w-full max-w-md rounded-xl bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Delete Product</h3>
              <button type="button" onClick={closeDelete} className="text-slate-400 hover:text-white transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-slate-300 mb-6">
              Are you sure you want to delete <span className="font-semibold text-white">{deleteModal.name}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button type="button" className="px-6 py-3 rounded-lg bg-slate-700/50 text-slate-200 hover:bg-slate-600/50 font-medium transition" onClick={closeDelete}>
                Cancel
              </button>
              <button type="button" className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold shadow-lg hover:brightness-110 transition" onClick={confirmDelete}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {addModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeAdd} />
          <form
            onSubmit={submitAdd}
            className="relative z-10 w-full max-w-lg rounded-xl bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 p-8 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Add New Product</h3>
              <button type="button" onClick={closeAdd} className="text-slate-400 hover:text-white transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 mb-2 font-medium">Product Name</label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  name="name"
                  value={addForm.name}
                  onChange={handleAddChange}
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2 font-medium">Description</label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 resize-none"
                  name="desp"
                  value={addForm.desp}
                  onChange={handleAddChange}
                  rows={3}
                  placeholder="Enter product description"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2 font-medium">Price (₹)</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-lg bg-slate-700/50 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                  name="price"
                  value={addForm.price}
                  onChange={handleAddChange}
                  placeholder="Enter price"
                  required
                />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="add-available"
                  name="available"
                  checked={addForm.available}
                  onChange={handleAddChange}
                  className="w-5 h-5 rounded border-slate-600 text-emerald-500 focus:ring-2 focus:ring-emerald-400/50"
                />
                <label htmlFor="add-available" className="text-slate-300 font-medium">Product is available</label>
              </div>
              {addError && <p className="text-red-400 text-sm mt-2">{addError}</p>}
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button type="button" className="px-6 py-3 rounded-lg bg-slate-700/50 text-slate-200 hover:bg-slate-600/50 font-medium transition" onClick={closeAdd}>
                Cancel
              </button>
              <button type="submit" className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-300 via-emerald-400 to-cyan-400 text-slate-900 font-semibold shadow-lg hover:brightness-110 transition">
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toast */}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}