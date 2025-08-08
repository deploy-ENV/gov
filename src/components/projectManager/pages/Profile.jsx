import React, { useState } from "react";

const initialProfile = {
  name: "",
  gstin: "",
  pan: "",
  bank: "",
  account: "",
  ifsc: "SBIN000234",
  email: "",
  phone: "",
  proof: null,
};

export default function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(initialProfile);
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setProfile({ ...form, proof: file || form.proof });
    setEdit(false);
    setFile(null);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Supplier Profile</h2>
      <div className="rounded-xl bg-[#1A1F36]/80 border border-gray-700 shadow-md backdrop-blur-md p-8 w-full">
        {!edit ? (
          <>
            <div className="mb-4">
              <div className="text-gray-400 text-sm">Supplier Name</div>
              <div className="text-white font-semibold text-lg">{profile.name}</div>
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-gray-400 text-sm">GSTIN</div>
                <div className="text-white font-semibold">{profile.gstin}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">PAN</div>
                <div className="text-white font-semibold">{profile.pan}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Bank Name</div>
                <div className="text-white font-semibold">{profile.bank}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Account Number</div>
                <div className="text-white font-semibold">{profile.account}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">IFSC Code</div>
                <div className="text-white font-semibold">{profile.ifsc}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Email</div>
                <div className="text-white font-semibold">{profile.email}</div>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Phone</div>
                <div className="text-white font-semibold">{profile.phone}</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-gray-400 text-sm">Proof (GSTIN/PAN/Bank)</div>
              {profile.proof ? (
                <a
                  href={typeof profile.proof === "string" ? profile.proof : URL.createObjectURL(profile.proof)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 underline hover:text-emerald-300 transition"
                  download
                >
                  {typeof profile.proof === "string" ? profile.proof : profile.proof.name}
                </a>
              ) : (
                <span className="text-gray-400">No proof uploaded</span>
              )}
            </div>
            <button
              className="mt-6 px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold shadow hover:scale-105 transition-transform"
              onClick={() => setEdit(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Supplier Name</label>
              <input
                className="w-full px-3 py-2 rounded bg-[#1A1F36] text-white border border-gray-700 focus:outline-none"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-1">GSTIN</label>
                <input
                  className="w-full px-3 py-2 rounded bg-[#1A1F36] text-white border border-gray-700 focus:outline-none"
                  name="gstin"
                  value={form.gstin}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">PAN</label>
                <input
                  className="w-full px-3 py-2 rounded bg-[#1A1F36] text-white border border-gray-700 focus:outline-none"
                  name="pan"
                  value={form.pan}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Bank Name</label>
                <input
                  className="w-full px-3 py-2 rounded bg-[#1A1F36] text-white border border-gray-700 focus:outline-none"
                  name="bank"
                  value={form.bank}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Account Number</label>
                <input
                  className="w-full px-3 py-2 rounded bg-[#1A1F36] text-white border border-gray-700 focus:outline-none"
                  name="account"
                  value={form.account}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">IFSC Code</label>
                <input
                  className="w-full px-3 py-2 rounded bg-[#1A1F36] text-white border border-gray-700 focus:outline-none"
                  name="ifsc"
                  value={form.ifsc}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  className="w-full px-3 py-2 rounded bg-[#1A1F36] text-white border border-gray-700 focus:outline-none"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Phone</label>
                <input
                  className="w-full px-3 py-2 rounded bg-[#1A1F36] text-white border border-gray-700 focus:outline-none"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Proof (GSTIN/PAN/Bank)</label>
              <input
                type="file"
                accept="image/*,application/pdf"
                className="w-full text-gray-200"
                onChange={handleFile}
              />
              {(file || form.proof) && (
                <div className="mt-2 text-emerald-400 text-xs">
                  {(file && file.name) || (form.proof && form.proof.name)}
                </div>
              )}
            </div>
            <div className="flex gap-2 justify-end mt-6">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-700 text-gray-200 hover:bg-gray-600"
                onClick={() => { setEdit(false); setFile(null); }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold shadow hover:scale-105 transition-transform"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 