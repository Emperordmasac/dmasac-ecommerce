//Internal import
import { useState, useEffect } from "react";
import { auth } from "../../config/firebase";

//External Import
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) navigate("/");
        // eslint-disable-next-line
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_URL,
            handleCodeInApp: true,
        };

        await auth
            .sendPasswordResetEmail(email, config)
            .then(() => {
                setEmail("");
                setLoading(false);
                toast.success("Check your email for password reset link");
                navigate("/login");
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
            });
    };

    return (
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? (
                <h4 className="text-danger ">Loading...</h4>
            ) : (
                <h4>Forgot Password</h4>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    autoFocus
                    placeholder="Enter a valid email address"
                />
                <br />
                <button
                    className="btn btn-raised"
                    type="primary"
                    disabled={!email}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
