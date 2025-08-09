import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // console.log('ProtectedRoute: Current path:', location.pathname);
  // console.log('ProtectedRoute: Auth state - user:', user, 'loading:', loading);
  // console.log(allowedRoles);
  
  // Show loading state while checking auth
  if (loading) {
    // console.log('ProtectedRoute: Auth check in progress, showing loading...');
    return <div>Loading...</div>;
  }

  // If no user is logged in, redirect to login page
  if (!user) {
    // console.log('ProtectedRoute: No user found, redirecting to login');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check if user has any of the allowed roles
  const hasRequiredRole = !allowedRoles || (user?.role && allowedRoles.includes(user.role));
  
  // console.log('ProtectedRoute: User role:', user.role, 'Allowed roles:', allowedRoles, 'Has access:', hasRequiredRole);
  
  if (!hasRequiredRole) {
    console.warn(`ProtectedRoute: Access denied - User with role ${user.role} attempted to access a route requiring roles:`, allowedRoles);
    return <Navigate to="/" replace />;
  }

  // console.log('ProtectedRoute: Access granted, rendering children');
  return children;
};

export default ProtectedRoute;