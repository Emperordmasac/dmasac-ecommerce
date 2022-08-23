// Internal import
import { useState, useEffect } from "react";
import { auth } from "../../utils/firebase";

// External import
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterComplete = () => {
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <CompleteRegistrationForm />
                </div>
            </div>
        </div>
    );
};

const CompleteRegistrationForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Email and Password is required");
            return;
        }

        if (password.length < 6) {
            toast.error("password must be at least 8 characters long");
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            );
            if (result.user.emailVerified) {
                // remove user email fom local storage
                window.localStorage.removeItem("emailForRegistration");
                // get user id token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();
                // redux store
                console.log("user", user, "idTokenResult", idTokenResult);
                // redirect
                navigate("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                disabled
            />

            <input
                type="password"
                className="form-control"
                value={password}
                autoFocus
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                placeholder="Enter a valid password"
            />
            <br />

            <button type="submit" className="btn btn-raised">
                Complete Registration
            </button>
        </form>
    );
};

export default RegisterComplete;
