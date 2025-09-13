import { createSlice } from '@reduxjs/toolkit';
import Dashboard from './LandingDashboardContractor';
const initialState = {
  profile: {
    id:"",
    Name: "",
    firmName: "",
    region:"",
    gst: "",
    gstDocument: null,
    tradeLicense: "",
    tradeLicenseDocument: null,
    epfNo: "",
    epfDocument: null,
    experience: "",
    bankAccInfo: { bankName: "", ifsc: "", accNo: "" },
  },
  viewProject: "",
  showViewDetails: false,
  showBiddingForm: false,
  fundReq: [
    
  ],
  
  availableProjects : [
    
  ],
  allotedProject:{
      




    },
  bill: [],
  submittedUpdates: [
   
    
  ],
  activeTab: '',
  myBids: [
    
  ],
  // hasAcceptedBid :initialState.myBids.some(bid => bid.status === 'accepted'),
  dashMode:"bidding",
  settings: {
    notificationPrefs: { email: true, push: false, sms: false },
    theme: 'light',
    language: 'en',
    memoryEnabled: true,
  },
};
const calculateDashMode = (bids) =>
  bids.some(bid => bid.status === 'accepted') ? 'execution' : 'bidding';

const projectsDashboardSlice = createSlice({
  name: 'projectsDashboard',
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
    recalculateDashMode: (state) => {
    state.dashMode = calculateDashMode(state.myBids);
},

  }
});

export const {
  setActiveTab,
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
  recalculateDashMode,
} = projectsDashboardSlice.actions;

export default projectsDashboardSlice.reducer;