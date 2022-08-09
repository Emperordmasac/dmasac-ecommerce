// Internal import
import { useState, useEffect } from "react";
import { auth } from "../../utils/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

// External import
import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom";

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

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
    }, []);

    // let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
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
