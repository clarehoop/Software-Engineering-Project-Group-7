import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/Auth';

const LandlordRoute = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        // If loading is finished and user isn't a landlord, trigger the message
        if (!loading && (!user || !user.is_landlord)) {
            setShowError(true);
            
            // Redirect to home after 3 seconds
            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [user, loading, navigate]);

    if (loading) return <div>Loading...</div>;

    // 1. If they are a landlord, let them through immediately
    if (user && user.is_landlord) {
        return <Outlet />;
    }

    // 2. If not a landlord, show the message while the useEffect timer runs
    if (showError) {
        return (
            <div style={{ 
                textAlign: 'center', 
                marginTop: '50px', 
                padding: '20px',
                fontFamily: 'sans-serif' 
            }}>
                <h2 style={{ color: '#d32f2f' }}>Access Denied</h2>
                <p>You are not a landlord; you cannot access this page.</p>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    Redirecting you to the home page in 3 seconds...
                </p>
            </div>
        );
    }

    // Fallback null while logic processes
    return null;
};

export default LandlordRoute;