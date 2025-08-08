import api from './api';

// Register Government Admin
export const registerGovtAdmin = async (userData) => {
  try {
    const response = await api.post('/auth/register/govt', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login Government Admin
export const loginGovtAdmin = async (credentials) => {
  try {
    const response = await api.post('/auth/login/govt', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'govt_admin');
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Register Contractor
export const registerContractor = async (contractorData) => {
  try {
    const response = await api.post('/auth/register/contractor', contractorData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login Contractor
export const loginContractor = async (credentials) => {
  try {
    const response = await api.post('/auth/login/contractor', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'contractor');
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
};

// Get current user role
export const getCurrentUserRole = () => {
  return localStorage.getItem('userRole');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
