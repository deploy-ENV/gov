import React from 'react';
import { Shield, User } from 'lucide-react';
import styles from './styles.module.css';

const Header = () => (
  <nav className={`flex justify-between items-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 sm:py-4 md:py-5 lg:py-6 bg-gradient-to-r from-dark-bg via-dark-surface to-dark-bg shadow-lg border-b border-slate-700 rounded-b-2xl sm:rounded-b-3xl ${styles.nav}`}>
    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-main">
      <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-accent-gold/30 to-accent-teal/30 rounded-xl sm:rounded-2xl flex items-center justify-center border border-accent-gold/30">
        <Shield size={16} className="sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-accent-gold" />
      </div>
      <span className={`text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold tracking-widest text-accent-gold ml-1 sm:ml-2 md:ml-3 lg:ml-4 ${styles.logo}`}>SecurePortal</span>
    </div>
    <button className={`flex items-center gap-1 sm:gap-2 md:gap-3 bg-gradient-to-r from-accent-gold to-accent-teal text-dark-bg px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm md:text-base lg:text-lg hover:from-accent-teal hover:to-accent-gold transition-all hover:-translate-y-1 shadow-xl border-2 border-accent-gold/50 min-h-[40px] sm:min-h-[48px] md:min-h-[56px] ${styles.accountBtn}`}>
      <User size={16} className="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
      <span className="font-bold hidden sm:inline">Account</span>
    </button>
  </nav>
);

export default Header; 