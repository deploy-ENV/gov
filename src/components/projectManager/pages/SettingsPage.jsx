import React from 'react';
import SettingsPanel from '../components/SettingsPanel';

export default function SettingsPage() {
  return (
    <div className="w-full h-full bg-[#F7F9FC]">
      <div className="w-full h-full bg-white rounded-xl shadow-card p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Settings</h2>
        <SettingsPanel />
      </div>
    </div>
  );
} 