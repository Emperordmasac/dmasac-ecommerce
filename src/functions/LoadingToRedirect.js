import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
    const [countdown, setCountdown] = useState(5);
    let navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((currentcountdown) => --currentcountdown);
        }, 1000);
        //
        countdown === 0 && navigate("/login");
        //
        return () => {
            clearInterval(interval);
        };
    }, [countdown, navigate]);

    return (
        <div className="container p-5 text-center">
            <p>Redirecting you in {countdown} seconds </p>
        </div>
    );
};

export default LoadingToRedirect;
