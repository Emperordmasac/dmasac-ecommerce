// Internal import
import { useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { auth } from "./utils/firebase";
import { currentUser } from "./functions/auth";
import Admin from "./pages/admin/admin";
import User from "./pages/User/User";

// External import
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

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
                <Route exact path="/admin/dashboard" element={<Admin />} />
                <Route exact path="/user/history" element={<User />} />
            </Routes>
        </>
    );
};

export default App;
