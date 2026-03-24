import { useNavigate } from "react-router-dom";

export const SignUpRedirect = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/sign-in');
    };  
    return handleRedirect
};

export default SignUpRedirect;
