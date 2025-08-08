import api from './api';
import Cookies from 'js-cookie';


const cookieOptions = {
  expires: 7, 
  secure: true,
  sameSite: 'strict',
};


const setAuthCookies = (token, role) => {
  Cookies.set('token', token, cookieOptions);
  Cookies.set('userRole', role, cookieOptions);
};

// Register Government Admin
export const registerGovt = async (userData,role) => {
  try {
     if(role == 'Project Manager'){
      const response = await api.post('/auth/register/projectmanager', userData);
      return response.data;
    }
    else{
      const response = await api.post('/auth/register/supervisor', userData);
    return response.data;
    }
    // const response = await api.post('/auth/register/govt', userData);
    // return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login Government Admin
export const loginGovt = async (credentials,role) => {
  try {
    if(role == 'Project Manager'){
      // console.log(credentials)
      const response = await api.post('/auth/login/projectmanager', credentials);
      if (response.data.token) {
        setAuthCookies(response.data.token, 'govt_officer');
      }
      return response.data;
    }
    else{
      const response = await api.post('/auth/login/supervisor', credentials);
      if (response.data.token) {
        setAuthCookies(response.data.token, 'govt_officer');
      }
      return response.data;
    }
    
    
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

export const registerSupplier = async (supplierData) => {
  try {
    const response = await api.post('/auth/register/supplier', supplierData);
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
      setAuthCookies(response.data.token, 'contractor');
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginSupplier = async (credentials) => {
  try {
    const response = await api.post('/auth/login/supplier', credentials);
    if (response.data.token) {
      setAuthCookies(response.data.token, 'supplier');
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout
export const logout = () => {
  Cookies.remove('token');
  Cookies.remove('userRole');
  sessionStorage.clear();
  // window.location.href = '/login'; 
};

// Get current user role
export const getCurrentUserRole = () => {
  return Cookies.get('userRole');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!Cookies.get('token');
};
