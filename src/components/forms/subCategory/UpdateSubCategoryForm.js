//INTERNAL IMPORT
import { useEffect, useState } from "react";
import { getSubCategory, updateSubCategory } from "../../../utils/subCategory";
import { getCategories } from "../../../utils/category";

//EXTERNAL IMPORT
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSubCategoryForm = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");

    let { user } = useSelector((state) => ({ ...state }));
    let navigate = useNavigate();
    let params = useParams();

    useEffect(() => {
        loadCategories();
        loadSubCategory();
        // eslint-disable-next-line
    }, []);

    const loadCategories = () =>
        getCategories().then((category) => setCategories(category.data));

    const loadSubCategory = () =>
        getSubCategory(params.slug).then((promise) => {
            setName(promise.data.name);
            setSelectedCategory(promise.data.parent);
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateSubCategory(
            params.slug,
            { name, parent: selectedCategory },
            user.token
        )
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`${res.data.name} Category Successfully Updated`);
                navigate("/admin/sub");
            })
            .catch((error) => {
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
                <h4>Update SubCategory</h4>
            )}

            <div className="form-group">
                <label>Choose a Category</label>
                <select
                    name="category"
                    className="form-control"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option>select</option>
                    {categories.length > 0 &&
                        categories.map((cat) => (
                            <option
                                key={cat._id}
                                value={cat._id}
                                selected={cat._id === selectedCategory}
                            >
                                {cat.name}
                            </option>
                        ))}
                </select>
            </div>
            <br />

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

export default UpdateSubCategoryForm;
