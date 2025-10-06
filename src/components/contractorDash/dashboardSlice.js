import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { myBids } from '../../services/bidService';

// --- Async thunk to fetch contractor bids ---
export const fetchMyBids = createAsyncThunk(
  'projectsDashboard/fetchMyBids',
  async (contractorId, { rejectWithValue }) => {
    try {
      const data = await myBids(contractorId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const calculateDashMode = (bids) =>
  bids.some((bid) => bid.status === 'accepted') ? 'execution' : 'bidding';

const initialState = {
  profile: {
    id: "",
    Name: "",
    firmName: "",
    region: "",
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
  fundReq: [],
  availableProjects: [],
  allotedProject: {},
  bill: [],
  submittedUpdates: [],
  activeTab: '',
  myBids: [],   // <-- store fetched bids here
  dashMode: "bidding",
  settings: {
    notificationPrefs: { email: true, push: false, sms: false },
    theme: 'light',
    language: 'en',
    memoryEnabled: true,
  },
  loading: false,
  error: null,
};

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBids.fulfilled, (state, action) => {
        state.loading = false;
        state.myBids = action.payload; // ✅ directly store the API result
        state.dashMode = calculateDashMode(action.payload);
      })
      .addCase(fetchMyBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch bids';
      });
  },
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
