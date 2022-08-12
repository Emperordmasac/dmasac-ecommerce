// Internal import
import { useState } from "react";

// External import
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import {
    getAuth,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loading, setLoading] = useState(false);

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <h4>Login</h4>
                    )}
                    <LoginForm setLoading={setLoading} />
                </div>
            </div>
        </div>
    );
};

const LoginForm = ({ setLoading }) => {
    const [email, setEmail] = useState("horlaymilekan.dev@gmail.com");
    const [password, setPassword] = useState("mosobalaje");

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let provider = new GoogleAuthProvider();

    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            signInWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    const idTokenResult = user.accessToken;
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            email: user.email,
                            token: idTokenResult,
                        },
                    });
                    toast.success("Login Successful");
                    navigate("/");
                }
            );
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            signInWithPopup(auth, provider).then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: {
                        email: user.email,
                        token: token,
                    },
                });
                toast.success("Login Successful");
                navigate("/");
            });
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                    placeholder="Enter a valid email address"
                />
            </div>
            <br />
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>

            <br />
            <Button
                onClick={handleSubmit}
                type="primary"
                shape="round"
                block
                disabled={!email || password.length < 6}
                icon={<MailOutlined />}
                size="large"
                className="mb-3"
            >
                Login with Email & Password
            </Button>
            <br />
            <Button
                onClick={handleGoogleLogin}
                type="danger"
                shape="round"
                block
                icon={<GoogleOutlined />}
                size="large"
                className="mb-3"
            >
                Login with Google
            </Button>
        </form>
    );
};

export default Login;
