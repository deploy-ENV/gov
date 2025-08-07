import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    Name: "",
    firmName: "",
    state:"",
    region:"",
    experience: "",
  },
  supplier: {},
  showViewDetails: false,
  showBiddingForm: false,
  fundReq: [
   
  ],
  allotedProject: []
};

const supervisorDashboardSlice = createSlice({
  name: 'supervisorDashboard',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    openViewDetails: (state, action) => {
      state.viewProject = action.payload;
      state.showViewDetails = true;
    },
    closeViewDetails: (state) => {
      state.showViewDetails = false;
    },
    showBiddingForm: (state) => {
      state.showBiddingForm = true;
      state.showViewDetails = false;
    },
    hideBiddingForm: (state) => {
      state.showBiddingForm = false;
      state.viewProject = null;
    },
    clearProject: (state) => {
      state.viewProject = null;
      state.showViewDetails = false;
      state.showBiddingForm = false;
    },
    setSubmittedUpdates: (state, action) => {
      state.submittedUpdates = action.payload;
    },
    setFundReq: (state, action) => {
      state.fundReq = action.payload;
    },
    setBill: (state, action) => {
      state.bill = action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    toggleMemory: (state) => {
      state.settings.memoryEnabled = !state.settings.memoryEnabled;
    },
    updateProjectPhase: (state, action) => {
      const newPhase = action.payload;
      const phaseSequence = ['Phase 1', 'Phase 2', 'Phase 3', 'Completion'];
      if (phaseSequence.includes(newPhase)) {
        state.allotedProject.currentPhase = newPhase;
        const currentIndex = phaseSequence.indexOf(newPhase);
        state.allotedProject.nextPhase = phaseSequence[currentIndex + 1] || '';
      } else {
        console.error('Invalid phase provided:', newPhase);
      }
    },
  }
});

export const {
  openViewDetails,
  closeViewDetails,
  showBiddingForm,
  hideBiddingForm,
  clearProject,
  setSubmittedUpdates,
  setFundReq,
  setBill,
  updateProfile,
  updateSettings,
  toggleMemory,
  updateProjectPhase
} = supervisorDashboardSlice.actions;

export default supervisorDashboardSlice.reducer;