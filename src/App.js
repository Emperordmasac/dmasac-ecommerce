// Internal import
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";

// External import
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { auth } from "./utils/firebase";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        email: user.email,
                        token: idTokenResult.token,
                    },
                });
            }
        });
        // Cleanup
        return () => unsubscribe();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <Header />
            <ToastContainer />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route
                    exact
                    path="/register/complete"
                    element={<RegisterComplete />}
                />
                <Route
                    exact
                    path="/forgot/password"
                    element={<ForgotPassword />}
                />
            </Routes>
        </>
    );
};

export default App;
