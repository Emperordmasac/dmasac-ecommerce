// INTERNAL IMPORT
import LoadingToRedirect from "../utils/LoadingToRedirect";
import { currentAdmin } from "../utils/auth";
import { useState, useEffect } from "react";

// EXTERNAL IMPORT
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
    const [verified, setVerified] = useState(false);

    let { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) {
            currentAdmin(user.token)
                .then((res) => {
                    setVerified(true);
                })
                .catch((error) => {
                    setVerified(false);
                });
        }
    }, [user]);

    return verified ? children : <LoadingToRedirect />;
};

export default AdminRoute;
