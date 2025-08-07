import React, { useState } from 'react';
import { Eye, EyeOff, User, File, Edit2, Smartphone, Briefcase, MapPin, Mail } from 'lucide-react';

const initialProfile = {
  fullName: 'Amit Sharma',
  email: 'amit.sharma@govt.com',
  mobile: '9876543210',
  department: 'Public Works',
  designation: 'Project Manager',
  region: 'North',
  authority: 'S. Verma',
  address: 'PWD Office, Sector 12, Delhi',
  profilePic: null,
  kyc: null,
  newPassword: '',
  confirmPassword: '',
};

const regions = ['North', 'South', 'East', 'West', 'Central'];

function ModernInput({ label, icon: Icon, ...props }) {
  return (
    <div className="mb-4">
      <label className="block text-secondary text-sm mb-1 font-medium flex items-center gap-2">
        {Icon && <Icon className="text-accent" size={18} />} {label}
      </label>
      <input
        {...props}
        className={`input w-full py-3 rounded-xl border border-accent/20 bg-white focus:border-[#2A4D69] focus:ring-2 focus:ring-[#2A4D69]/20 transition text-base disabled:bg-gray-100 disabled:cursor-not-allowed`}
      />
    </div>
  );
}

export default function ProfileForm() {
  const [profile, setProfile] = useState(initialProfile);
  const [edit, setEdit] = useState({ personal: false, org: false, security: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFile = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.files[0] });
  };

  const handleEdit = (section) => setEdit({ ...edit, [section]: !edit[section] });

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setEdit({ personal: false, org: false, security: false });
      setTimeout(() => setSuccess(false), 2000);
    }, 1200);
  };

  return (
    <form onSubmit={handleSave} className="space-y-10">
      {/* Personal Info */}
      <div className="bg-[#F7F9FC] rounded-2xl p-8 shadow-card relative">
        <div className="flex justify-between items-center mb-6">
          <div className="font-bold text-xl text-primary flex items-center gap-2"><User size={20}/> Personal Information</div>
          <button type="button" onClick={() => handleEdit('personal')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-accent/20 text-primary hover:bg-accent/10 hover:border-accent transition font-medium shadow-sm"><Edit2 size={16}/> {edit.personal ? 'Cancel' : 'Edit'}</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ModernInput label="Full Name" icon={User} name="fullName" value={profile.fullName} onChange={handleChange} readOnly={!edit.personal} />
          <ModernInput label="Email" icon={Mail} name="email" value={profile.email} readOnly disabled />
          <ModernInput label="Mobile Number" icon={Smartphone} name="mobile" value={profile.mobile} onChange={handleChange} readOnly={!edit.personal} />
          <ModernInput label="Department" icon={Briefcase} name="department" value={profile.department} readOnly disabled />
          <ModernInput label="Designation/Role" icon={Briefcase} name="designation" value={profile.designation} onChange={handleChange} readOnly={!edit.personal} />
        </div>
      </div>
      {/* Organizational Info */}
      <div className="bg-[#F7F9FC] rounded-2xl p-8 shadow-card relative">
        <div className="flex justify-between items-center mb-6">
          <div className="font-bold text-xl text-primary flex items-center gap-2"><File size={20}/> Organizational Info</div>
          <button type="button" onClick={() => handleEdit('org')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-accent/20 text-primary hover:bg-accent/10 hover:border-accent transition font-medium shadow-sm"><Edit2 size={16}/> {edit.org ? 'Cancel' : 'Edit'}</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-secondary text-sm mb-1 font-medium">Assigned Region/Zone</label>
            <select name="region" value={profile.region} onChange={handleChange} className="input w-full rounded-xl border border-accent/20 bg-white focus:border-[#2A4D69] focus:ring-2 focus:ring-[#2A4D69]/20 transition text-base disabled:bg-gray-100 disabled:cursor-not-allowed" disabled={!edit.org}>
              {regions.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <ModernInput label="Reporting Authority" icon={User} name="authority" value={profile.authority} onChange={handleChange} readOnly={!edit.org} />
        </div>
        <div className="mt-2 mb-4">
          <label className="block text-secondary text-sm mb-1 font-medium">Office Address</label>
          <textarea name="address" value={profile.address} onChange={handleChange} className="input w-full rounded-xl border border-accent/20 bg-white focus:border-[#2A4D69] focus:ring-2 focus:ring-[#2A4D69]/20 transition text-base disabled:bg-gray-100 disabled:cursor-not-allowed" rows={2} readOnly={!edit.org} />
        </div>
      </div>
      {/* Account & Security */}
      <div className="bg-[#F7F9FC] rounded-2xl p-8 shadow-card relative">
        <div className="flex justify-between items-center mb-6">
          <div className="font-bold text-xl text-primary flex items-center gap-2"><File size={20}/> Account & Security</div>
          <button type="button" onClick={() => handleEdit('security')} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-accent/20 text-primary hover:bg-accent/10 hover:border-accent transition font-medium shadow-sm"><Edit2 size={16}/> {edit.security ? 'Cancel' : 'Edit'}</button>
        </div>
        <div className="flex flex-wrap gap-8 mb-4">
          <div className="mb-4">
            <label className="block text-secondary text-sm mb-1 font-medium">Profile Picture</label>
            <input type="file" name="profilePic" accept="image/*" onChange={handleFile} className="input" disabled={!edit.security} />
            {profile.profilePic && (
              <img src={URL.createObjectURL(profile.profilePic)} alt="Profile Preview" className="mt-2 w-16 h-16 rounded-full object-cover border shadow" />
            )}
          </div>
          <div className="mb-4">
            <label className="block text-secondary text-sm mb-1 font-medium">KYC / Govt. ID</label>
            <input type="file" name="kyc" accept="image/*,application/pdf" onChange={handleFile} className="input" disabled={!edit.security} />
            {profile.kyc && (
              <span className="block mt-2 text-xs text-secondary">{profile.kyc.name}</span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-secondary text-sm mb-1 font-medium">New Password</label>
            <div className="relative">
              <input
                name="newPassword"
                value={profile.newPassword}
                onChange={handleChange}
                className="input w-full pr-12 rounded-xl border border-accent/20 bg-white focus:border-[#2A4D69] focus:ring-2 focus:ring-[#2A4D69]/20 transition text-base h-12"
                type={showPassword ? 'text' : 'password'}
                readOnly={!edit.security}
                autoComplete="new-password"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-0 top-0 h-full px-3 flex items-center text-accent"
                style={{ pointerEvents: edit.security ? 'auto' : 'none', opacity: edit.security ? 1 : 0.5 }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={24}/> : <Eye size={24}/>}
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-secondary text-sm mb-1 font-medium">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                value={profile.confirmPassword}
                onChange={handleChange}
                className="input w-full pr-12 rounded-xl border border-accent/20 bg-white focus:border-[#2A4D69] focus:ring-2 focus:ring-[#2A4D69]/20 transition text-base h-12"
                type={showConfirm ? 'text' : 'password'}
                readOnly={!edit.security}
                autoComplete="new-password"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowConfirm(v => !v)}
                className="absolute right-0 top-0 h-full px-3 flex items-center text-accent"
                style={{ pointerEvents: edit.security ? 'auto' : 'none', opacity: edit.security ? 1 : 0.5 }}
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm ? <EyeOff size={24}/> : <Eye size={24}/>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="btn bg-[#2A4D69] text-white hover:bg-accent w-full rounded-xl py-3 text-lg font-semibold shadow-md transition disabled:opacity-60" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
      {success && <div className="text-success text-center mt-2">Profile updated successfully!</div>}
    </form>
  );
} 