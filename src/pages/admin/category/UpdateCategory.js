//INTERNAL IMPORT
import { useEffect, useState } from "react";
import AdminNav from "../../../components/navigation/AdminNav";
import { getCategory, updateCategory } from "../../../functions/category";

//EXTERNAL IMPORT
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col">
                <UpdateCategoryForm />
            </div>
        </div>
    </div>
);

const UpdateCategoryForm = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    let { user } = useSelector((state) => ({ ...state }));
    let navigate = useNavigate();
    let params = useParams();

    useEffect(() => {
        loadCategory();
        // eslint-disable-next-line
    }, []);

    const loadCategory = () =>
        getCategory(params.slug).then((promise) => setName(promise.data.name));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateCategory(params.slug, { name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`${res.data.name} Category Successfully Updated`);
                navigate("/admin/category");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                if (error.response.status === 400)
                    toast.error(error.response.data);
            });
    };

    return (
        <>
            {loading ? (
                <h4 className="text-danger">Loading...</h4>
            ) : (
                <h4>Update Category</h4>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                        type="text"
                        autoFocus
                        required
                    />
                    <br />
                    <button className="btn btn-outlined-primary">Update</button>
                </div>
            </form>
        </>
    );
};

export default UpdateCategory;
