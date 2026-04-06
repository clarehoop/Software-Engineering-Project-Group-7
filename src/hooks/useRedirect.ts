import { useNavigate } from "react-router-dom";

export const useRedirect = () => {
    const navigate = useNavigate();

    return(location: string) => {
        navigate(location);
    }
};

export default useRedirect;
