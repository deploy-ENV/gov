import React, { useState, useEffect } from 'react';
import { Bell, File, Eye, Moon, Globe, Settings as SettingsIcon, ShieldCheck } from 'lucide-react';

const dashboardViews = ['Home', 'All Projects', 'Alerts'];
const exportFormats = ['PDF', 'Excel', 'CSV'];
const languages = ['English', 'Hindi', 'Odia'];

function ThemeToggle({ value, onChange }) {
  return (
    <button
      type="button"
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-accent/30 bg-white text-primary hover:bg-accent/10 focus:outline-none focus:ring-2 focus:ring-[#2A4D69]/30 transition font-medium shadow-sm ${value === 'dark' ? 'bg-[#2A4D69] text-white' : ''}`}
      onClick={() => onChange(value === 'light' ? 'dark' : 'light')}
    >
      <Moon size={18} /> {value === 'light' ? 'Switch to Dark' : 'Switch to Light'}
    </button>
  );
}

function LanguageDropdown({ value, onChange }) {
  return (
    <select
      className="input w-full rounded-xl border border-accent/30 focus:ring-[#2A4D69]/30 focus:border-[#2A4D69] transition text-base"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      {languages.map(l => <option key={l}>{l}</option>)}
    </select>
  );
}

const initialSettings = {
  notifications: { bid: true, fund: true, supervisor: false, ai: false },
  language: localStorage.getItem('lang') || 'English',
  theme: localStorage.getItem('theme') || 'light',
  dashboard: 'Home',
  export: 'PDF',
  twofa: false,
};

export default function SettingsPanel() {
  const [settings, setSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    localStorage.setItem('theme', settings.theme);
    localStorage.setItem('lang', settings.language);
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme, settings.language]);

  const handleToggle = (key) => {
    setSettings({ ...settings, notifications: { ...settings.notifications, [key]: !settings.notifications[key] } });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };
  const handleTheme = (theme) => setSettings({ ...settings, theme });
  const handleLang = (lang) => setSettings({ ...settings, language: lang });
  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    }, 1200);
  };
  return (
    <form onSubmit={handleSave} className="space-y-10">
      <div className="bg-[#F7F9FC] rounded-2xl p-8 shadow-card">
        <div className="font-bold text-xl mb-4 text-primary flex items-center gap-2"><Bell size={20}/> Notification Preferences</div>
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" checked={settings.notifications.bid} onChange={() => handleToggle('bid')} className="accent-[#2A4D69] w-5 h-5 rounded focus:ring-[#2A4D69]/30" />
            <span className="text-base">New Bid Alerts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" checked={settings.notifications.fund} onChange={() => handleToggle('fund')} className="accent-[#2A4D69] w-5 h-5 rounded focus:ring-[#2A4D69]/30" />
            <span className="text-base">Fund Request Updates</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" checked={settings.notifications.supervisor} onChange={() => handleToggle('supervisor')} className="accent-[#2A4D69] w-5 h-5 rounded focus:ring-[#2A4D69]/30" />
            <span className="text-base">Supervisor Messages</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" checked={settings.notifications.ai} onChange={() => handleToggle('ai')} className="accent-[#2A4D69] w-5 h-5 rounded focus:ring-[#2A4D69]/30" />
            <span className="text-base">AI Alerts</span>
          </label>
        </div>
      </div>
      <div className="bg-[#F7F9FC] rounded-2xl p-8 shadow-card">
        <div className="font-bold text-xl mb-4 text-primary flex items-center gap-2"><SettingsIcon size={20}/> Preferences</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-secondary text-sm mb-1">Theme</label>
            <ThemeToggle value={settings.theme} onChange={handleTheme} />
          </div>
          <div>
            <label className="block text-secondary text-sm mb-1">Language</label>
            <LanguageDropdown value={settings.language} onChange={handleLang} />
          </div>
          <div>
            <label className="block text-secondary text-sm mb-1">Default Dashboard View</label>
            <select name="dashboard" value={settings.dashboard} onChange={handleChange} className="input w-full rounded-xl border border-accent/30 focus:ring-[#2A4D69]/30 focus:border-[#2A4D69] transition text-base">
              {dashboardViews.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-secondary text-sm mb-1">Preferred Export Format</label>
            <select name="export" value={settings.export} onChange={handleChange} className="input w-full rounded-xl border border-accent/30 focus:ring-[#2A4D69]/30 focus:border-[#2A4D69] transition text-base">
              {exportFormats.map(f => <option key={f}>{f}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="bg-[#F7F9FC] rounded-2xl p-8 shadow-card">
        <div className="font-bold text-xl mb-4 text-primary flex items-center gap-2"><ShieldCheck size={20}/> Security Settings</div>
        <div className="flex items-center gap-6 mb-2">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input type="checkbox" checked={settings.twofa} onChange={() => setSettings({ ...settings, twofa: !settings.twofa })} className="accent-[#2A4D69] w-5 h-5 rounded focus:ring-[#2A4D69]/30" />
            <span className="text-base">2FA (visual only)</span>
          </label>
          <span className="text-xs text-secondary">Last login: 2024-06-01 10:32 AM (IP: 192.168.1.10)</span>
        </div>
      </div>
      <button type="submit" className="btn bg-[#2A4D69] text-white hover:bg-accent w-full rounded-xl py-3 text-lg font-semibold shadow-md transition disabled:opacity-60" disabled={saving}>{saving ? 'Saving...' : 'Save Preferences'}</button>
      {success && <div className="text-success text-center mt-2">Preferences saved!</div>}
    </form>
  );
} 