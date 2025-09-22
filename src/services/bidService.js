import api from './api';
import Cookies from 'js-cookie';
// Submit Bid (Contractor)
export const submitBid = async (bidData) => {
  try {
    const response = await api.post('/bids', bidData,
       {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
              }
        }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get All Bids for a Project
export const getBidsByProject = async (projectId) => {
  try {
    const response = await api.get(`/bids/project/${projectId}`,
       {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
              }
        }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Assign Contractor to Project (PM)
export const assignContractor = async (bidId, projectId) => {
  try {
    const response = await api.post('/bids/assign', { bidId, projectId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
