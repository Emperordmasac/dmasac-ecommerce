// Internal import
import { useState } from "react";

// External import
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Login</h4>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

const LoginForm = () => {
    const [email, setEmail] = useState("horlaymilekan.dev@gmail.com");
    const [password, setPassword] = useState("mosobalaje");
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    let dispatch = useDispatch();

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
                            idTokenResult: idTokenResult,
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
                Login with Enail / Password
            </Button>
        </form>
    );
};

export default Login;
