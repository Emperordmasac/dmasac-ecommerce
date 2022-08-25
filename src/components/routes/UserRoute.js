// import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "../../functions/LoadingToRedirect";

const UserRoute = ({ children }) => {
    let { user } = useSelector((state) => ({ ...state }));

    return user && user.token ? children : <LoadingToRedirect />;

    //return user && user.token ? children : <Navigate to="/login" />;
};

export default UserRoute;
