// Internal import
import { useState, useEffect } from "react";
import { auth } from "../../utils/firebase";
// import { sendSignInLinkToEmail } from "firebase/auth";

// External import
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

const RegisterForm = () => {
    const [email, setEmail] = useState("");

    let navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) navigate("/");
        // eslint-disable-next-line
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            url: process.env.REACT_APP_REGISTER_URL,
            handleCodeInApp: true,
        };

        // sendSignInLinkToEmail
        // await sendSignInLinkToEmail(auth, email, config);
        await auth.sendSignInLinkToEmail(email, config);
        toast.success(
            `An Email has been sent to ${email}. Click the  link to complete your registration`
        );
        // Save user email in local storage
        window.localStorage.setItem("emailForRegistration", email);
        // Clear the state
        setEmail("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                placeholder="Enter a valid email address"
            />
            <br />
            <button type="submit" className="btn btn-raised">
                Register
            </button>
        </form>
    );
};

export default Register;
