// Internal import
import { useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { createOrUpdateUser } from "../../utils/auth";

// External import
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
        if (user && user.token) navigate("/");
        // eslint-disable-next-line
    }, [user]);

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
                //backend call
                createOrUpdateUser(idTokenResult.token)
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

                // redirect
                navigate("/");
            }
        } catch (error) {
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
