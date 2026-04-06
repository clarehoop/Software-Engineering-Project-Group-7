import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    // Check if user exists AND if their email is verified
    if (!user ) {
        return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;