// INTERNAL IMPORT
import LoadingToRedirect from "../../functions/LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";
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
                    console.log("CURRENT ADMIN RES", res);
                    setVerified(true);
                })
                .catch((error) => {
                    console.log("ADMIN ROUTE ERROR", error);
                    setVerified(false);
                });
        }
    }, [user]);

    return verified ? children : <LoadingToRedirect />;
};

export default AdminRoute;
