import React from 'react';
import ProfileForm from '../components/ProfileForm';

export default function ProfilePage() {
  return (
    <div className="w-full h-full bg-[#F7F9FC]">
      <div className="w-full h-full bg-white rounded-xl shadow-card p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Profile</h2>
        <ProfileForm />
      </div>
    </div>
  );
} 