// Internal import
import { useState } from "react";
import { auth } from "../../utils/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

// External import
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register</h4>
                    <ToastContainer />
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};

const RegisterForm = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = {
            url: "http://localhost:3000/register/complete",
            handleCodeInApp: true,
        };

        // sendSignInLinkToEmail
        await sendSignInLinkToEmail(auth, email, config);
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

            <button type="submit" className="btn btn-raised">
                Register
            </button>
        </form>
    );
};

export default Register;
