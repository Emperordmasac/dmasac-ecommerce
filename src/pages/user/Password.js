// INTERNAL IMPORT
import { auth } from "../../config/firebase";
import { useState } from "react";
import { UserNav } from "../../components";

// EXTERNAL IMPORT
import { toast } from "react-toastify";

const Password = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    <PasswordUpdateForm />
                </div>
            </div>
        </div>
    );
};

const PasswordUpdateForm = () => {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        await auth.currentUser
            .updatePassword(password)
            .then(() => {
                setLoading(false);
                setPassword("");
                toast.success("Password Updated");
            })
            .catch((error) => {
                setLoading(false);
                toast.error(error.message);
            });
    };

    return (
        <>
            {loading ? (
                <h4 className="text-danger">Loading...</h4>
            ) : (
                <h4>Update Password</h4>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Your Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter new Password"
                        autoFocus
                        disabled={loading}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <br />
                    <button
                        className="btn btn-primary"
                        disabled={!password || password.length < 6 || loading}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default Password;
