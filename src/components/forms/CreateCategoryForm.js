//INTERNAL IMPORT
import { useEffect, useState } from "react";
import {
    createCategory,
    getCategories,
    removeCategory,
} from "../../functions/category";
import LocalSearch from "./LocalSearch";

//EXTERNAL IMPORT
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CreateCategoryForm = () => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [query, setQuery] = useState("");

    let { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () =>
        getCategories().then((category) => setCategories(category.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createCategory({ name }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`${res.data.name} Category Successfully Created`);
                loadCategories();
            })
            .catch((error) => {
                setLoading(false);
                if (error.response.status === 400)
                    toast.error(error.response.data);
            });
    };

    const handleCategoryDelete = (slug) => {
        if (window.confirm(`Delete? ${slug}`)) {
            setLoading(true);
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} Category Deleted`);
                    loadCategories();
                })
                .catch((error) => {
                    if (error.response.status === 400) {
                        setLoading(false);
                        toast.error(error.response.data);
                    }
                });
        }
    };

    const search = (query) => (result) =>
        result.name.toLowerCase().includes(query);

    return (
        <>
            {loading ? (
                <h4 className="text-danger">Loading...</h4>
            ) : (
                <h4>Create Category</h4>
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
                    <button className="btn btn-outlined-primary">Create</button>
                    <hr />
                    <LocalSearch query={query} setQuery={setQuery} />
                    {categories.filter(search(query)).map((category) => (
                        <div
                            className="alert alert-secondary"
                            key={category._id}
                        >
                            {category.name}
                            <Link to={`/admin/category/${category.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning" />
                                </span>
                            </Link>

                            <span className="btn btn-sm float-right">
                                <DeleteOutlined
                                    onClick={() =>
                                        handleCategoryDelete(category.slug)
                                    }
                                    className="text-danger"
                                />
                            </span>
                        </div>
                    ))}
                </div>
            </form>
        </>
    );
};

export default CreateCategoryForm;
