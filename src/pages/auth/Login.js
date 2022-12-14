// Internal import
import { useState } from "react";
import { auth, googleAuthProvider } from "../../config/firebase";
import { createOrUpdateUser } from "../../utils/auth";

// External import
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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

    const roleBasedRediect = (res) => {
        if (res.data.role === "admin") {
            navigate("/admin/dashboard");
        } else {
            navigate("/user/history");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await auth.signInWithEmailAndPassword(
                email,
                password
            );
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
                .then((res) => {
                    dispatch({
                        type: "LOGGED_IN_USER",
                        payload: {
                            name: res.data.name,
                            email: res.data.email,
                            token: idTokenResult.token,
                            role: res.data.role,
                            _id: res.data._id,
                        },
                    });
                    roleBasedRediect(res);
                })
                .catch((error) => toast.error(error));

            toast.success("Login Successful");
        } catch (error) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();

                createOrUpdateUser(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: res.data.name,
                                email: res.data.email,
                                token: idTokenResult.token,
                                role: res.data.role,
                                _id: res.data._id,
                            },
                        });
                        roleBasedRediect(res);
                    })
                    .catch((error) => toast.error(error));

                toast.success("Login Successful");
            })
            .catch((err) => {
                toast.error(err.message);
            });
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

            <Link to="/forgot/password" className="text-danger float-right">
                Forgot Password
            </Link>
        </form>
    );
};

export default Login;
