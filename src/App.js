// Internal import
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";

// External import
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
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
            </Routes>
        </>
    );
};

export default App;
