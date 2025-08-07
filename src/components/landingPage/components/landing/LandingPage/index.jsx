import React from 'react';
import Header from '../../common/Header';
import Footer from '../../common/Footer';
import { ChevronLeft, ChevronRight, Shield, User, Send } from 'lucide-react';
import styles from './styles.module.css';
import AuthUserType from '../../auth/AuthUserType';
import AuthFlowModal from '../../auth/AuthFlowModal';

const CONTRACTOR_SUBTYPES = [
  { label: 'Individual Contractor', value: 'individual-contractor' },
  { label: 'Corporate Contractor', value: 'corporate-contractor' },
];

const LandingPage = ({
  showGovtOptions,
  setShowGovtOptions,
  prevSlide,
  nextSlide,
  currentSlide,
  setCurrentSlide,
  formData,
  handleInputChange,
  handleSubmit,
  formErrors,
  goToAuth,
  goToGovtLogin,
  goToGovtSignUp
}) => {
  const [selectedAuthType, setSelectedAuthType] = React.useState(null);
  const [showContractorModal, setShowContractorModal] = React.useState(false);

  const handleUserTypeSelect = (type) => {
    if (type === 'contractor') {
      setShowContractorModal(true);
    } else if (type === 'govt-officer') {
      setSelectedAuthType('govt-officer');
    } else {
      setSelectedAuthType(type);
    }
  };

  const handleContractorSubtype = (subType) => {
    setShowContractorModal(false);
    setSelectedAuthType(subType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-slate-bg to-slate-surface relative overflow-hidden font-sans">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[25vw] h-[25vw] sm:w-[20vw] sm:h-[20vw] md:w-[18vw] md:h-[18vw] bg-gradient-to-br from-[#00ffe0]/40 to-[#ffc107]/30 rounded-full blur-3xl opacity-60 animate-float-blob1" />
        <div className="absolute bottom-[-15%] right-[-8%] w-[30vw] h-[30vw] sm:w-[25vw] sm:h-[25vw] md:w-[22vw] md:h-[22vw] bg-gradient-to-tr from-[#ffc107]/40 to-[#00bfff]/30 rounded-full blur-3xl opacity-50 animate-float-blob2" />
        <div className="absolute top-[35%] left-[75%] w-[20vw] h-[20vw] sm:w-[15vw] sm:h-[15vw] md:w-[12vw] md:h-[12vw] bg-gradient-to-tl from-[#00bfff]/40 to-[#00ffe0]/30 rounded-full blur-2xl opacity-40 animate-float-blob3" />
        <div className="absolute bottom-[25%] left-[15%] w-[22vw] h-[22vw] sm:w-[18vw] sm:h-[18vw] md:w-[16vw] md:h-[16vw] bg-gradient-to-br from-[#00ffe0]/30 to-[#00bfff]/40 rounded-full blur-3xl opacity-45 animate-float-blob4" />
        <div className="absolute top-[15%] right-[25%] w-[18vw] h-[18vw] sm:w-[14vw] sm:h-[14vw] md:w-[12vw] md:h-[12vw] bg-gradient-to-tr from-[#ffc107]/30 to-[#00ffe0]/40 rounded-full blur-2xl opacity-35 animate-float-blob5" />
        <style>{`
          @keyframes float-blob1 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(8vw, -5vw) scale(1.1); }
            50% { transform: translate(-3vw, 8vw) scale(0.9); }
            75% { transform: translate(6vw, 3vw) scale(1.05); }
          }
          .animate-float-blob1 { animation: float-blob1 25s ease-in-out infinite; }
          
          @keyframes float-blob2 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            30% { transform: translate(-12vw, -8vw) scale(1.15); }
            60% { transform: translate(6vw, -12vw) scale(0.85); }
            90% { transform: translate(-3vw, 6vw) scale(1.1); }
          }
          .animate-float-blob2 { animation: float-blob2 30s ease-in-out infinite; }
          
          @keyframes float-blob3 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            40% { transform: translate(-8vw, 5vw) scale(1.2); }
            80% { transform: translate(5vw, -8vw) scale(0.8); }
          }
          .animate-float-blob3 { animation: float-blob3 28s ease-in-out infinite; }
          
          @keyframes float-blob4 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            35% { transform: translate(10vw, -4vw) scale(1.1); }
            70% { transform: translate(-8vw, 7vw) scale(0.9); }
          }
          .animate-float-blob4 { animation: float-blob4 32s ease-in-out infinite; }
          
          @keyframes float-blob5 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            45% { transform: translate(-6vw, -10vw) scale(1.25); }
            90% { transform: translate(7vw, 4vw) scale(0.75); }
          }
          .animate-float-blob5 { animation: float-blob5 35s ease-in-out infinite; }
        `}</style>
      </div>

      {/* Government Modal (just closes modal, no role selection) */}
      {showGovtOptions && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4" onClick={() => setShowGovtOptions(false)}>
          <div className="bg-[#101624]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-10 max-w-sm w-full mx-4 shadow-2xl border-2 border-[#1de9b6]/30 relative" onClick={e => e.stopPropagation()}>
            <button className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-[#ffd580] text-xl sm:text-2xl" onClick={() => setShowGovtOptions(false)}>
              ×
            </button>
            <div className="text-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#ffd580] mb-2">Government Official</h3>
              <p className="text-gray-400 text-xs sm:text-sm">Login or Signup as a Government Officer</p>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <button className="w-full p-3 sm:p-4 bg-[#101624]/80 hover:bg-[#101624] border-2 border-[#1de9b6]/20 hover:border-[#ffd580]/40 rounded-xl font-semibold text-gray-200 hover:text-[#ffd580] transition-all text-sm sm:text-base" onClick={() => { setShowGovtOptions(false); setSelectedAuthType('govt-officer'); }}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Navigation */}
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-3 sm:mb-4 tracking-tight drop-shadow-lg leading-tight">
            SecurePortal
          </h1>
          <p className="text-offwhite text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
            Don't reinvent the wheel with every design. Team resources are too often pulled into user-experience issues instead. Start here and get back to work faster.
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-teal mb-8 sm:mb-10 mt-6 sm:mt-8 tracking-tight drop-shadow">What we have done</h2>
        </div>

        {/* Feature Cards Section */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-8 md:gap-10 mb-16 sm:mb-20 items-stretch justify-center">
          {/* Unique angled card shapes using clip-path */}
          <div className="relative bg-gradient-to-br from-navy/90 to-slate-surface/90 rounded-3xl p-8 sm:p-10 md:p-14 flex flex-col items-center gap-4 sm:gap-6 min-h-48 sm:min-h-56 max-w-xs w-full shadow-2xl border-2 border-teal/30 group overflow-hidden" style={{clipPath:'polygon(0 10%, 100% 0, 100% 90%, 0 100%)'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffd580]/10 to-[#1de9b6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-[#ffd580] to-[#1de9b6] rounded-2xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
              🚀
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-[#ffd580] mb-2">Innovation</h3>
              <p className="text-sm sm:text-base text-gray-200">Cutting-edge solutions</p>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-navy/90 to-slate-surface/90 rounded-3xl p-8 sm:p-10 md:p-14 flex flex-col items-center gap-4 sm:gap-6 min-h-48 sm:min-h-56 max-w-xs w-full shadow-2xl border-2 border-teal/30 group overflow-hidden" style={{clipPath:'polygon(0 0, 100% 10%, 100% 100%, 0 90%)'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1de9b6]/10 to-[#ffd580]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-[#1de9b6] to-[#ffd580] rounded-2xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg group-hover:rotate-12 transition-transform duration-500">
              🔒
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-[#1de9b6] mb-2">Security</h3>
              <p className="text-sm sm:text-base text-gray-200">Bank-level protection</p>
            </div>
          </div>
          <div className="relative bg-gradient-to-br from-navy/90 to-slate-surface/90 rounded-3xl p-8 sm:p-10 md:p-14 flex flex-col items-center gap-4 sm:gap-6 min-h-48 sm:min-h-56 max-w-xs w-full shadow-2xl border-2 border-teal/30 group overflow-hidden" style={{clipPath:'polygon(10% 0, 100% 0, 90% 100%, 0 90%)'}}>
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffd580]/10 to-[#1de9b6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-[#ffd580] to-[#1de9b6] rounded-2xl flex items-center justify-center text-white font-bold text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-500">
              ⚡
            </div>
            <div className="mt-2 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-[#ffd580] mb-2">Speed</h3>
              <p className="text-sm sm:text-base text-gray-200">Lightning fast processing</p>
            </div>
          </div>
        </div>

        <AuthUserType onUserTypeSelect={handleUserTypeSelect} />

        {/* Vision Section */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-teal mb-6 sm:mb-8 tracking-tight drop-shadow">Our Vision</h2>
          <div className="bg-gradient-to-br from-navy/90 to-slate-surface/90 rounded-3xl p-8 sm:p-12 md:p-16 max-w-3xl mx-auto shadow-2xl border-2 border-teal/30 hover:scale-[1.02] transition-transform">
            <p className="text-offwhite text-lg sm:text-xl md:text-2xl leading-relaxed px-4">
              We envision a digital government platform that seamlessly connects suppliers, officials, and contractors in a secure, transparent, and efficient ecosystem. Our mission is to modernize public service delivery through innovative technology solutions.
            </p>
          </div>
        </div>

        {/* Stats Section with Slider */}
        <div className="text-center mb-16 sm:mb-20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gold mb-6 sm:mb-8 tracking-tight drop-shadow">Our Impact</h2>
          {/* Truly full-width sliding banner */}
          <div className="relative left-1/2 right-1/2 -translate-x-1/2 w-screen bg-gradient-to-r from-[#101624]/80 via-[#162032]/80 to-[#101624]/80 text-[#ffd580] py-6 sm:py-8 mb-10 sm:mb-14 overflow-hidden border-t-2 border-b-2 border-[#1de9b6]/20 shadow-xl">
            <div className={`whitespace-nowrap text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight px-6 sm:px-12 ${styles.marquee}`}>
              {Array(20).fill('Secure Portal ★').join('\u00A0')}
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <button 
              className="bg-gradient-to-br from-[#101624]/80 to-[#162032]/80 border-2 border-[#1de9b6]/30 rounded-full w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center text-[#ffd580] text-2xl sm:text-3xl hover:bg-[#101624]/90 hover:scale-110 transition-all shadow-xl"
              onClick={prevSlide}
            >
              <ChevronLeft size={24} className="sm:w-6 sm:h-6 md:w-10 md:h-10" />
            </button>
            <div className="w-[280px] sm:w-[400px] md:w-[480px] lg:w-[600px] overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="relative bg-gradient-to-br from-[#101624]/90 to-[#162032]/90 rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 min-w-full text-center shadow-2xl border-4 border-[#1de9b6]/30 group overflow-hidden" style={{clipPath:'polygon(0 10%, 100% 0, 100% 90%, 0 100%)'}}>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ffd580]/10 to-[#1de9b6]/10 pointer-events-none group-hover:opacity-80 transition-opacity duration-300"></div>
                  <h3 className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#ffd580] mb-4 sm:mb-6 drop-shadow-lg">10K+</h3>
                  <p className="relative z-10 text-lg sm:text-xl md:text-2xl text-gray-200 font-semibold">Active Users</p>
                </div>
                <div className="relative bg-gradient-to-br from-[#101624]/90 to-[#162032]/90 rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 min-w-full text-center shadow-2xl border-4 border-[#1de9b6]/30 group overflow-hidden" style={{clipPath:'polygon(0 0, 100% 10%, 100% 100%, 0 90%)'}}>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#1de9b6]/10 to-[#ffd580]/10 pointer-events-none group-hover:opacity-80 transition-opacity duration-300"></div>
                  <h3 className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1de9b6] mb-4 sm:mb-6 drop-shadow-lg">500+</h3>
                  <p className="relative z-10 text-lg sm:text-xl md:text-2xl text-gray-200 font-semibold">Projects Completed</p>
                </div>
                <div className="relative bg-gradient-to-br from-[#101624]/90 to-[#162032]/90 rounded-3xl p-8 sm:p-12 md:p-16 lg:p-20 min-w-full text-center shadow-2xl border-4 border-[#1de9b6]/30 group overflow-hidden" style={{clipPath:'polygon(10% 0, 100% 0, 90% 100%, 0 90%)'}}>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#ffd580]/10 to-[#1de9b6]/10 pointer-events-none group-hover:opacity-80 transition-opacity duration-300"></div>
                  <h3 className="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#ffd580] mb-4 sm:mb-6 drop-shadow-lg">99.9%</h3>
                  <p className="relative z-10 text-lg sm:text-xl md:text-2xl text-gray-200 font-semibold">Uptime</p>
                </div>
              </div>
            </div>
            <button 
              className="bg-gradient-to-br from-[#101624]/80 to-[#162032]/80 border-2 border-[#1de9b6]/30 rounded-full w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 flex items-center justify-center text-[#ffd580] text-2xl sm:text-3xl hover:bg-[#101624]/90 hover:scale-110 transition-all shadow-xl"
              onClick={nextSlide}
            >
              <ChevronRight size={24} className="sm:w-6 sm:h-6 md:w-10 md:h-10" />
            </button>
          </div>
          {/* Slide indicators */}
          <div className="flex justify-center gap-4 sm:gap-6 mt-8 sm:mt-10">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 border-[#1de9b6]/30 transition-all ${currentSlide === index ? 'bg-[#ffd580]' : 'bg-[#101624]'}`}
                onClick={() => {
                  setCurrentSlide(index);
                }}
              />
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mb-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-teal mb-4 sm:mb-6 tracking-tight drop-shadow">Get in Touch</h2>
          <div className="bg-gradient-to-br from-navy/90 to-slate-surface/90 rounded-3xl p-8 sm:p-12 md:p-16 max-w-2xl mx-auto shadow-2xl border-2 border-teal/30 hover:scale-[1.02] transition-transform">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="text-left">
                <label className="block mb-2 font-semibold text-gold text-base sm:text-lg">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 sm:px-6 py-4 sm:py-5 border-2 rounded-2xl text-base sm:text-lg transition-all focus:outline-none focus:border-gold focus:shadow-lg bg-navy/80 text-offwhite ${formErrors.email ? 'border-red-400' : 'border-teal/30'}`}
                  placeholder="your.email@example.com"
                  required
                />
                {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
              </div>
              <div className="text-left">
                <label className="block mb-2 font-semibold text-gold text-base sm:text-lg">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 sm:px-6 py-4 sm:py-5 border-2 rounded-2xl text-base sm:text-lg transition-all focus:outline-none focus:border-gold focus:shadow-lg bg-navy/80 text-offwhite ${formErrors.phone ? 'border-red-400' : 'border-teal/30'}`}
                  placeholder="+91 98765 43210"
                />
                {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
              </div>
              <div className="text-left">
                <label className="block mb-2 font-semibold text-gold text-base sm:text-lg">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full px-4 sm:px-6 py-4 sm:py-5 border-2 rounded-2xl text-base sm:text-lg transition-all focus:outline-none focus:border-gold focus:shadow-lg bg-navy/80 text-offwhite resize-y ${formErrors.message ? 'border-red-400' : 'border-teal/30'}`}
                  placeholder="Tell us how we can help you..."
                  required
                />
                {formErrors.message && <p className="text-red-400 text-xs mt-1">{formErrors.message}</p>}
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-gold to-teal text-navy px-8 sm:px-12 md:px-14 py-4 sm:py-5 rounded-2xl text-base sm:text-lg font-bold hover:-translate-y-1 hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
              >
                <Send size={20} className="sm:w-6 sm:h-6" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Animations are now in LandingPage.module.css */}

      {showContractorModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-[#101624]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 md:p-10 max-w-xs w-full mx-4 shadow-2xl border-2 border-[#1de9b6]/30 relative animate-fadeInScale">
            <button
              onClick={() => setShowContractorModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-[#ffd580] text-xl sm:text-2xl"
              aria-label="Close contractor modal"
            >
              ×
            </button>
            <h2 className="text-lg sm:text-xl font-bold text-[#ffd580] mb-4 sm:mb-6 text-center">Select Contractor Type</h2>
            <div className="flex flex-col gap-4 sm:gap-6">
              {CONTRACTOR_SUBTYPES.map((sub) => (
                <button
                  key={sub.value}
                  className="w-full p-3 sm:p-4 bg-[#101624]/80 hover:bg-[#101624] border-2 border-[#1de9b6]/20 hover:border-[#ffd580]/40 rounded-xl font-semibold text-gray-200 hover:text-[#ffd580] transition-all text-sm sm:text-base md:text-lg"
                  onClick={() => handleContractorSubtype(sub.value)}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {selectedAuthType && (
        <AuthFlowModal selectedType={selectedAuthType} onClose={() => setSelectedAuthType(null)} />
      )}
    </div>
  );
};

export default LandingPage; 