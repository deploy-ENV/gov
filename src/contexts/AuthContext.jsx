import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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

  const login = useCallback((userData) => {
    try {
      console.log('AuthContext: Login called with userData:', userData);
      const userWithTimestamp = {
        ...userData,
        authTime: new Date().toISOString()
      };
      
      console.log('AuthContext: Setting user in state and localStorage');
      setUser(userWithTimestamp);
      localStorage.setItem('user', JSON.stringify(userWithTimestamp));
      
      // Redirect to appropriate dashboard after login
      const dashboardPath = getDashboardPath(userData.role);
      console.log('AuthContext: Redirecting to dashboard:', dashboardPath);
      navigate(dashboardPath, { replace: true });
      
      return true;
    } catch (error) {
      console.error('AuthContext: Login failed', error);
      return false;
    }
  }, [navigate]);

  const signup = useCallback((userData) => {
  try {
    console.log('AuthContext: Signup called with userData:', userData);

    // Correctly derive role for all users
    const role = determineUserRole(userData.userType, userData.role);

    const userWithTimestamp = {
      ...userData,
      role,
      authTime: new Date().toISOString()
    };

    console.log('AuthContext: Setting user after signup:', userWithTimestamp);
    setUser(userWithTimestamp);
    localStorage.setItem('user', JSON.stringify(userWithTimestamp));

    // Redirect after signup
    const dashboardPath = getDashboardPath(role);
    navigate(dashboardPath, { replace: true });

    return true;
  } catch (error) {
    console.error('AuthContext: Signup failed', error);
    return false;
  }
}, [navigate]);


  const logout = useCallback(() => {
    try {
      setUser(null);
      localStorage.removeItem('user');
      navigate('/', { replace: true });
      return true;
    } catch (error) {
      console.error('Logout failed', error);
      return false;
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