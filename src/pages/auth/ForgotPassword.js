//Internal import
import { useState, useEffect } from "react";
// import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../utils/firebase";

//External Import
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    // const auth = getAuth();
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
        // sendPasswordResetEmail(auth, email, config)
        //     .then(() => {
        //         // Password reset email sent!
        //         // ..
        //         setEmail("");
        //         setLoading(false);
        //         toast.success(
        //             `An Email has been sent to ${email}. Click the  link to reset your password`
        //         );
        //         navigate("/login");
        //     })
        //     .catch((error) => {
        //         setLoading(false);
        //         console.log(error);
        //         toast.error("email not found");
        //     });

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
                console.log("ERROR MSG IN FORGOT PASSWORD", error);
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
