import { configureStore } from '@reduxjs/toolkit';
// import dashboardReducer from './dashboardSlice';
import projectsDashboardReducer  from './dashboardSlice'
import supervisorDashboardSlice from '../supervisorDash/supervisorDashboardSlice'
export const store = configureStore({
  reducer: {
    projectsDashboard: projectsDashboardReducer,
    supervisorDashboard:supervisorDashboardSlice
    // availableProjects: availableProjectsReducer,
  }
});
