import { data } from 'autoprefixer';
import api from './api';
import Cookies from 'js-cookie';


const cookieOptions = {
  expires: 7, 
  secure: true,
  sameSite: 'strict',
};


const setAuthCookies = (token, role,userDta) => {
  Cookies.set('token', token, cookieOptions);
  Cookies.set('userRole', role, cookieOptions);
  Cookies.set('userData', JSON.stringify(userDta), cookieOptions);
  
};

// Register Government Admin
export const registerGovt = async (userData,role) => {
  try {
     if(role == 'Project Manager'){
      const response = await api.post('/auth/register/projectmanager', userData);
      if (response.data.token) {
      setAuthCookies(response.data.token, 'projectmanager',response.data.data);
    }
      return response.data;
    }
    else{
      const response = await api.post('/auth/register/supervisor', userData);
      if (response.data.token) {
      setAuthCookies(response.data.token, 'supervisor',response.data.data);
    }
    return response.data;
    }
    // const response = await api.post('/auth/register/govt', userData);
    // return response.data;
  } catch (error) {
    console.log(userData,role,error)
    
  console.error('Signup API Error:', error.response?.data || error.message);
  throw error.response?.data || error.message;
}
};

// Login Government Admin
export const loginGovt = async (credentials,role) => {
  try {
    if(role == 'Project Manager'){
      
      const response = await api.post('/auth/login/projectmanager', credentials);
      if (response.data.token) {
        setAuthCookies(response.data.token, 'govt_officer',response.data.data);
      }
      return response.data;
    }
    else{
      const response = await api.post('/auth/login/supervisor', credentials);
      if (response.data.token) {
        setAuthCookies(response.data.token, 'govt_officer',response.data.data);
      }
      return response.data;
    }
    
    
  }catch (error) {
    console.log(credentials,role,error)

  console.error('Signup API Error:', error.response?.data || error.message);
  throw error.response?.data || error.message;
}
};

// Register Contractor
export const registerContractor = async (contractorData) => {
  try {
    const response = await api.post('/auth/register/contractor', contractorData);
     if (response.data.token) {
      setAuthCookies(response.data.token, 'contractor',response.data.data);
    }
    return response.data;
  } catch (error) {
    console.log(contractorData,error)
  console.error('Signup API Error:', error.response?.data || error.message);
  throw error.response?.data || error.message;
}
};

export const registerSupplier = async (supplierData) => {
  try {
    const response = await api.post('/auth/register/supplier', supplierData);
    if (response.data.token) {
      setAuthCookies(response.data.token, 'supplier',response.data.data);
    }
    return response.data;
  } catch (error) {
    console.log(supplierData,error)
  console.error('Signup API Error:', error.response?.data || error.message);
  throw error.response?.data || error.message;
}
};

// Login Contractor
export const loginContractor = async (credentials) => {
  try {
    const response = await api.post('/auth/login/contractor', credentials);
    console.log(response);
    
    if (response.data.token) {
      setAuthCookies(response.data.token, 'contractor',response.data.data);
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
      setAuthCookies(response.data.token, 'supplier',response.data.data);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout
export const logout = () => {
  Cookies.remove('token', { sameSite: 'strict', secure: true });
  Cookies.remove('userRole', { sameSite: 'strict', secure: true });
  sessionStorage.clear();
  
  window.location.href = '/'; // or '/login'
};


// Get current user role
export const getCurrentUserRole = () => {
  return Cookies.get('userRole');Q
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!Cookies.get('token');
};
