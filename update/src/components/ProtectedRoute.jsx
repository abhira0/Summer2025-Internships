// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Update App.jsx routes to use ProtectedRoute
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/jobs" element={
    <ProtectedRoute>
      <Jobs />
    </ProtectedRoute>
  } />
  {/* Other protected routes */}
</Routes>