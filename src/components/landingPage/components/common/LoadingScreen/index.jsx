import React from 'react';
import { Shield } from 'lucide-react';

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen min-w-full bg-gradient-to-br from-[#101624] via-[#162032] to-[#1a2233]">
      <div className="flex flex-col items-center gap-4 sm:gap-6">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin-slow absolute inset-0 rounded-full border-4 sm:border-6 md:border-8 border-[#1de9b6]/30 border-t-[#ffd580] border-b-[#1de9b6] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24" />
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#ffd580]/80 to-[#1de9b6]/80 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <Shield size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#101624] drop-shadow-lg" />
          </div>
        </div>
        <span className="text-lg sm:text-xl md:text-2xl text-[#ffd580] font-bold tracking-widest animate-fade-in">Secure Portal</span>
      </div>
      <style>{`
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 2s linear infinite; }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
        .animate-fade-in { animation: fade-in 1.2s ease-in; }
      `}</style>
    </div>
  );
}

export default LoadingScreen; 