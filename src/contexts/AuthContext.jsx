import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerGovt, registerContractor, loginGovt, loginContractor,registerSupplier,loginSupplier } from '../services/authService'; // Adjust import path as needed

// Define user roles for easier reference
export const ROLES = {
  INDIVIDUAL_CONTRACTOR: 'individual_contractor',
  CORPORATE_CONTRACTOR: 'corporate_contractor',
  SUPPLIER: 'supplier',
  PROJECT_MANAGER: 'project_manager',
  SUPERVISOR: 'supervisor'
};

// Helper function to determine user role based on user type and role data
const determineUserRole = (userType, roleData) => {
  if (userType === 'individual-contractor') return ROLES.INDIVIDUAL_CONTRACTOR;
  if (userType === 'corporate-contractor') return ROLES.CORPORATE_CONTRACTOR;
  if (userType === 'supplier') return ROLES.SUPPLIER;
  if (userType === 'govt-officer') {
    return roleData?.toLowerCase() === 'project manager' 
      ? ROLES.PROJECT_MANAGER 
      : ROLES.SUPERVISOR;
  }
  return null;
};

// Helper function to get dashboard path based on role
const getDashboardPath = (role) => {
  switch(role) {
    case ROLES.INDIVIDUAL_CONTRACTOR:
    case ROLES.CORPORATE_CONTRACTOR:
      return '/dashboard/contractor';
    case ROLES.SUPPLIER:
      return '/dashboard/supplier';
    case ROLES.PROJECT_MANAGER:
      return '/dashboard/pm';
    case ROLES.SUPERVISOR:
      return '/dashboard/supervisor';
    default:
      return '/';
  }
};

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  signup: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Load user from localStorage on initial load
  useEffect(() => {
    const loadUser = () => {
      try {
        console.log('AuthContext: Loading user from localStorage...');
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          console.log('AuthContext: Found user in localStorage:', JSON.parse(storedUser));
          setUser(JSON.parse(storedUser));
        } else {
          console.log('AuthContext: No user found in localStorage');
        }
      } catch (error) {
        console.error('AuthContext: Failed to load user from storage', error);
      } finally {
        console.log('AuthContext: Finished loading user, setting loading to false');
        setLoading(false);
      }
    };

    loadUser();
  }, []);

const login = useCallback(
  async ({ username, password, userType, role }) => {
    try {
      console.log('AuthContext: Attempting login for', userType);

      let response;

      
      if (userType === 'individual-contractor' || userType === 'corporate-contractor') {
        response = await loginContractor({ username, password });
      } else if (userType === 'supplier') {
        response = await loginSupplier({ username, password });
      } else if (userType === 'govt-officer') {
        response = await loginGovt({ username, password },role);
      } else {
        throw new Error('Unsupported user type');
      }

      const token = response?.token;
      if (!token) throw new Error('Login failed: No token returned');

      const resolvedRole = determineUserRole(userType, role);

      const userData = {
        username,
        userType,
        role: resolvedRole,
        token,
        authTime: new Date().toISOString(),
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token); // Optional fallback

      const dashboardPath = getDashboardPath(resolvedRole);
      navigate(dashboardPath, { replace: true });

      return { success: true, data: userData };
    } catch (error) {
      console.error('AuthContext: Login failed', error);
      return { success: false, error: error.message || 'Login failed' };
    }
  },
  [navigate]
);


  const signup = useCallback(async (userData) => {
    try {
      console.log('AuthContext: Signup called with userData:', userData);

      let response;
      
      if (userData.userType === 'govt-officer') {
        response = await registerGovt(userData,userData.role);
      } else if (userData.userType === 'supplier'){
        response = await registerSupplier(userData);
      }
      else {
        
        response = await registerContractor(userData);
      }

      console.log('AuthContext: Registration API response:', response);

      // Determine role for the user
      const role = determineUserRole(userData.userType, userData.role);

      const userWithTimestamp = {
        ...response.user, 
        ...userData, 
        role,
        token: response.token,
        authTime: new Date().toISOString()
      };

      console.log('AuthContext: Setting user after signup:', userWithTimestamp);
      setUser(userWithTimestamp);
      localStorage.setItem('user', JSON.stringify(userWithTimestamp));

      // Redirect after signup
      const dashboardPath = getDashboardPath(role);
      navigate(dashboardPath, { replace: true });

      return { success: true, data: userWithTimestamp };
    } catch (error) {
      console.error('AuthContext: Signup failed', error);
      return { success: false, error: error.message || 'Signup failed' };
    }
  }, [navigate]);

  const logout = useCallback(() => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      
      // Also clear cookies if they exist
      // You might want to call your logout function from authService here
      // logout(); // from authService
      
      navigate('/', { replace: true });
      return { success: true };
    } catch (error) {
      console.error('Logout failed', error);
      return { success: false, error: error.message || 'Logout failed' };
    }
  }, [navigate]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;