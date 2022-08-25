// Internal import
import { useEffect } from "react";
import Header from "./components/navigation/Header";
import { auth } from "./utils/firebase";
import { currentUser } from "./functions/auth";
import UserRoute from "./components/routes/UserRoute";

// External import
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

// Pages import
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Admin from "./pages/admin/admin";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";

const App = () => {
    const dispatch = useDispatch();
    // to check firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                console.log("user", user);
                //backend call
                currentUser(idTokenResult.token)
                    .then((res) =>
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                roles: res.data.role,
                                _id: res.data._id,
                            },
                        })
                    )
                    .catch((error) => console.log(error));
            }
        });
        // cleanup
        return () => unsubscribe();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Header />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/register/complete"
                    element={<RegisterComplete />}
                />
                <Route path="/forgot/password" element={<ForgotPassword />} />
                <Route path="/admin/dashboard" element={<Admin />} />

                {/* USER PROTECTED ROUTES */}
                <Route
                    path="/user/history"
                    element={
                        <UserRoute>
                            <History />
                        </UserRoute>
                    }
                />

                <Route
                    path="/user/password"
                    element={
                        <UserRoute>
                            <Password />
                        </UserRoute>
                    }
                />

                <Route
                    path="/user/wishlist"
                    element={
                        <UserRoute>
                            <Wishlist />
                        </UserRoute>
                    }
                />
            </Routes>
        </>
    );
};

export default App;
