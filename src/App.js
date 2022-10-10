// Internal import
import { useEffect } from "react";
import { Header } from "./components";
import { auth } from "./config/firebase";
import { currentUser } from "./utils/auth";

// Middlewares
import { UserRoute, AdminRoute } from "./middlewares";

// External  Library Import
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

// Pages import
import {
    CreateCategory,
    UpdateCategory,
    AllProducts,
    CreateProduct,
    CreateSubCategory,
    UpdateSubCategory,
    AdminDashboard,
    ForgotPassword,
    Login,
    Register,
    RegisterComplete,
    History,
    Password,
    Wishlist,
    Home,
} from "./pages";

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
                {/* Authentications */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/register/complete"
                    element={<RegisterComplete />}
                />
                <Route path="/forgot/password" element={<ForgotPassword />} />

                {/* Pages */}

                {/* ADMIN PROTECTED ROUTES */}
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

                <Route
                    path="/admin/sub"
                    element={
                        <AdminRoute>
                            <CreateSubCategory />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/sub/:slug"
                    element={
                        <AdminRoute>
                            <UpdateSubCategory />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/products"
                    element={
                        <AdminRoute>
                            <AllProducts />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/product"
                    element={
                        <AdminRoute>
                            <CreateProduct />
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
