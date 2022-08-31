// Internal import
import { useEffect } from "react";
import Header from "./components/navigation/Header";
import { auth } from "./utils/firebase";
import { currentUser } from "./functions/auth";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";

// External import
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Pages import
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/category/CreateCategory";
import UpdateCategory from "./pages/admin/category/UpdateCategory";
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
                //backend call
                currentUser(idTokenResult.token)
                    .then((res) =>
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        })
                    )
                    .catch((error) => toast.error(error));
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
                {/* USER PROTECTED ROUTES */}
                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/category"
                    element={
                        <AdminRoute>
                            <CreateCategory />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/category/:slug"
                    element={
                        <AdminRoute>
                            <UpdateCategory />
                        </AdminRoute>
                    }
                />

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
